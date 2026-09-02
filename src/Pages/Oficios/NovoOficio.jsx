import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Oficios.module.css";

function NovoOficio() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    numero: "",
    dataEmissao: hoje,
    dataVencimento: "",
    status: "Em andamento",
    links: "",
    projeto: "",
    cliente: "",
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
      const oficiosSalvos = JSON.parse(localStorage.getItem("oficios")) || [];

      const novoOficio = {
        id: Date.now(),
        ...form,
        historico: [
          {
            data: new Date().toISOString().split("T")[0],
            evento: "Ofício criado",
          },
        ],
      };

      const novaLista = [...oficiosSalvos, novoOficio];
      localStorage.setItem("oficios", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/oficios");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/oficios" className={styles.backButton}>← Ofícios</Link>
          <h1>➕ Novo ofício</h1>
          <p>Cadastre um novo ofício no sistema</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Número do ofício *</label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="Número do ofício"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Concluído">✅ Concluído</option>
                <option value="Em andamento">⏳ Em andamento</option>
                <option value="Pendente">⏸️ Pendente</option>
                <option value="Cancelado">❌ Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data de emissão *</label>
              <input
                type="date"
                name="dataEmissao"
                value={form.dataEmissao}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data de vencimento *</label>
              <input
                type="date"
                name="dataVencimento"
                value={form.dataVencimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Projeto *</label>
              <input
                type="text"
                name="projeto"
                value={form.projeto}
                onChange={handleChange}
                placeholder="Nome do projeto"
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
              <label>Links de documentos</label>
              <input
                type="text"
                name="links"
                value={form.links}
                onChange={handleChange}
                placeholder="Links para documentos"
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição do ofício..."
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                rows="2"
                placeholder="Observações adicionais..."
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to="/oficios" className={styles.cancelButton}>
              ❌ Cancelar
            </Link>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={salvando}
            >
              {salvando ? "💾 Salvando..." : "💾 Salvar ofício"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoOficio;