import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Agenda.module.css";

function EditarAgenda() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const compromissos = [
      {
        id: 1,
        titulo: "Reunião com cliente - Empresa Verde",
        data: "2024-08-24",
        hora: "14:00",
        tipo: "Reunião",
        cliente: "Empresa Verde Ltda.",
        local: "Sala de Reuniões 1",
        status: "Confirmado",
        prioridade: "Alta",
        descricao: "Apresentação do projeto de licenciamento ambiental.",
        observacoes: "Trazer documentos e relatórios atualizados.",
      },
      {
        id: 2,
        titulo: "Visita técnica - AgroSul",
        data: "2024-08-26",
        hora: "09:30",
        tipo: "Visita",
        cliente: "AgroSul Ltda.",
        local: "Unidade AgroSul - Novo Hamburgo",
        status: "Confirmado",
        prioridade: "Média",
        descricao: "Vistoria para renovação de licença.",
        observacoes: "Equipamentos de segurança necessários.",
      },
    ];

    const encontrado = compromissos.find((c) => c.id === Number(id));
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
      navigate(`/agenda/${id}`);
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
            <Link to="/agenda" className={styles.backButton}>← Agenda</Link>
            <h1>Compromisso não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/agenda/${id}`} className={styles.backButton}>← Compromisso</Link>
          <h1>✎ Editar compromisso</h1>
          <p>Atualize os dados do compromisso</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Título *</label>
              <input type="text" name="titulo" value={form.titulo || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select name="tipo" value={form.tipo || ""} onChange={handleChange} required>
                <option value="Reunião">🤝 Reunião</option>
                <option value="Visita">🏭 Visita</option>
                <option value="Entrega">📦 Entrega</option>
                <option value="Vistoria">🔍 Vistoria</option>
                <option value="Apresentação">📊 Apresentação</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data *</label>
              <input type="date" name="data" value={form.data || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Hora *</label>
              <input type="time" name="hora" value={form.hora || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input type="text" name="cliente" value={form.cliente || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Local *</label>
              <input type="text" name="local" value={form.local || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status || ""} onChange={handleChange}>
                <option value="Confirmado">✅ Confirmado</option>
                <option value="Pendente">⏳ Pendente</option>
                <option value="Concluído">✔️ Concluído</option>
                <option value="Cancelado">❌ Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select name="prioridade" value={form.prioridade || ""} onChange={handleChange}>
                <option value="Urgente">🔴 Urgente</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Média">🟡 Média</option>
                <option value="Baixa">🟢 Baixa</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea name="descricao" value={form.descricao || ""} onChange={handleChange} rows="3" />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea name="observacoes" value={form.observacoes || ""} onChange={handleChange} rows="2" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to={`/agenda/${id}`} className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarAgenda;