import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Agenda.module.css";

function NovaAgenda() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    titulo: "",
    data: hoje,
    hora: "09:00",
    tipo: "",
    cliente: "",
    local: "",
    status: "Confirmado",
    prioridade: "Média",
    descricao: "",
    observacoes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);

    setTimeout(() => {
      const agendaSalva = JSON.parse(localStorage.getItem("agenda")) || [];

      const novoCompromisso = {
        id: Date.now(),
        ...form,
      };

      const novaLista = [...agendaSalva, novoCompromisso];
      localStorage.setItem("agenda", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/agenda");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/agenda" className={styles.backButton}>← Agenda</Link>
          <h1>➕ Novo compromisso</h1>
          <p>Cadastre um novo compromisso na agenda</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Título *</label>
              <input type="text" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Digite o título" required />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select name="tipo" value={form.tipo} onChange={handleChange} required>
                <option value="">Selecione o tipo</option>
                <option value="Reunião">🤝 Reunião</option>
                <option value="Visita">🏭 Visita</option>
                <option value="Entrega">📦 Entrega</option>
                <option value="Vistoria">🔍 Vistoria</option>
                <option value="Apresentação">📊 Apresentação</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data *</label>
              <input type="date" name="data" value={form.data} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Hora *</label>
              <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input type="text" name="cliente" value={form.cliente} onChange={handleChange} placeholder="Nome do cliente" required />
            </div>

            <div className={styles.formGroup}>
              <label>Local *</label>
              <input type="text" name="local" value={form.local} onChange={handleChange} placeholder="Local do compromisso" required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Confirmado">✅ Confirmado</option>
                <option value="Pendente">⏳ Pendente</option>
                <option value="Concluído">✔️ Concluído</option>
                <option value="Cancelado">❌ Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select name="prioridade" value={form.prioridade} onChange={handleChange}>
                <option value="Urgente">🔴 Urgente</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Média">🟡 Média</option>
                <option value="Baixa">🟢 Baixa</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descreva o compromisso..." rows="3" />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações adicionais..." rows="2" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to="/agenda" className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar compromisso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaAgenda;