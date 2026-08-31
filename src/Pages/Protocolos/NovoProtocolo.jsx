import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Protocolos.module.css";

function NovoProtocolo() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    numero: "",
    cliente: "",
    tipo: "",
    dataAbertura: "",
    dataPrevista: "",
    status: "Em andamento",
    responsavel: "",
    prioridade: "Média",
    descricao: "",
    observacoes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);

    setTimeout(() => {
      const protocolosSalvos = JSON.parse(localStorage.getItem("protocolos")) || [];

      const novoProtocolo = {
        id: Date.now(),
        ...form,
        dataAbertura: form.dataAbertura || new Date().toISOString().split("T")[0],
        historico: [
          {
            data: new Date().toISOString().split("T")[0],
            evento: "Protocolo aberto",
          },
        ],
      };

      const novaLista = [...protocolosSalvos, novoProtocolo];
      localStorage.setItem("protocolos", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/protocolos");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/protocolos" className={styles.backButton}>← Protocolos</Link>
          <h1>➕ Novo protocolo</h1>
          <p>Cadastre um novo protocolo no sistema</p>
        </div>
        <div className={styles.infoBadge}>
          <span className={styles.badge}>Novo cadastro</span>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Número do protocolo *</label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="Ex: PRO-2024-001"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input
                type="text"
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                placeholder="Nome do cliente"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Licenciamento Ambiental">Licenciamento Ambiental</option>
                <option value="Renovação de Licença">Renovação de Licença</option>
                <option value="Novo Cadastro">Novo Cadastro</option>
                <option value="Regularização">Regularização</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select
                name="prioridade"
                value={form.prioridade}
                onChange={handleChange}
              >
                <option value="Urgente">Urgente</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Responsável *</label>
              <input
                type="text"
                name="responsavel"
                value={form.responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data de abertura</label>
              <input
                type="date"
                name="dataAbertura"
                value={form.dataAbertura}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data prevista *</label>
              <input
                type="date"
                name="dataPrevista"
                value={form.dataPrevista}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descrição do protocolo"
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Observações</label>
              <input
                type="text"
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                placeholder="Observações adicionais"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to="/protocolos" className={styles.cancelButton}>
              ❌ Cancelar
            </Link>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={salvando}
            >
              {salvando ? "💾 Salvando..." : "💾 Salvar protocolo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoProtocolo;