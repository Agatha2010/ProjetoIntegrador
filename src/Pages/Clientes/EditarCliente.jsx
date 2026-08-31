import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Clientes.module.css";

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const clientes = [
      {
        id: 1,
        nome: "Empresa Verde Ltda.",
        cnpj: "12.345.678/0001-90",
        responsavel: "Mariana Silva",
        telefone: "(51) 99999-1234",
        email: "contato@empresaverde.com.br",
        endereco: "Av. dos Estados, 1500 - Porto Alegre/RS",
        status: "Ativo",
        desde: "2023-01-15",
        segmento: "Consultoria Ambiental",
        descricao: "Empresa especializada em consultoria ambiental.",
      },
      {
        id: 2,
        nome: "AgroSul Ltda.",
        cnpj: "23.456.789/0001-81",
        responsavel: "Carlos Oliveira",
        telefone: "(51) 98888-4321",
        email: "carlos@agrosul.com.br",
        endereco: "Rua das Árvores, 234 - Novo Hamburgo/RS",
        status: "Ativo",
        desde: "2023-03-22",
        segmento: "Agronegócio",
        descricao: "Produtora de alimentos orgânicos.",
      },
    ];

    const encontrado = clientes.find((c) => String(c.id) === String(id));

    if (encontrado) {
      setForm(encontrado);
      setErro(false);
    } else {
      setErro(true);
    }
    setCarregando(false);
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);

    setTimeout(() => {
      setSalvando(false);
      navigate(`/clientes/${id}`);
    }, 1000);
  }

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando cliente...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (erro || !form) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/clientes" className={styles.backButton}>← Clientes</Link>
            <h1>Cliente não encontrado</h1>
            <p>Não foi possível encontrar os dados desse cliente.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/clientes/${id}`} className={styles.backButton}>← Cliente</Link>
          <h1>✎ Editar cliente</h1>
          <p>Atualize os dados do cliente</p>
        </div>
        <div className={styles.infoBadge}>
          <span className={styles.badge}>ID: #{form.id}</span>
          <span className={`${styles.statusBadge} ${styles[form.status === "Ativo" ? "active" : form.status === "Pendente" ? "pending" : "inactive"]}`}>
            <span className={styles.dot}></span>
            {form.status}
          </span>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nome da empresa *</label>
              <input type="text" name="nome" value={form.nome || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>CNPJ *</label>
              <input type="text" name="cnpj" value={form.cnpj || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Responsável *</label>
              <input type="text" name="responsavel" value={form.responsavel || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Segmento</label>
              <input type="text" name="segmento" value={form.segmento || ""} onChange={handleChange} placeholder="Ex: Consultoria, Energia" />
            </div>

            <div className={styles.formGroup}>
              <label>Telefone</label>
              <input type="text" name="telefone" value={form.telefone || ""} onChange={handleChange} placeholder="(00) 00000-0000" />
            </div>

            <div className={styles.formGroup}>
              <label>E-mail</label>
              <input type="email" name="email" value={form.email || ""} onChange={handleChange} placeholder="empresa@email.com" />
            </div>

            <div className={styles.formGroup}>
              <label>Endereço</label>
              <input type="text" name="endereco" value={form.endereco || ""} onChange={handleChange} placeholder="Endereço completo" />
            </div>

            <div className={styles.formGroup}>
              <label>Descrição</label>
              <input type="text" name="descricao" value={form.descricao || ""} onChange={handleChange} placeholder="Breve descrição" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to={`/clientes/${id}`} className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarCliente;
