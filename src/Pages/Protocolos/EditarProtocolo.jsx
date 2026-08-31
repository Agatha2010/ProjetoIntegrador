import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Protocolos.module.css";

function EditarProtocolo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const protocolos = [
      {
        id: 1,
        numero: "PRO-2023-001",
        cliente: "Empresa Verde Ltda.",
        tipo: "Licenciamento Ambiental",
        dataAbertura: "2023-01-20",
        dataPrevista: "2024-01-20",
        status: "Em andamento",
        responsavel: "Mariana Silva",
        prioridade: "Alta",
        descricao: "Protocolo para licenciamento ambiental da nova unidade.",
        observacoes: "Documentação em análise pelo órgão ambiental.",
      },
      {
        id: 2,
        numero: "PRO-2023-002",
        cliente: "AgroSul Ltda.",
        tipo: "Renovação de Licença",
        dataAbertura: "2023-03-25",
        dataPrevista: "2023-09-25",
        status: "Concluído",
        responsavel: "Carlos Oliveira",
        prioridade: "Média",
        descricao: "Renovação da licença de operação.",
        observacoes: "Licença renovada com sucesso.",
      },
    ];

    const encontrado = protocolos.find((p) => p.id === Number(id));

    if (encontrado) {
      setForm(encontrado);
    }
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
      navigate(`/protocolos/${id}`);
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
            <Link to="/protocolos" className={styles.backButton}>← Protocolos</Link>
            <h1>Protocolo não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/protocolos/${id}`} className={styles.backButton}>← Protocolo</Link>
          <h1>✎ Editar protocolo</h1>
          <p>Atualize os dados do protocolo</p>
        </div>
        <div className={styles.infoBadge}>
          <span className={styles.badge}>ID: #{form.id}</span>
          <span className={`${styles.statusBadge} ${styles[form.status === "Em andamento" ? "inProgress" : form.status === "Concluído" ? "completed" : form.status === "Pendente" ? "pending" : "delayed"]}`}>
            <span className={styles.dot}></span>
            {form.status}
          </span>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Número do protocolo *</label>
              <input
                type="text"
                name="numero"
                value={form.numero || ""}
                onChange={handleChange}
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
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select
                name="tipo"
                value={form.tipo || ""}
                onChange={handleChange}
                required
              >
                <option value="Licenciamento Ambiental">Licenciamento Ambiental</option>
                <option value="Renovação de Licença">Renovação de Licença</option>
                <option value="Novo Cadastro">Novo Cadastro</option>
                <option value="Regularização">Regularização</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
              >
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select
                name="prioridade"
                value={form.prioridade || ""}
                onChange={handleChange}
              >
                <option value="Urgente">Urgente</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Responsável *</label>
              <input
                type="text"
                name="responsavel"
                value={form.responsavel || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data de abertura *</label>
              <input
                type="date"
                name="dataAbertura"
                value={form.dataAbertura || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data prevista *</label>
              <input
                type="date"
                name="dataPrevista"
                value={form.dataPrevista || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={form.descricao || ""}
                onChange={handleChange}
                placeholder="Descrição do protocolo"
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Observações</label>
              <input
                type="text"
                name="observacoes"
                value={form.observacoes || ""}
                onChange={handleChange}
                placeholder="Observações adicionais"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to={`/protocolos/${id}`} className={styles.cancelButton}>
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

export default EditarProtocolo;