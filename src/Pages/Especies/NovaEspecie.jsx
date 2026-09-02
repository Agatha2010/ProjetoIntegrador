import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Especies.module.css";

function NovaEspecie() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    nomeCientifico: "",
    familia: "",
    nomePopular: "",
    versao: "v1",
    status: "Pendente",
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
      const especiesSalvas = JSON.parse(localStorage.getItem("especies")) || [];

      const novaEspecie = {
        id: Date.now(),
        ...form,
        dataCadastro: new Date().toISOString().split("T")[0],
        historico: [
          {
            data: new Date().toISOString().split("T")[0],
            evento: "Espécie cadastrada",
          },
        ],
      };

      const novaLista = [...especiesSalvas, novaEspecie];
      localStorage.setItem("especies", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/especies");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/especies" className={styles.backButton}>← Espécies</Link>
          <h1>➕ Nova espécie</h1>
          <p>Cadastre uma nova espécie no sistema</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nome científico *</label>
              <input
                type="text"
                name="nomeCientifico"
                value={form.nomeCientifico}
                onChange={handleChange}
                placeholder="Ex: Ma langsdorffii"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Família *</label>
              <input
                type="text"
                name="familia"
                value={form.familia}
                onChange={handleChange}
                placeholder="Ex: Myrtaceae"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Nome popular</label>
              <input
                type="text"
                name="nomePopular"
                value={form.nomePopular}
                onChange={handleChange}
                placeholder="Ex: Brinco-de-macaco"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Versão</label>
              <input
                type="text"
                name="versao"
                value={form.versao}
                onChange={handleChange}
                placeholder="Ex: v1"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Aprovada">✅ Aprovada</option>
                <option value="Pendente">⏳ Pendente</option>
                <option value="Rejeitada">❌ Rejeitada</option>
                <option value="Em análise">🔍 Em análise</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição da espécie..."
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
            <Link to="/especies" className={styles.cancelButton}>
              ❌ Cancelar
            </Link>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={salvando}
            >
              {salvando ? "💾 Salvando..." : "💾 Salvar espécie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaEspecie;