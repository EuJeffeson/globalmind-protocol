// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title  GMNDToken
 * @notice Token oficial do GlobalMind Protocol (GMND)
 *
 * DISTRIBUIÇÃO (1,000,000,000 GMND total):
 *  - 40% Recompensas de rede    → 400,000,000 GMND (liberação via protocolo)
 *  - 15% Venda Seed             → 150,000,000 GMND (cliff 6m + vesting 18m)
 *  - 15% Equipe & Fundadores    → 150,000,000 GMND (cliff 12m + vesting 36m)
 *  - 15% Ecossistema            → 150,000,000 GMND (via DAO)
 *  - 10% Reserva do protocolo   → 100,000,000 GMND (multisig)
 *  -  5% Liquidez inicial       → 50,000,000  GMND (TGE)
 */
contract GMNDToken {

    // ── METADATA ─────────────────────────────────────────────────────────────

    string  public constant name     = "GlobalMind Protocol";
    string  public constant symbol   = "GMND";
    uint8   public constant decimals = 18;

    // ── SUPPLY ───────────────────────────────────────────────────────────────

    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10 ** 18; // 1 bilhão

    // Alocações (em tokens sem decimais para legibilidade)
    uint256 public constant NETWORK_REWARDS = 400_000_000 * 10 ** 18; // 40%
    uint256 public constant SEED_ALLOCATION  = 150_000_000 * 10 ** 18; // 15%
    uint256 public constant TEAM_ALLOCATION  = 150_000_000 * 10 ** 18; // 15%
    uint256 public constant ECOSYSTEM        = 150_000_000 * 10 ** 18; // 15%
    uint256 public constant RESERVE          = 100_000_000 * 10 ** 18; // 10%
    uint256 public constant LIQUIDITY        =  50_000_000 * 10 ** 18; //  5%

    // ── VESTING ──────────────────────────────────────────────────────────────

    struct VestingSchedule {
        address beneficiary;    // Quem vai receber
        uint256 totalAmount;    // Total alocado
        uint256 released;       // Já liberado
        uint256 startTime;      // Início do vesting
        uint256 cliffDuration;  // Tempo até primeiro release (segundos)
        uint256 vestingDuration;// Tempo total de vesting (segundos)
        bool    revocable;      // Pode ser revogado pelo owner?
        bool    revoked;        // Foi revogado?
    }

    VestingSchedule[] public vestingSchedules;
    mapping(address => uint256[]) public beneficiarySchedules; // endereço => índices

    // ── ERC-20 STATE ─────────────────────────────────────────────────────────

    mapping(address => uint256)                     public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    uint256 public totalSupply;

    // ── ACCESS CONTROL ───────────────────────────────────────────────────────

    address public owner;
    address public protocolContract; // Endereço do GlobalMindProtocol (para queima)

    // ── EVENTS ───────────────────────────────────────────────────────────────

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event VestingCreated(uint256 indexed scheduleId, address indexed beneficiary, uint256 amount);
    event TokensReleased(uint256 indexed scheduleId, address indexed beneficiary, uint256 amount);
    event TokensBurned(address indexed burner, uint256 amount);
    event ProtocolContractSet(address indexed protocol);

    // ── MODIFIERS ────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "GMND: apenas o owner");
        _;
    }

    modifier onlyProtocol() {
        require(msg.sender == protocolContract || msg.sender == owner, "GMND: apenas o protocolo");
        _;
    }

    // ── CONSTRUCTOR ──────────────────────────────────────────────────────────

    /**
     * @param _teamWallet      Carteira da equipe (vesting 12m cliff + 36m)
     * @param _reserveWallet   Carteira da reserva (multisig recomendado)
     * @param _ecosystemWallet Carteira do ecossistema (DAO futura)
     * @param _liquidityWallet Carteira de liquidez (para DEX)
     * @param _seedWallet      Carteira da venda seed
     */
    constructor(
        address _teamWallet,
        address _reserveWallet,
        address _ecosystemWallet,
        address _liquidityWallet,
        address _seedWallet
    ) {
        require(_teamWallet      != address(0), "GMND: team wallet invalida");
        require(_reserveWallet   != address(0), "GMND: reserve wallet invalida");
        require(_ecosystemWallet != address(0), "GMND: ecosystem wallet invalida");
        require(_liquidityWallet != address(0), "GMND: liquidity wallet invalida");
        require(_seedWallet      != address(0), "GMND: seed wallet invalida");

        owner = msg.sender;
        totalSupply = TOTAL_SUPPLY;

        // 1. Recompensas de rede → ficam no contrato do protocolo (mint para owner por enquanto)
        _mint(msg.sender, NETWORK_REWARDS);

        // 2. Liquidez → liberada imediatamente no TGE
        _mint(_liquidityWallet, LIQUIDITY);

        // 3. Reserva → carteira de reserva (multisig)
        _mint(_reserveWallet, RESERVE);

        // 4. Ecossistema → carteira do ecossistema
        _mint(_ecosystemWallet, ECOSYSTEM);

        // 5. Seed → vesting: cliff 6 meses + 18 meses de liberação linear
        _mint(address(this), SEED_ALLOCATION);
        _createVesting(_seedWallet, SEED_ALLOCATION, 180 days, 540 days, true);

        // 6. Equipe → vesting: cliff 12 meses + 36 meses de liberação linear
        _mint(address(this), TEAM_ALLOCATION);
        _createVesting(_teamWallet, TEAM_ALLOCATION, 365 days, 1095 days, true);
    }

    // ── ERC-20 FUNCTIONS ─────────────────────────────────────────────────────

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(allowance[from][msg.sender] >= amount, "GMND: allowance insuficiente");
        allowance[from][msg.sender] -= amount;
        _transfer(from, to, amount);
        return true;
    }

    // ── BURN (DEFLAÇÃO) ───────────────────────────────────────────────────────

    /**
     * @notice Queima tokens — chamado pelo protocolo a cada transação corporativa.
     * Reduz o supply total permanentemente, criando pressão deflacionária.
     */
    function burn(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "GMND: saldo insuficiente para queimar");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @notice Queima tokens de um endereço específico (só protocolo ou owner).
     * Usado pelo GlobalMindProtocol para queimar automaticamente 20% de cada batch.
     */
    function burnFrom(address account, uint256 amount) external onlyProtocol {
        require(balanceOf[account] >= amount, "GMND: saldo insuficiente");
        require(allowance[account][msg.sender] >= amount || msg.sender == owner, "GMND: sem permissao");
        balanceOf[account] -= amount;
        totalSupply -= amount;
        emit Transfer(account, address(0), amount);
        emit TokensBurned(account, amount);
    }

    // ── VESTING ───────────────────────────────────────────────────────────────

    /**
     * @notice Beneficiário resgata tokens disponíveis do seu vesting.
     */
    function releaseVesting(uint256 scheduleId) external {
        VestingSchedule storage schedule = vestingSchedules[scheduleId];
        require(msg.sender == schedule.beneficiary, "GMND: nao e o beneficiario");
        require(!schedule.revoked, "GMND: vesting revogado");

        uint256 releasable = _releasableAmount(schedule);
        require(releasable > 0, "GMND: nenhum token disponivel ainda");

        schedule.released += releasable;
        balanceOf[address(this)] -= releasable;
        balanceOf[schedule.beneficiary] += releasable;

        emit Transfer(address(this), schedule.beneficiary, releasable);
        emit TokensReleased(scheduleId, schedule.beneficiary, releasable);
    }

    /**
     * @notice Revoga um vesting (só owner, só se revocable = true).
     * Tokens não liberados retornam para o owner.
     */
    function revokeVesting(uint256 scheduleId) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[scheduleId];
        require(schedule.revocable, "GMND: vesting nao revogavel");
        require(!schedule.revoked,  "GMND: ja revogado");

        uint256 releasable = _releasableAmount(schedule);
        if (releasable > 0) {
            schedule.released += releasable;
            balanceOf[address(this)] -= releasable;
            balanceOf[schedule.beneficiary] += releasable;
            emit Transfer(address(this), schedule.beneficiary, releasable);
        }

        uint256 remaining = schedule.totalAmount - schedule.released;
        schedule.revoked = true;
        balanceOf[address(this)] -= remaining;
        balanceOf[owner] += remaining;
        emit Transfer(address(this), owner, remaining);
    }

    /**
     * @notice Consulta quantos tokens estão disponíveis para resgate.
     */
    function releasableAmount(uint256 scheduleId) external view returns (uint256) {
        return _releasableAmount(vestingSchedules[scheduleId]);
    }

    /**
     * @notice Consulta todos os schedules de um beneficiário.
     */
    function getSchedulesByBeneficiary(address beneficiary) external view returns (uint256[] memory) {
        return beneficiarySchedules[beneficiary];
    }

    // ── PROTOCOL INTEGRATION ──────────────────────────────────────────────────

    /**
     * @notice Define o endereço do contrato do protocolo (GlobalMindProtocol).
     * Só pode ser chamado uma vez após o deploy do protocolo.
     */
    function setProtocolContract(address _protocol) external onlyOwner {
        require(_protocol != address(0), "GMND: endereco invalido");
        protocolContract = _protocol;
        emit ProtocolContractSet(_protocol);
    }

    /**
     * @notice Transfere tokens de recompensa do pool para um validador.
     * Chamado pelo GlobalMindProtocol ao finalizar um batch.
     */
    function rewardNode(address node, uint256 amount) external onlyProtocol {
        require(balanceOf[address(this)] >= amount || balanceOf[owner] >= amount, "GMND: pool de recompensas vazio");
        address source = balanceOf[owner] >= amount ? owner : address(this);
        balanceOf[source] -= amount;
        balanceOf[node] += amount;
        emit Transfer(source, node, amount);
    }

    // ── ADMIN ─────────────────────────────────────────────────────────────────

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "GMND: owner invalido");
        owner = newOwner;
    }

    // ── INTERNAL ─────────────────────────────────────────────────────────────

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "GMND: transfer from zero");
        require(to   != address(0), "GMND: transfer to zero");
        require(balanceOf[from] >= amount, "GMND: saldo insuficiente");
        balanceOf[from] -= amount;
        balanceOf[to]   += amount;
        emit Transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "GMND: mint to zero");
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function _createVesting(
        address beneficiary,
        uint256 amount,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool    revocable
    ) internal {
        uint256 scheduleId = vestingSchedules.length;
        vestingSchedules.push(VestingSchedule({
            beneficiary:     beneficiary,
            totalAmount:     amount,
            released:        0,
            startTime:       block.timestamp,
            cliffDuration:   cliffDuration,
            vestingDuration: vestingDuration,
            revocable:       revocable,
            revoked:         false
        }));
        beneficiarySchedules[beneficiary].push(scheduleId);
        emit VestingCreated(scheduleId, beneficiary, amount);
    }

    function _releasableAmount(VestingSchedule storage schedule) internal view returns (uint256) {
        if (schedule.revoked) return 0;

        uint256 elapsed = block.timestamp - schedule.startTime;

        // Ainda no cliff — nada liberado
        if (elapsed < schedule.cliffDuration) return 0;

        // Vesting completo — tudo liberado
        if (elapsed >= schedule.vestingDuration) {
            return schedule.totalAmount - schedule.released;
        }

        // Liberação linear proporcional ao tempo
        uint256 vested = (schedule.totalAmount * elapsed) / schedule.vestingDuration;
        return vested - schedule.released;
    }
}
