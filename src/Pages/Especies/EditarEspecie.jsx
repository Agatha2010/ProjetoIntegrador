import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Especies.module.css";

function EditarEspecie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const especies = [
      {
        id: 1,
        nomeCientifico: "Ma langsdorffii",
        familia: "Myrtaceae",
        nomePopular: "Brinco-de-macaco",
        versao: "v1",
        status: "Aprovada",
        descricao: "Espécie nativa da Mata Atlântica.",
        observacoes: "Coleta realizada na Serra do Mar.",
      },
      {
        id: 2,
        nomeCientifico: "On pauciflorum",
        familia: "Malvaceae",
        nomePopular: "—",
        versao: "v1",
        status: "Aprovada",
        descricao: "Espécie comum em áreas de cerrado.",
        observacoes: "Material herborizado.",
      },
    ];

    const encontrado = especies.find((e) => e.id === Number(id));
    setForm(encontrado);
    setCarregando(false);
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((dados) => ({
      ...dados,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      navigate(`/especies/${id}`);
    }, 1000);
  }

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/especies" className={styles.backButton}>← Espécies</Link>
            <h1>Espécie não encontrada</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/especies/${id}`} className={styles.backButton}>← Espécie</Link>
          <h1>✎ Editar espécie</h1>
          <p>Atualize os dados da espécie</p>
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
                value={form.nomeCientifico || ""}
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
                value={form.familia || ""}
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
                value={form.nomePopular || ""}
                onChange={handleChange}
                placeholder="Ex: Brinco-de-macaco"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Versão</label>
              <input
                type="text"
                name="versao"
                value={form.versao || ""}
                onChange={handleChange}
                placeholder="Ex: v1"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status || ""}
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
                value={form.descricao || ""}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição da espécie..."
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={form.observacoes || ""}
                onChange={handleChange}
                rows="2"
                placeholder="Observações adicionais..."
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to={`/especies/${id}`} className={styles.cancelButton}>
              ❌ Cancelar
            </Link>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={salvando}
            >
              {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarEspecie;