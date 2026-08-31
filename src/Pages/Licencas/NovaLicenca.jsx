import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Licencas.module.css";

function NovaLicenca() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState({ tipo: "", cliente: "", numero: "", emissao: "", vencimento: "", descricao: "", orgao: "", processo: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      const licencasSalvas = JSON.parse(localStorage.getItem("licencas")) || [];
      const novaLicenca = { id: Date.now(), ...form, status: "Ativo" };
      localStorage.setItem("licencas", JSON.stringify([...licencasSalvas, novaLicenca]));
      setSalvando(false);
      navigate("/licencas");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/licencas" className={styles.backButton}>← Licenças</Link>
          <h1>➕ Nova licença</h1>
          <p>Cadastre uma nova licença ambiental</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}><label>Tipo *</label><input type="text" name="tipo" value={form.tipo} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label>Cliente *</label><input type="text" name="cliente" value={form.cliente} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label>Número *</label><input type="text" name="numero" value={form.numero} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label>Data de emissão *</label><input type="date" name="emissao" value={form.emissao} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label>Data de vencimento *</label><input type="date" name="vencimento" value={form.vencimento} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label>Órgão</label><input type="text" name="orgao" value={form.orgao} onChange={handleChange} placeholder="Ex: IBAMA, FEPAM" /></div>
            <div className={styles.formGroup}><label>Processo</label><input type="text" name="processo" value={form.processo} onChange={handleChange} placeholder="Número do processo" /></div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}><label>Descrição</label><input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição da licença" /></div>
          </div>
          <div className={styles.formActions}>
            <Link to="/licencas" className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar licença"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaLicenca;
