import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Protocolos.module.css";

function DetalhesProtocolo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protocolo, setProtocolo] = useState(null);
  const [carregando, setCarregando] = useState(true);

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
        descricao: "Protocolo para licenciamento ambiental da nova unidade da empresa. Inclui análise de impacto ambiental e adequação às normas vigentes.",
        observacoes: "Documentação em análise pelo órgão ambiental. Aguardando parecer técnico do IBAMA. Previsão de vistoria para o próximo mês.",
        historico: [
          { data: "2023-01-20", evento: "Protocolo aberto" },
          { data: "2023-02-15", evento: "Documentação enviada ao IBAMA" },
          { data: "2023-03-10", evento: "Análise em andamento" },
          { data: "2023-04-05", evento: "Solicitação de documentos complementares" },
        ],
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
        descricao: "Renovação da licença de operação da unidade agroindustrial.",
        observacoes: "Licença renovada com sucesso por mais 3 anos.",
        historico: [
          { data: "2023-03-25", evento: "Protocolo aberto" },
          { data: "2023-04-10", evento: "Documentação enviada" },
          { data: "2023-09-20", evento: "Licença renovada" },
        ],
      },
    ];

    const encontrado = protocolos.find((p) => p.id === Number(id));
    setProtocolo(encontrado);
    setCarregando(false);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Em andamento": return "inProgress";
      case "Concluído": return "completed";
      case "Pendente": return "pending";
      case "Atrasado": return "delayed";
      default: return "";
    }
  };

  const getPrioridadeClass = (prioridade) => {
    switch (prioridade) {
      case "Urgente": return "urgent";
      case "Alta": return "high";
      case "Média": return "medium";
      case "Baixa": return "low";
      default: return "";
    }
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      "Licenciamento Ambiental": "🌿",
      "Renovação de Licença": "🔄",
      "Novo Cadastro": "📝",
      "Regularização": "📋",
    };
    return icons[tipo] || "📄";
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando protocolo...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!protocolo) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/protocolos" className={styles.backButton}>
              ← Protocolos
            </Link>
            <h1>Protocolo não encontrado</h1>
            <p>O protocolo que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/protocolos" className={styles.backButton}>
            ← Protocolos
          </Link>
          <h1>{protocolo.numero}</h1>
          <p>Detalhes completos do protocolo</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/protocolos/${protocolo.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar protocolo
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover o protocolo "${protocolo.numero}"?`)) {
                navigate("/protocolos");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>
          {getTipoIcon(protocolo.tipo)}
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <span>NÚMERO</span>
            <strong>{protocolo.numero}</strong>
          </div>

          <div>
            <span>CLIENTE</span>
            <strong>{protocolo.cliente}</strong>
          </div>

          <div>
            <span>TIPO</span>
            <strong>{protocolo.tipo}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(protocolo.status)]}`}>
              <span className={styles.dot}></span>
              {protocolo.status}
            </span>
          </div>

          <div>
            <span>PRIORIDADE</span>
            <span className={`${styles.prioridadeBadge} ${styles[getPrioridadeClass(protocolo.prioridade)]}`}>
              {protocolo.prioridade}
            </span>
          </div>

          <div>
            <span>RESPONSÁVEL</span>
            <strong>{protocolo.responsavel}</strong>
          </div>

          <div>
            <span>ABERTURA</span>
            <strong>{formatDate(protocolo.dataAbertura)}</strong>
          </div>

          <div>
            <span>PREVISÃO</span>
            <strong>{formatDate(protocolo.dataPrevista)}</strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>DESCRIÇÃO</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {protocolo.descricao || "Sem descrição"}
            </strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {protocolo.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      {protocolo.historico && protocolo.historico.length > 0 && (
        <div className={styles.timeline}>
          <h3>📜 Histórico do protocolo</h3>
          {protocolo.historico.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.timelineIcon}>
                {index === 0 ? "🌟" : "📌"}
              </div>
              <div className={styles.timelineContent}>
                <strong>{item.evento}</strong>
                <span>{formatDate(item.data)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DetalhesProtocolo;