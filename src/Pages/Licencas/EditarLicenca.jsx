import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Licencas.module.css";

function EditarLicenca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const licencas = [
      { id: 1, tipo: "Licença Ambiental", cliente: "Empresa Verde Ltda.", numero: "LA-2023-001", emissao: "2023-01-15", vencimento: "2024-01-15", status: "Ativo", descricao: "Licença para consultoria ambiental", orgao: "IBAMA", processo: "12345/2023" },
      { id: 2, tipo: "Licença de Operação", cliente: "AgroSul Ltda.", numero: "LO-2023-002", emissao: "2023-03-22", vencimento: "2024-03-22", status: "Ativo", descricao: "Licença para operação", orgao: "FEPAM", processo: "23456/2023" },
    ];

    const encontrado = licencas.find((l) => l.id === Number(id));
    setForm(encontrado);
    setCarregando(false);
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      navigate(`/licencas/${id}`);
    }, 1000);
  }

  if (carregando) return <div className={styles.page}><h1>Carregando...</h1></div>;
  if (!form) return <div className={styles.page}><h1>Licença não encontrada</h1></div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/licencas/${id}`} className={styles.backButton}>← Licença</Link>
          <h1>✎ Editar licença</h1>
          <p>Atualize os dados da licença</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <input type="text" name="tipo" value={form.tipo || ""} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input type="text" name="cliente" value={form.cliente || ""} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Número *</label>
              <input type="text" name="numero" value={form.numero || ""} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status || ""} onChange={handleChange}>
                <option value="Ativo">Ativo</option>
                <option value="Vencendo">Vencendo</option>
                <option value="Vencida">Vencida</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Data de emissão *</label>
              <input type="date" name="emissao" value={form.emissao || ""} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Data de vencimento *</label>
              <input type="date" name="vencimento" value={form.vencimento || ""} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Órgão</label>
              <input type="text" name="orgao" value={form.orgao || ""} onChange={handleChange} placeholder="Ex: IBAMA, FEPAM" />
            </div>
            <div className={styles.formGroup}>
              <label>Processo</label>
              <input type="text" name="processo" value={form.processo || ""} onChange={handleChange} placeholder="Número do processo" />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Descrição</label>
              <input type="text" name="descricao" value={form.descricao || ""} onChange={handleChange} placeholder="Descrição da licença" />
            </div>
          </div>
          <div className={styles.formActions}>
            <Link to={`/licencas/${id}`} className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarLicenca;
