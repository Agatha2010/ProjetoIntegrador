import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Clientes.module.css";

function NovoCliente() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    responsavel: "",
    segmento: "",
    telefone: "",
    email: "",
    endereco: "",
    descricao: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);

    setTimeout(() => {
      const clientesSalvos = JSON.parse(localStorage.getItem("clientes")) || [];

      const novoCliente = {
        id: Date.now(),
        ...form,
        status: "Ativo",
        desde: new Date().toISOString().split("T")[0],
      };

      const novaLista = [...clientesSalvos, novoCliente];
      localStorage.setItem("clientes", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/clientes");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/clientes" className={styles.backButton}>← Clientes</Link>
          <h1>➕ Novo cliente</h1>
          <p>Cadastre um novo cliente no sistema</p>
        </div>
        <div className={styles.infoBadge}>
          <span className={styles.badge}>Novo cadastro</span>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nome da empresa *</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Digite o nome da empresa" required />
            </div>

            <div className={styles.formGroup}>
              <label>CNPJ *</label>
              <input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" required />
            </div>

            <div className={styles.formGroup}>
              <label>Responsável *</label>
              <input type="text" name="responsavel" value={form.responsavel} onChange={handleChange} placeholder="Nome do responsável" required />
            </div>

            <div className={styles.formGroup}>
              <label>Segmento</label>
              <input type="text" name="segmento" value={form.segmento} onChange={handleChange} placeholder="Ex: Consultoria, Energia" />
            </div>

            <div className={styles.formGroup}>
              <label>Telefone</label>
              <input type="text" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />
            </div>

            <div className={styles.formGroup}>
              <label>E-mail</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="empresa@email.com" />
            </div>

            <div className={styles.formGroup}>
              <label>Endereço</label>
              <input type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço completo" />
            </div>

            <div className={styles.formGroup}>
              <label>Descrição</label>
              <input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Breve descrição" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to="/clientes" className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? " Salvando..." : "Salvar cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoCliente;
