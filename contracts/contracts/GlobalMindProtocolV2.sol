// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function burn(uint256 amount) external;
}

/**
 * @title  GlobalMindProtocol v2
 * @notice Protocolo de validação de dados para IA — recompensas em GMND token.
 *
 * MUDANÇAS v1 → v2:
 *  - Pagamentos em GMND (ERC-20) em vez de ETH nativo
 *  - Burn automático de 20% via token GMND (deflacionário)
 *  - Empresa precisa dar approve() no token antes de createBatch()
 *  - MIN_VALIDATORS = 1 para testes (voltar para 3 em produção)
 */
contract GlobalMindProtocolV2 {

    // ── CONSTANTES ───────────────────────────────────────────────────────────

    uint256 public constant MIN_VALIDATORS  = 1;  // mínimo de respostas (3 em produção)
    uint256 public constant REWARD_SHARE    = 70; // % para validadores
    uint256 public constant BURN_SHARE      = 20; // % queimado (deflação)
    uint256 public constant TREASURY_SHARE  = 10; // % para treasury

    // ── STATE ────────────────────────────────────────────────────────────────

    address public owner;
    address public treasury;
    IERC20  public gmndToken; // contrato do token GMND
    uint256 public batchCount;

    uint256 public totalBurned;    // total de GMND queimado até hoje
    uint256 public totalRewarded;  // total de GMND distribuído

    enum TaskType   { TEXT_CLASSIFICATION, FACT_VERIFICATION, LLM_RESPONSE_RATING, IMAGE_LABELING }
    enum BatchStatus { OPEN, FINALIZED, CANCELLED }

    struct Task {
        string   taskId;
        string   content;
        TaskType taskType;
    }

    struct Batch {
        address     creator;
        uint256     reward;      // em GMND (wei)
        uint256     createdAt;
        uint256     deadline;
        BatchStatus status;
        Task[]      tasks;
        uint256     taskCount;
    }

    struct Answer {
        address node;
        string  answer;
        uint256 submittedAt;
    }

    mapping(uint256 => Batch)                                        public batches;
    mapping(uint256 => mapping(uint256 => Answer[]))                 public answers;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public hasAnswered;
    mapping(address => uint256)                                      public nodeScore;
    mapping(address => uint256)                                      public nodeTaskCount;
    mapping(address => uint256)                                      public nodeEarned; // GMND total ganho

    // ── EVENTS ───────────────────────────────────────────────────────────────

    event BatchCreated(uint256 indexed batchId, address indexed creator, uint256 reward, uint256 taskCount, uint256 deadline);
    event AnswerSubmitted(uint256 indexed batchId, uint256 indexed taskIndex, address indexed node, string answer);
    event BatchFinalized(uint256 indexed batchId, uint256 rewardPerNode, uint256 burned, uint256 toTreasury, uint256 validatorCount);
    event BatchCancelled(uint256 indexed batchId);
    event TokensBurned(uint256 amount, uint256 totalBurned);

    // ── MODIFIERS ────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "GlobalMind: apenas o owner");
        _;
    }

    modifier batchExists(uint256 batchId) {
        require(batchId < batchCount, "GlobalMind: batch nao existe");
        _;
    }

    // ── CONSTRUCTOR ──────────────────────────────────────────────────────────

    constructor(address _gmndToken, address _treasury) {
        require(_gmndToken  != address(0), "GlobalMind: token invalido");
        require(_treasury   != address(0), "GlobalMind: treasury invalido");
        owner     = msg.sender;
        gmndToken = IERC20(_gmndToken);
        treasury  = _treasury;
    }

    // ── FUNÇÕES PRINCIPAIS ───────────────────────────────────────────────────

    /**
     * @notice Empresa cria batch pagando em GMND.
     * @dev Empresa deve chamar gmndToken.approve(protocolAddress, reward) antes.
     */
    function createBatch(
        string[]   calldata taskIds,
        string[]   calldata contents,
        TaskType[] calldata taskTypes,
        uint256             deadlineIn,
        uint256             rewardAmount  // em GMND (com 18 decimais)
    ) external returns (uint256 batchId) {
        require(taskIds.length > 0,                 "GlobalMind: sem tarefas");
        require(taskIds.length == contents.length,  "GlobalMind: arrays divergentes");
        require(taskIds.length == taskTypes.length, "GlobalMind: arrays divergentes");
        require(rewardAmount > 0,                   "GlobalMind: recompensa necessaria");
        require(deadlineIn >= 1 hours,              "GlobalMind: prazo minimo 1 hora");

        // Transfere GMND da empresa para o contrato
        require(
            gmndToken.transferFrom(msg.sender, address(this), rewardAmount),
            "GlobalMind: falha ao transferir GMND"
        );

        batchId = batchCount++;
        Batch storage b = batches[batchId];
        b.creator   = msg.sender;
        b.reward    = rewardAmount;
        b.createdAt = block.timestamp;
        b.deadline  = block.timestamp + deadlineIn;
        b.status    = BatchStatus.OPEN;
        b.taskCount = taskIds.length;

        for (uint256 i = 0; i < taskIds.length; i++) {
            b.tasks.push(Task({ taskId: taskIds[i], content: contents[i], taskType: taskTypes[i] }));
        }

        emit BatchCreated(batchId, msg.sender, rewardAmount, taskIds.length, b.deadline);
    }

    /**
     * @notice Nó submete resposta para uma tarefa.
     */
    function submitAnswer(uint256 batchId, uint256 taskIndex, string calldata answer)
        external batchExists(batchId)
    {
        Batch storage b = batches[batchId];
        require(b.status == BatchStatus.OPEN,                    "GlobalMind: batch nao aberto");
        require(block.timestamp <= b.deadline,                   "GlobalMind: prazo encerrado");
        require(taskIndex < b.taskCount,                         "GlobalMind: tarefa nao existe");
        require(!hasAnswered[batchId][taskIndex][msg.sender],    "GlobalMind: ja respondeu");
        require(msg.sender != b.creator,                         "GlobalMind: criador nao pode responder");
        require(bytes(answer).length > 0,                        "GlobalMind: resposta vazia");

        answers[batchId][taskIndex].push(Answer({ node: msg.sender, answer: answer, submittedAt: block.timestamp }));
        hasAnswered[batchId][taskIndex][msg.sender] = true;
        nodeTaskCount[msg.sender]++;

        emit AnswerSubmitted(batchId, taskIndex, msg.sender, answer);
    }

    /**
     * @notice Finaliza batch, calcula consenso e distribui GMND.
     * 70% → validadores corretos
     * 20% → queimado (deflação do supply)
     * 10% → treasury
     */
    function finalizeBatch(uint256 batchId) external batchExists(batchId) {
        Batch storage b = batches[batchId];
        require(b.status == BatchStatus.OPEN, "GlobalMind: batch nao aberto");
        require(
            block.timestamp > b.deadline || _allTasksHaveMinAnswers(batchId, b.taskCount),
            "GlobalMind: aguardando respostas minimas ou prazo"
        );

        b.status = BatchStatus.FINALIZED;

        address[] memory winners = _computeWinners(batchId, b.taskCount);
        uint256 winnerCount = winners.length;
        require(winnerCount > 0, "GlobalMind: nenhum vencedor");

        uint256 total      = b.reward;
        uint256 toBurn     = (total * BURN_SHARE)     / 100;
        uint256 toTreasury = (total * TREASURY_SHARE) / 100;
        uint256 toReward   = total - toBurn - toTreasury;
        uint256 perNode    = toReward / winnerCount;

        // 🔥 Queima 20% — reduz supply permanentemente
        if (toBurn > 0) {
            gmndToken.burn(toBurn);
            totalBurned += toBurn;
            emit TokensBurned(toBurn, totalBurned);
        }

        // 💰 10% → treasury
        if (toTreasury > 0) {
            gmndToken.transfer(treasury, toTreasury);
        }

        // 🎯 70% → validadores corretos
        for (uint256 i = 0; i < winnerCount; i++) {
            if (winners[i] == address(0)) continue;
            nodeScore[winners[i]]  += 10;
            nodeEarned[winners[i]] += perNode;
            totalRewarded          += perNode;
            if (perNode > 0) {
                gmndToken.transfer(winners[i], perNode);
            }
        }

        emit BatchFinalized(batchId, perNode, toBurn, toTreasury, winnerCount);
    }

    /**
     * @notice Empresa cancela batch e recupera GMND (só se sem respostas).
     */
    function cancelBatch(uint256 batchId) external batchExists(batchId) {
        Batch storage b = batches[batchId];
        require(b.status == BatchStatus.OPEN,                       "GlobalMind: batch nao aberto");
        require(msg.sender == b.creator,                            "GlobalMind: apenas o criador");
        require(_totalAnswers(batchId, b.taskCount) == 0,           "GlobalMind: ja ha respostas");

        b.status = BatchStatus.CANCELLED;
        gmndToken.transfer(b.creator, b.reward);
        emit BatchCancelled(batchId);
    }

    // ── LEITURA ──────────────────────────────────────────────────────────────

    function getBatchInfo(uint256 batchId) external view batchExists(batchId)
        returns (address creator, uint256 reward, uint256 taskCount, uint256 deadline, BatchStatus status)
    {
        Batch storage b = batches[batchId];
        return (b.creator, b.reward, b.taskCount, b.deadline, b.status);
    }

    function getTask(uint256 batchId, uint256 taskIndex) external view batchExists(batchId)
        returns (string memory taskId, string memory content, TaskType taskType)
    {
        Task storage t = batches[batchId].tasks[taskIndex];
        return (t.taskId, t.content, t.taskType);
    }

    function getNodeProfile(address node) external view
        returns (uint256 score, uint256 totalTasks, uint256 earned)
    {
        return (nodeScore[node], nodeTaskCount[node], nodeEarned[node]);
    }

    function getNetworkStats() external view
        returns (uint256 _totalBatches, uint256 _totalBurned, uint256 _totalRewarded)
    {
        return (batchCount, totalBurned, totalRewarded);
    }

    // ── INTERNAL ─────────────────────────────────────────────────────────────

    function _computeWinners(uint256 batchId, uint256 taskCount) internal view returns (address[] memory) {
        address[] memory allNodes = _collectAllNodes(batchId, taskCount);
        uint256 nodeCount = allNodes.length;
        if (nodeCount == 0) return new address[](0);

        bool[] memory isWinner = new bool[](nodeCount);

        for (uint256 t = 0; t < taskCount; t++) {
            Answer[] storage taskAnswers = answers[batchId][t];
            if (taskAnswers.length < MIN_VALIDATORS) continue;
            string memory majority = _getMajorityAnswer(taskAnswers);
            for (uint256 a = 0; a < taskAnswers.length; a++) {
                if (_strEq(taskAnswers[a].answer, majority)) {
                    for (uint256 n = 0; n < nodeCount; n++) {
                        if (allNodes[n] == taskAnswers[a].node) { isWinner[n] = true; break; }
                    }
                }
            }
        }

        uint256 winCount = 0;
        for (uint256 i = 0; i < nodeCount; i++) if (isWinner[i]) winCount++;

        address[] memory winners = new address[](winCount);
        uint256 wi = 0;
        for (uint256 i = 0; i < nodeCount; i++) if (isWinner[i]) winners[wi++] = allNodes[i];
        return winners;
    }

    function _getMajorityAnswer(Answer[] storage taskAnswers) internal view returns (string memory majority) {
        uint256 len = taskAnswers.length;
        uint256 maxCount = 0;
        for (uint256 i = 0; i < len; i++) {
            uint256 count = 0;
            for (uint256 j = 0; j < len; j++) if (_strEq(taskAnswers[i].answer, taskAnswers[j].answer)) count++;
            if (count > maxCount) { maxCount = count; majority = taskAnswers[i].answer; }
        }
    }

    function _collectAllNodes(uint256 batchId, uint256 taskCount) internal view returns (address[] memory) {
        uint256 upper = 0;
        for (uint256 t = 0; t < taskCount; t++) upper += answers[batchId][t].length;
        address[] memory temp = new address[](upper);
        uint256 count = 0;
        for (uint256 t = 0; t < taskCount; t++) {
            Answer[] storage taskAnswers = answers[batchId][t];
            for (uint256 a = 0; a < taskAnswers.length; a++) {
                address node = taskAnswers[a].node;
                bool found = false;
                for (uint256 k = 0; k < count; k++) if (temp[k] == node) { found = true; break; }
                if (!found) temp[count++] = node;
            }
        }
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) result[i] = temp[i];
        return result;
    }

    function _allTasksHaveMinAnswers(uint256 batchId, uint256 taskCount) internal view returns (bool) {
        for (uint256 t = 0; t < taskCount; t++) if (answers[batchId][t].length < MIN_VALIDATORS) return false;
        return true;
    }

    function _totalAnswers(uint256 batchId, uint256 taskCount) internal view returns (uint256 total) {
        for (uint256 t = 0; t < taskCount; t++) total += answers[batchId][t].length;
    }

    function _strEq(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    // ── ADMIN ─────────────────────────────────────────────────────────────────

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "GlobalMind: treasury invalido");
        treasury = _treasury;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "GlobalMind: owner invalido");
        owner = newOwner;
    }
}
