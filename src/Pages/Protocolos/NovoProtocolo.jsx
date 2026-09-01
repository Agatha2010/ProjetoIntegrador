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

  // Gera número automático do protocolo
  const gerarNumeroProtocolo = () => {
    const ano = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PRO-${ano}-${random}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/protocolos" className={styles.backButton}>
            ← Protocolos
          </Link>
          <h1>📝 Novo Protocolo</h1>
          <p>Cadastre um novo protocolo no sistema</p>
        </div>
        <div className={styles.headerBadges}>
          <span className={`${styles.badge} ${styles.badgeNew}`}>
            ✨ Novo cadastro
          </span>
          <button 
            className={styles.autoGenerateBtn}
            onClick={() => setForm({...form, numero: gerarNumeroProtocolo()})}
            title="Gerar número automaticamente"
          >
            🎲 Gerar número
          </button>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Número do Protocolo */}
            <div className={styles.formGroup}>
              <label>
                Número do protocolo *
                <span className={styles.labelHint}>Clique em "Gerar número"</span>
              </label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="Ex: PRO-2024-001"
                  required
                  className={styles.inputAuto}
                />
                <button
                  type="button"
                  className={styles.generateBtn}
                  onClick={() => setForm({...form, numero: gerarNumeroProtocolo()})}
                >
                  🎲
                </button>
              </div>
            </div>

            {/* Cliente */}
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

            {/* Tipo */}
            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
                className={styles.selectStyled}
              >
                <option value="">Selecione o tipo</option>
                <option value="Licenciamento Ambiental">🌿 Licenciamento Ambiental</option>
                <option value="Renovação de Licença">🔄 Renovação de Licença</option>
                <option value="Novo Cadastro">📝 Novo Cadastro</option>
                <option value="Regularização">📋 Regularização</option>
              </select>
            </div>

            {/* Responsável */}
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

            {/* Status */}
            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={styles.selectStyled}
              >
                <option value="Em andamento">⏳ Em andamento</option>
                <option value="Concluído">✅ Concluído</option>
                <option value="Pendente">⏸️ Pendente</option>
                <option value="Atrasado">🔴 Atrasado</option>
              </select>
            </div>

            {/* Prioridade */}
            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select
                name="prioridade"
                value={form.prioridade}
                onChange={handleChange}
                className={styles.selectStyled}
              >
                <option value="Urgente">🔴 Urgente</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Média">🟡 Média</option>
                <option value="Baixa">🟢 Baixa</option>
              </select>
            </div>

            {/* Data de Abertura */}
            <div className={styles.formGroup}>
              <label>Data de abertura</label>
              <input
                type="date"
                name="dataAbertura"
                value={form.dataAbertura}
                onChange={handleChange}
                className={styles.dateInput}
              />
              <span className={styles.fieldHint}>
                {!form.dataAbertura && "Deixe em branco para usar a data atual"}
              </span>
            </div>

            {/* Data Prevista */}
            <div className={styles.formGroup}>
              <label>Data prevista *</label>
              <input
                type="date"
                name="dataPrevista"
                value={form.dataPrevista}
                onChange={handleChange}
                required
                className={styles.dateInput}
              />
            </div>

            {/* Descrição */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o protocolo..."
                rows="3"
                className={styles.textareaStyled}
              />
            </div>

            {/* Observações */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                placeholder="Observações adicionais sobre o protocolo..."
                rows="2"
                className={styles.textareaStyled}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <div className={styles.formActionsLeft}>
              <span className={styles.requiredHint}>* Campos obrigatórios</span>
            </div>
            <div className={styles.formActionsRight}>
              <Link to="/protocolos" className={styles.cancelButton}>
                ❌ Cancelar
              </Link>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={salvando}
              >
                {salvando ? (
                  <>
                    <span className={styles.spinner}>⟳</span>
                    Salvando...
                  </>
                ) : (
                  <>
                    💾 Salvar protocolo
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview do protocolo */}
      {form.numero && form.cliente && (
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <span>📋 Pré-visualização</span>
            <span className={styles.previewBadge}>Auto atualiza</span>
          </div>
          <div className={styles.previewContent}>
            <div className={styles.previewItem}>
              <span>Número</span>
              <strong>{form.numero || "—"}</strong>
            </div>
            <div className={styles.previewItem}>
              <span>Cliente</span>
              <strong>{form.cliente || "—"}</strong>
            </div>
            <div className={styles.previewItem}>
              <span>Tipo</span>
              <strong>{form.tipo || "—"}</strong>
            </div>
            <div className={styles.previewItem}>
              <span>Status</span>
              <span className={`${styles.statusBadge} ${styles[form.status === "Em andamento" ? "inProgress" : form.status === "Concluído" ? "completed" : form.status === "Pendente" ? "pending" : "delayed"]}`}>
                <span className={styles.dot}></span>
                {form.status || "—"}
              </span>
            </div>
            <div className={styles.previewItem}>
              <span>Prioridade</span>
              <span className={`${styles.prioridadeBadge} ${styles[form.prioridade.toLowerCase()]}`}>
                {form.prioridade || "—"}
              </span>
            </div>
            <div className={styles.previewItem}>
              <span>Responsável</span>
              <strong>{form.responsavel || "—"}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NovoProtocolo;