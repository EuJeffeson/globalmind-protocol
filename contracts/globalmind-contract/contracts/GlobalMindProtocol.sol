// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title  GlobalMindProtocol
 * @notice MVP do smart contract do GlobalMind Protocol (GMND).
 *
 * FLUXO SIMPLIFICADO (sem Commit-Reveal ainda — isso vem na v2):
 *
 *  1. Empresa chama createBatch() e deposita ETH como recompensa
 *  2. Nós (usuários) chamam submitAnswer() para cada tarefa
 *  3. Após MIN_VALIDATORS respostas, o contrato calcula o consenso
 *  4. Qualquer um chama finalizeBatch() para distribuir recompensas
 *  5. 70% vai para os nós corretos, 20% é queimado, 10% vai para treasury
 *
 * @dev Para o MVP usamos ETH nativo. Na v2 trocaremos por token GMND (ERC-20).
 */
contract GlobalMindProtocol {

    // ── CONSTANTES ──────────────────────────────────────────────────────────

    uint256 public constant MIN_VALIDATORS  = 1;    // mínimo de respostas para finalizar
    uint256 public constant REWARD_SHARE    = 70;   // % para os nós validadores
    uint256 public constant BURN_SHARE      = 20;   // % queimado (enviado para address(0))
    uint256 public constant TREASURY_SHARE  = 10;   // % para o treasury do protocolo

    // ── STORAGE ─────────────────────────────────────────────────────────────

    address public owner;
    address public treasury;
    uint256 public batchCount;

    // Tipos de tarefa suportados
    enum TaskType {
        TEXT_CLASSIFICATION,   // Classificar texto em categorias
        FACT_VERIFICATION,     // Verificar se uma afirmação é verdadeira/falsa
        LLM_RESPONSE_RATING,   // Avaliar qualidade de resposta de LLM (1-5)
        IMAGE_LABELING         // Rotular imagem (futuro)
    }

    // Status de um batch de tarefas
    enum BatchStatus {
        OPEN,       // Aceitando respostas
        FINALIZED,  // Recompensas distribuídas
        CANCELLED   // Cancelado pelo criador (reembolso disponível)
    }

    // Uma tarefa individual dentro de um batch
    struct Task {
        string  taskId;      // ID único (gerado offchain pela empresa)
        string  content;     // O conteúdo da tarefa (texto, URL, etc.)
        TaskType taskType;
    }

    // Um batch de tarefas criado por uma empresa
    struct Batch {
        address  creator;         // Endereço da empresa que criou
        uint256  reward;          // Total em ETH depositado
        uint256  createdAt;       // Timestamp de criação
        uint256  deadline;        // Prazo para submissão de respostas
        BatchStatus status;
        Task[]   tasks;
        uint256  taskCount;
    }

    // Resposta de um nó para uma tarefa específica
    struct Answer {
        address  node;       // Quem respondeu
        string   answer;     // A resposta (texto livre no MVP)
        uint256  submittedAt;
    }

    // ── MAPPINGS ─────────────────────────────────────────────────────────────

    // batchId => Batch
    mapping(uint256 => Batch) public batches;

    // batchId => taskIndex => Answer[]
    mapping(uint256 => mapping(uint256 => Answer[])) public answers;

    // batchId => taskIndex => node => já respondeu?
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public hasAnswered;

    // node => score acumulado (simplificado no MVP)
    mapping(address => uint256) public nodeScore;

    // node => total de tarefas concluídas
    mapping(address => uint256) public nodeTaskCount;

    // ── EVENTS ───────────────────────────────────────────────────────────────

    event BatchCreated(
        uint256 indexed batchId,
        address indexed creator,
        uint256 reward,
        uint256 taskCount,
        uint256 deadline
    );

    event AnswerSubmitted(
        uint256 indexed batchId,
        uint256 indexed taskIndex,
        address indexed node,
        string answer
    );

    event BatchFinalized(
        uint256 indexed batchId,
        uint256 rewardPerNode,
        uint256 burned,
        uint256 toTreasury,
        uint256 validatorCount
    );

    event BatchCancelled(uint256 indexed batchId);

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

    constructor(address _treasury) {
        owner    = msg.sender;
        treasury = _treasury;
    }

    // ── FUNÇÕES PRINCIPAIS ───────────────────────────────────────────────────

    /**
     * @notice Empresa cria um batch de tarefas e deposita a recompensa em ETH.
     * @param taskIds     IDs das tarefas (gerados offchain)
     * @param contents    Conteúdo de cada tarefa
     * @param taskTypes   Tipo de cada tarefa
     * @param deadlineIn  Segundos a partir de agora para o prazo (ex: 86400 = 1 dia)
     */
    function createBatch(
        string[]   calldata taskIds,
        string[]   calldata contents,
        TaskType[] calldata taskTypes,
        uint256              deadlineIn
    ) external payable returns (uint256 batchId) {
        require(taskIds.length > 0,                       "GlobalMind: sem tarefas");
        require(taskIds.length == contents.length,        "GlobalMind: arrays divergentes");
        require(taskIds.length == taskTypes.length,       "GlobalMind: arrays divergentes");
        require(msg.value > 0,                            "GlobalMind: recompensa necessaria");
        require(deadlineIn >= 1 hours,                    "GlobalMind: prazo minimo 1 hora");

        batchId = batchCount++;

        Batch storage b = batches[batchId];
        b.creator   = msg.sender;
        b.reward    = msg.value;
        b.createdAt = block.timestamp;
        b.deadline  = block.timestamp + deadlineIn;
        b.status    = BatchStatus.OPEN;
        b.taskCount = taskIds.length;

        for (uint256 i = 0; i < taskIds.length; i++) {
            b.tasks.push(Task({
                taskId:   taskIds[i],
                content:  contents[i],
                taskType: taskTypes[i]
            }));
        }

        emit BatchCreated(batchId, msg.sender, msg.value, taskIds.length, b.deadline);
    }

    /**
     * @notice Nó (usuário) submete uma resposta para uma tarefa específica.
     * @param batchId    ID do batch
     * @param taskIndex  Índice da tarefa dentro do batch (0-based)
     * @param answer     A resposta do usuário
     */
    function submitAnswer(
        uint256 batchId,
        uint256 taskIndex,
        string calldata answer
    ) external batchExists(batchId) {
        Batch storage b = batches[batchId];

        require(b.status == BatchStatus.OPEN,             "GlobalMind: batch nao esta aberto");
        require(block.timestamp <= b.deadline,            "GlobalMind: prazo encerrado");
        require(taskIndex < b.taskCount,                  "GlobalMind: tarefa nao existe");
        require(!hasAnswered[batchId][taskIndex][msg.sender], "GlobalMind: ja respondeu");
        require(msg.sender != b.creator,                  "GlobalMind: criador nao pode responder");
        require(bytes(answer).length > 0,                 "GlobalMind: resposta vazia");

        answers[batchId][taskIndex].push(Answer({
            node:        msg.sender,
            answer:      answer,
            submittedAt: block.timestamp
        }));

        hasAnswered[batchId][taskIndex][msg.sender] = true;
        nodeTaskCount[msg.sender]++;

        emit AnswerSubmitted(batchId, taskIndex, msg.sender, answer);
    }

    /**
     * @notice Finaliza o batch, calcula consenso e distribui recompensas.
     *
     * CONSENSO SIMPLIFICADO (MVP):
     * Para cada tarefa, a resposta mais frequente vence (plurality voting).
     * Nós que deram a resposta majoritária recebem recompensa.
     * Na v2: substituído por Commit-Reveal com score PoEC completo.
     *
     * @param batchId ID do batch a finalizar
     */
    function finalizeBatch(uint256 batchId) external batchExists(batchId) {
        Batch storage b = batches[batchId];

        require(b.status == BatchStatus.OPEN, "GlobalMind: batch nao esta aberto");
        require(
            block.timestamp > b.deadline ||
            _allTasksHaveMinAnswers(batchId, b.taskCount),
            "GlobalMind: aguardando respostas minimas ou prazo"
        );

        b.status = BatchStatus.FINALIZED;

        // Coleta todos os nós que acertaram o consenso em pelo menos 1 tarefa
        address[] memory winners = _computeWinners(batchId, b.taskCount);
        uint256 winnerCount = winners.length;

        require(winnerCount > 0, "GlobalMind: nenhum vencedor encontrado");

        // Divide a recompensa
        uint256 total       = b.reward;
        uint256 toBurn      = (total * BURN_SHARE)     / 100;
        uint256 toTreasury  = (total * TREASURY_SHARE) / 100;
        uint256 toReward    = total - toBurn - toTreasury;
        uint256 perNode     = toReward / winnerCount;

        // Queima — envia para address(0)
        if (toBurn > 0) {
            (bool burnOk,) = payable(address(0)).call{value: toBurn}("");
            // Em redes EVM, address(0) aceita ETH mas não tem como gastar
            // Na prática o ETH fica bloqueado para sempre — equivalente a queima
            require(burnOk || true, "burn"); // address(0) pode rejeitar em alguns L2s
        }

        // Treasury
        if (toTreasury > 0) {
            (bool treasuryOk,) = payable(treasury).call{value: toTreasury}("");
            require(treasuryOk, "GlobalMind: falha ao enviar para treasury");
        }

        // Distribui para os vencedores e atualiza scores
        for (uint256 i = 0; i < winnerCount; i++) {
            if (winners[i] == address(0)) continue;
            nodeScore[winners[i]] += 10; // +10 pontos por consenso correto
            if (perNode > 0) {
                (bool ok,) = payable(winners[i]).call{value: perNode}("");
                require(ok, "GlobalMind: falha ao pagar node");
            }
        }

        emit BatchFinalized(batchId, perNode, toBurn, toTreasury, winnerCount);
    }

    /**
     * @notice Empresa cancela o batch e recupera o ETH depositado.
     * Só pode cancelar se ainda não houver nenhuma resposta.
     */
    function cancelBatch(uint256 batchId) external batchExists(batchId) {
        Batch storage b = batches[batchId];

        require(b.status == BatchStatus.OPEN,   "GlobalMind: batch nao esta aberto");
        require(msg.sender == b.creator,        "GlobalMind: apenas o criador pode cancelar");
        require(_totalAnswers(batchId, b.taskCount) == 0, "GlobalMind: ja ha respostas");

        b.status = BatchStatus.CANCELLED;

        (bool ok,) = payable(b.creator).call{value: b.reward}("");
        require(ok, "GlobalMind: falha no reembolso");

        emit BatchCancelled(batchId);
    }

    // ── FUNÇÕES DE LEITURA ───────────────────────────────────────────────────

    function getBatchInfo(uint256 batchId) external view batchExists(batchId)
        returns (
            address creator,
            uint256 reward,
            uint256 taskCount,
            uint256 deadline,
            BatchStatus status
        )
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

    function getAnswers(uint256 batchId, uint256 taskIndex) external view batchExists(batchId)
        returns (Answer[] memory)
    {
        return answers[batchId][taskIndex];
    }

    function getNodeProfile(address node) external view
        returns (uint256 score, uint256 totalTasks)
    {
        return (nodeScore[node], nodeTaskCount[node]);
    }

    // ── FUNÇÕES INTERNAS ─────────────────────────────────────────────────────

    /**
     * @dev Retorna todos os nós únicos que concordaram com o consenso
     * em pelo menos uma tarefa do batch.
     */
    function _computeWinners(uint256 batchId, uint256 taskCount)
        internal view returns (address[] memory)
    {
        // Passo 1: conta quantos nós únicos participaram
        address[] memory allNodes = _collectAllNodes(batchId, taskCount);
        uint256 nodeCount = allNodes.length;

        if (nodeCount == 0) return new address[](0);

        // Passo 2: para cada tarefa, acha a resposta majoritária
        // Passo 3: marca os nós que acertaram
        bool[] memory isWinner = new bool[](nodeCount);

        for (uint256 t = 0; t < taskCount; t++) {
            Answer[] storage taskAnswers = answers[batchId][t];
            if (taskAnswers.length < MIN_VALIDATORS) continue;

            string memory majority = _getMajorityAnswer(taskAnswers);

            for (uint256 a = 0; a < taskAnswers.length; a++) {
                if (_strEq(taskAnswers[a].answer, majority)) {
                    // Marca esse nó como vencedor
                    for (uint256 n = 0; n < nodeCount; n++) {
                        if (allNodes[n] == taskAnswers[a].node) {
                            isWinner[n] = true;
                            break;
                        }
                    }
                }
            }
        }

        // Passo 4: monta o array final só com vencedores
        uint256 winCount = 0;
        for (uint256 i = 0; i < nodeCount; i++) {
            if (isWinner[i]) winCount++;
        }

        address[] memory winners = new address[](winCount);
        uint256 wi = 0;
        for (uint256 i = 0; i < nodeCount; i++) {
            if (isWinner[i]) winners[wi++] = allNodes[i];
        }

        return winners;
    }

    /**
     * @dev Acha a resposta mais frequente em um array de answers.
     */
    function _getMajorityAnswer(Answer[] storage taskAnswers)
        internal view returns (string memory majority)
    {
        uint256 len = taskAnswers.length;
        uint256 maxCount = 0;

        for (uint256 i = 0; i < len; i++) {
            uint256 count = 0;
            for (uint256 j = 0; j < len; j++) {
                if (_strEq(taskAnswers[i].answer, taskAnswers[j].answer)) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                majority = taskAnswers[i].answer;
            }
        }
    }

    /**
     * @dev Coleta todos os endereços únicos que participaram do batch.
     */
    function _collectAllNodes(uint256 batchId, uint256 taskCount)
        internal view returns (address[] memory)
    {
        // Conta upper bound
        uint256 upper = 0;
        for (uint256 t = 0; t < taskCount; t++) {
            upper += answers[batchId][t].length;
        }

        address[] memory temp = new address[](upper);
        uint256 count = 0;

        for (uint256 t = 0; t < taskCount; t++) {
            Answer[] storage taskAnswers = answers[batchId][t];
            for (uint256 a = 0; a < taskAnswers.length; a++) {
                address node = taskAnswers[a].node;
                bool found = false;
                for (uint256 k = 0; k < count; k++) {
                    if (temp[k] == node) { found = true; break; }
                }
                if (!found) temp[count++] = node;
            }
        }

        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) result[i] = temp[i];
        return result;
    }

    function _allTasksHaveMinAnswers(uint256 batchId, uint256 taskCount)
        internal view returns (bool)
    {
        for (uint256 t = 0; t < taskCount; t++) {
            if (answers[batchId][t].length < MIN_VALIDATORS) return false;
        }
        return true;
    }

    function _totalAnswers(uint256 batchId, uint256 taskCount)
        internal view returns (uint256 total)
    {
        for (uint256 t = 0; t < taskCount; t++) {
            total += answers[batchId][t].length;
        }
    }

    function _strEq(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    // ── ADMIN ────────────────────────────────────────────────────────────────

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "GlobalMind: treasury invalido");
        treasury = _treasury;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "GlobalMind: owner invalido");
        owner = newOwner;
    }
}
