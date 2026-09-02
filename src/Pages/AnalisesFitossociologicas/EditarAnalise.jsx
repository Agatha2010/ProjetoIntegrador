    import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AnalisesFitossociologicas.module.css";

function EditarAnalise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const analises = [
      {
        id: 1,
        titulo: "Em frente ao Alpen",
        inicioColeta: "2026-03-30",
        parcelas: 8,
        areaParcela: "100 m²",
        areaTotal: "2.4 m²",
        areaAmostrada: "0.08 m²",
        projeto: "Em frente ao Alpen",
        status: "Concluída",
        responsavel: "Dr. Carlos Silva",
        coordenadas: "-23.5505, -46.6333",
        descricao: "Análise fitossociológica realizada na área em frente ao Alpen.",
        observacoes: "Amostragem realizada em 8 parcelas de 100m² cada.",
      },
      {
        id: 2,
        titulo: "Teste2",
        inicioColeta: "2026-03-10",
        parcelas: 17,
        areaParcela: "100 m²",
        areaTotal: "16.54 m²",
        areaAmostrada: "0.17 m²",
        projeto: "Fitossociologia testes",
        status: "Em andamento",
        responsavel: "Dra. Ana Oliveira",
        coordenadas: "-23.5505, -46.6333",
        descricao: "Análise de teste para validação da metodologia.",
        observacoes: "Em andamento, aguardando conclusão da coleta.",
      },
    ];

    const encontrado = analises.find((a) => a.id === Number(id));
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
      navigate(`/analises/${id}`);
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
            <Link to="/analises" className={styles.backButton}>← Análises</Link>
            <h1>Análise não encontrada</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/analises/${id}`} className={styles.backButton}>← Análise</Link>
          <h1>✎ Editar análise</h1>
          <p>Atualize os dados da análise fitossociológica</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Título *</label>
              <input
                type="text"
                name="titulo"
                value={form.titulo || ""}
                onChange={handleChange}
                placeholder="Título da análise"
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
              <label>Início da coleta *</label>
              <input
                type="date"
                name="inicioColeta"
                value={form.inicioColeta || ""}
                onChange={handleChange}
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
                <option value="Concluída">✅ Concluída</option>
                <option value="Em andamento">⏳ Em andamento</option>
                <option value="Pendente">⏸️ Pendente</option>
                <option value="Cancelada">❌ Cancelada</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Responsável *</label>
              <input
                type="text"
                name="responsavel"
                value={form.responsavel || ""}
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Coordenadas</label>
              <input
                type="text"
                name="coordenadas"
                value={form.coordenadas || ""}
                onChange={handleChange}
                placeholder="Ex: -23.5505, -46.6333"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Parcelas *</label>
              <input
                type="number"
                name="parcelas"
                value={form.parcelas || ""}
                onChange={handleChange}
                placeholder="Número de parcelas"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Área parcela *</label>
              <input
                type="text"
                name="areaParcela"
                value={form.areaParcela || ""}
                onChange={handleChange}
                placeholder="Ex: 100 m²"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Área total *</label>
              <input
                type="text"
                name="areaTotal"
                value={form.areaTotal || ""}
                onChange={handleChange}
                placeholder="Ex: 2.4 m²"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Área amostrada *</label>
              <input
                type="text"
                name="areaAmostrada"
                value={form.areaAmostrada || ""}
                onChange={handleChange}
                placeholder="Ex: 0.08 m²"
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao || ""}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição da análise..."
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
            <Link to={`/analises/${id}`} className={styles.cancelButton}>
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

export default EditarAnalise;