import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AnalisesFitossociologicas.module.css";

function NovaAnalise() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    titulo: "",
    projeto: "",
    inicioColeta: hoje,
    status: "Pendente",
    responsavel: "",
    coordenadas: "",
    parcelas: "",
    areaParcela: "",
    areaTotal: "",
    areaAmostrada: "",
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
      const analisesSalvas = JSON.parse(localStorage.getItem("analises")) || [];

      const novaAnalise = {
        id: Date.now(),
        ...form,
        parcelas: parseInt(form.parcelas) || 0,
        historico: [
          {
            data: new Date().toISOString().split("T")[0],
            evento: "Análise criada",
          },
        ],
      };

      const novaLista = [...analisesSalvas, novaAnalise];
      localStorage.setItem("analises", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/analises");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/analises" className={styles.backButton}>← Análises</Link>
          <h1>➕ Nova análise</h1>
          <p>Cadastre uma nova análise fitossociológica</p>
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
                value={form.titulo}
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
                value={form.projeto}
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
                value={form.inicioColeta}
                onChange={handleChange}
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
                value={form.responsavel}
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
                value={form.coordenadas}
                onChange={handleChange}
                placeholder="Ex: -23.5505, -46.6333"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Parcelas *</label>
              <input
                type="number"
                name="parcelas"
                value={form.parcelas}
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
                value={form.areaParcela}
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
                value={form.areaTotal}
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
                value={form.areaAmostrada}
                onChange={handleChange}
                placeholder="Ex: 0.08 m²"
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição da análise..."
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
            <Link to="/analises" className={styles.cancelButton}>
              ❌ Cancelar
            </Link>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={salvando}
            >
              {salvando ? "💾 Salvando..." : "💾 Salvar análise"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaAnalise;