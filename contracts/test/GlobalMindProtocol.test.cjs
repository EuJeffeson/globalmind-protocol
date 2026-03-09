const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("GlobalMindProtocol", function () {
  let contract;
  let owner, company, node1, node2, node3, treasury;

  const TaskType = { TEXT_CLASSIFICATION: 0, FACT_VERIFICATION: 1 };
  const ONE_ETH = ethers.parseEther("1.0");
  const ONE_DAY = 24 * 60 * 60;

  beforeEach(async () => {
    [owner, company, node1, node2, node3, treasury] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("GlobalMindProtocol");
    contract = await Factory.deploy(treasury.address);
    await contract.waitForDeployment();
  });

  describe("createBatch()", () => {
    it("deve criar um batch e emitir BatchCreated", async () => {
      const tx = await contract.connect(company).createBatch(
        ["task-001"],
        ["O ceu e azul?"],
        [TaskType.FACT_VERIFICATION],
        ONE_DAY,
        { value: ONE_ETH }
      );
      await expect(tx).to.emit(contract, "BatchCreated");
      const info = await contract.getBatchInfo(0);
      expect(info.creator).to.equal(company.address);
      expect(info.reward).to.equal(ONE_ETH);
      expect(info.status).to.equal(0);
    });

    it("deve reverter sem recompensa", async () => {
      await expect(
        contract.connect(company).createBatch(["t1"], ["x"], [0], ONE_DAY, { value: 0 })
      ).to.be.revertedWith("GlobalMind: recompensa necessaria");
    });

    it("deve reverter com prazo menor que 1 hora", async () => {
      await expect(
        contract.connect(company).createBatch(["t1"], ["x"], [0], 1800, { value: ONE_ETH })
      ).to.be.revertedWith("GlobalMind: prazo minimo 1 hora");
    });
  });

  describe("submitAnswer()", () => {
    beforeEach(async () => {
      await contract.connect(company).createBatch(
        ["task-001"],
        ["Capital do Brasil?"],
        [TaskType.FACT_VERIFICATION],
        ONE_DAY,
        { value: ONE_ETH }
      );
    });

    it("deve aceitar resposta e emitir AnswerSubmitted", async () => {
      await expect(contract.connect(node1).submitAnswer(0, 0, "Brasilia"))
        .to.emit(contract, "AnswerSubmitted")
        .withArgs(0, 0, node1.address, "Brasilia");
      const profile = await contract.getNodeProfile(node1.address);
      expect(profile.totalTasks).to.equal(1n);
    });

    it("deve reverter se responder duas vezes", async () => {
      await contract.connect(node1).submitAnswer(0, 0, "Brasilia");
      await expect(
        contract.connect(node1).submitAnswer(0, 0, "Brasilia")
      ).to.be.revertedWith("GlobalMind: ja respondeu");
    });

    it("deve reverter se o criador tentar responder", async () => {
      await expect(
        contract.connect(company).submitAnswer(0, 0, "Brasilia")
      ).to.be.revertedWith("GlobalMind: criador nao pode responder");
    });

    it("deve reverter se o prazo passou", async () => {
      await time.increase(2 * ONE_DAY);
      await expect(
        contract.connect(node1).submitAnswer(0, 0, "Brasilia")
      ).to.be.revertedWith("GlobalMind: prazo encerrado");
    });
  });

  describe("finalizeBatch()", () => {
    beforeEach(async () => {
      await contract.connect(company).createBatch(
        ["task-001"],
        ["Capital do Brasil?"],
        [TaskType.FACT_VERIFICATION],
        ONE_DAY,
        { value: ethers.parseEther("0.3") }
      );
      await contract.connect(node1).submitAnswer(0, 0, "Brasilia");
      await contract.connect(node2).submitAnswer(0, 0, "Brasilia");
      await contract.connect(node3).submitAnswer(0, 0, "Sao Paulo");
    });

    it("deve finalizar, pagar vencedores e atualizar scores", async () => {
      const bal1before = await ethers.provider.getBalance(node1.address);
      const bal3before = await ethers.provider.getBalance(node3.address);

      await expect(contract.finalizeBatch(0)).to.emit(contract, "BatchFinalized");

      expect(await ethers.provider.getBalance(node1.address)).to.be.gt(bal1before);
      expect(await ethers.provider.getBalance(node3.address)).to.be.lte(bal3before);
      expect((await contract.getNodeProfile(node1.address)).score).to.equal(10n);
      expect((await contract.getNodeProfile(node3.address)).score).to.equal(0n);
      expect((await contract.getBatchInfo(0)).status).to.equal(1);
    });

    it("deve reverter ao finalizar duas vezes", async () => {
      await contract.finalizeBatch(0);
      await expect(
        contract.finalizeBatch(0)
      ).to.be.revertedWith("GlobalMind: batch nao esta aberto");
    });
  });

  describe("cancelBatch()", () => {
    it("deve reembolsar a empresa se sem respostas", async () => {
      await contract.connect(company).createBatch(
        ["t1"], ["Teste"], [0], ONE_DAY, { value: ONE_ETH }
      );
      const before = await ethers.provider.getBalance(company.address);
      await contract.connect(company).cancelBatch(0);
      expect(
        await ethers.provider.getBalance(company.address)
      ).to.be.gt(before - ethers.parseEther("0.01"));
      expect((await contract.getBatchInfo(0)).status).to.equal(2);
    });

    it("deve reverter se ja houver respostas", async () => {
      await contract.connect(company).createBatch(
        ["t1"], ["Teste"], [0], ONE_DAY, { value: ONE_ETH }
      );
      await contract.connect(node1).submitAnswer(0, 0, "sim");
      await expect(
        contract.connect(company).cancelBatch(0)
      ).to.be.revertedWith("GlobalMind: ja ha respostas");
    });
  });

  describe("Cenario end-to-end", () => {
    it("empresa paga, 3 nos validam 2 tarefas, vencedores recebem", async () => {
      await contract.connect(company).createBatch(
        ["s-001", "s-002"],
        ["Produto otimo!", "Pessimo atendimento."],
        [TaskType.TEXT_CLASSIFICATION, TaskType.TEXT_CLASSIFICATION],
        ONE_DAY,
        { value: ethers.parseEther("0.6") }
      );

      await contract.connect(node1).submitAnswer(0, 0, "positivo");
      await contract.connect(node2).submitAnswer(0, 0, "positivo");
      await contract.connect(node3).submitAnswer(0, 0, "positivo");

      await contract.connect(node1).submitAnswer(0, 1, "negativo");
      await contract.connect(node2).submitAnswer(0, 1, "negativo");
      await contract.connect(node3).submitAnswer(0, 1, "positivo");

      await expect(contract.finalizeBatch(0)).to.emit(contract, "BatchFinalized");

      expect((await contract.getNodeProfile(node1.address)).score).to.be.gte(10n);
      expect((await contract.getNodeProfile(node2.address)).score).to.be.gte(10n);
      expect((await contract.getNodeProfile(node1.address)).totalTasks).to.equal(2n);
    });
  });
});
