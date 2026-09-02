import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Oficios.module.css";

function EditarOficio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const oficios = [
      {
        id: 1,
        numero: "21967/2024/SEFIS-RS/ANM",
        dataEmissao: "2024-06-18",
        dataVencimento: "2024-07-18",
        status: "Concluído",
        links: "Sem links",
        projeto: "Carolina Borba da Silva - ME",
        cliente: "Pedreira Borbinha",
        descricao: "Ofício referente à regularização da licença ambiental.",
        observacoes: "Documento arquivado.",
      },
      {
        id: 2,
        numero: "00994 / 2024",
        dataEmissao: "2024-03-04",
        dataVencimento: "2024-07-04",
        status: "Concluído",
        links: "Sem links",
        projeto: "Parmíssimo",
        cliente: "Parmíssimo Alimentos LTDA",
        descricao: "Ofício para renovação de licença.",
        observacoes: "Processo finalizado.",
      },
    ];

    const encontrado = oficios.find((o) => o.id === Number(id));
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
      navigate(`/oficios/${id}`);
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
            <Link to="/oficios" className={styles.backButton}>← Ofícios</Link>
            <h1>Ofício não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/oficios/${id}`} className={styles.backButton}>← Ofício</Link>
          <h1>✎ Editar ofício</h1>
          <p>Atualize os dados do ofício</p>
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
                value={form.numero || ""}
                onChange={handleChange}
                placeholder="Número do ofício"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status || ""}
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
                value={form.dataEmissao || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data de vencimento *</label>
              <input
                type="date"
                name="dataVencimento"
                value={form.dataVencimento || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Projeto *</label>
              <input
                type="text"
                name="projeto"
                value={form.projeto || ""}
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
                value={form.cliente || ""}
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
                value={form.links || ""}
                onChange={handleChange}
                placeholder="Links para documentos"
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao || ""}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição do ofício..."
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
            <Link to={`/oficios/${id}`} className={styles.cancelButton}>
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

export default EditarOficio;