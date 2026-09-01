import { Link } from "react-router-dom";
import styles from "./Agenda.module.css";

function Agenda() {
  const hoje = new Date();
  const hojeStr = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
    },
    {
      id: 3,
      titulo: "Reunião interna - Planejamento",
      data: "2024-08-28",
      hora: "15:30",
      tipo: "Reunião",
      cliente: "Interno",
      local: "Sala de Reuniões 2",
      status: "Pendente",
      prioridade: "Média",
      descricao: "Planejamento mensal da equipe.",
    },
    {
      id: 4,
      titulo: "Entrega de relatório - EcoTech",
      data: "2024-08-30",
      hora: "10:00",
      tipo: "Entrega",
      cliente: "EcoTech Soluções",
      local: "Escritório EcoTech",
      status: "Confirmado",
      prioridade: "Alta",
      descricao: "Entrega do relatório de conformidade ambiental.",
    },
    {
      id: 5,
      titulo: "Reunião com IBAMA",
      data: "2024-09-02",
      hora: "11:00",
      tipo: "Reunião",
      cliente: "IBAMA",
      local: "Sede IBAMA - Porto Alegre",
      status: "Confirmado",
      prioridade: "Urgente",
      descricao: "Acompanhamento do processo de licenciamento.",
    },
    {
      id: 6,
      titulo: "Vistoria - ReciclaMais",
      data: "2024-09-05",
      hora: "08:30",
      tipo: "Visita",
      cliente: "ReciclaMais Indústrias",
      local: "Unidade ReciclaMais - Gravataí",
      status: "Pendente",
      prioridade: "Média",
      descricao: "Vistoria para verificação de conformidade.",
    },
  ];

  const total = compromissos.length;
  const confirmados = compromissos.filter(c => c.status === "Confirmado").length;
  const pendentes = compromissos.filter(c => c.status === "Pendente").length;
  const concluidos = compromissos.filter(c => c.status === "Concluído").length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmado": return "confirmed";
      case "Pendente": return "pending";
      case "Concluído": return "completed";
      case "Cancelado": return "canceled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmado": return "✅";
      case "Pendente": return "⏳";
      case "Concluído": return "✔️";
      case "Cancelado": return "❌";
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

  const getPrioridadeIcon = (prioridade) => {
    switch (prioridade) {
      case "Urgente": return "🔴";
      case "Alta": return "🟠";
      case "Média": return "🟡";
      case "Baixa": return "🟢";
      default: return "";
    }
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      "Reunião": "🤝",
      "Visita": "🏭",
      "Entrega": "📦",
      "Vistoria": "🔍",
      "Apresentação": "📊",
    };
    return icons[tipo] || "📅";
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>📅 Agenda</h1>
          <p>Gerencie seus compromissos e atividades</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.dataAtual}>
            <span className={styles.dataIcon}>📆</span>
            <span>{hojeStr}</span>
          </div>
          <Link to="/nova-agenda" className={styles.newButton}>
            + Novo compromisso
          </Link>
        </div>
      </div>

      {/* CARDS DE RESUMO */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>📅</span>
            <span className={styles.cardLabel}>Total de compromissos</span>
          </div>
          <strong>{total}</strong>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>✅</span>
            <span className={styles.cardLabel}>Confirmados</span>
          </div>
          <strong>
            {confirmados}
            <span className={`${styles.trend} ${styles.up}`}>↑ 8%</span>
          </strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.warning}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>⏳</span>
            <span className={styles.cardLabel}>Pendentes</span>
          </div>
          <strong>{pendentes}</strong>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>✔️</span>
            <span className={styles.cardLabel}>Concluídos</span>
          </div>
          <strong>{concluidos}</strong>
        </div>
      </div>

      {/* VISUALIZAÇÃO */}
      <div className={styles.agendaPanel}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input type="text" placeholder="Buscar compromisso..." />
          </div>
          <div className={styles.toolbarRight}>
            <select>
              <option>Todos os status</option>
              <option>Confirmado</option>
              <option>Pendente</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
            <select>
              <option>Esta semana</option>
              <option>Próximos 7 dias</option>
              <option>Este mês</option>
              <option>Próximos 30 dias</option>
            </select>
          </div>
        </div>

        <div className={styles.agendaList}>
          {compromissos.map((compromisso) => (
            <div className={styles.agendaCard} key={compromisso.id}>
              <div className={styles.agendaCardLeft}>
                <div className={styles.agendaData}>
                  <strong>{new Date(compromisso.data).getDate()}</strong>
                  <span>
                    {new Date(compromisso.data).toLocaleDateString("pt-BR", {
                      month: "short",
                    }).toUpperCase()}
                  </span>
                </div>
                <div className={styles.agendaInfo}>
                  <div className={styles.agendaTitulo}>
                    <span className={styles.tipoIcon}>
                      {getTipoIcon(compromisso.tipo)}
                    </span>
                    <strong>{compromisso.titulo}</strong>
                  </div>
                  <div className={styles.agendaDetalhes}>
                    <span className={styles.horaIcon}>🕐</span>
                    <span>{compromisso.hora}</span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.clienteIcon}>🏢</span>
                    <span>{compromisso.cliente}</span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.localIcon}>📍</span>
                    <span>{compromisso.local}</span>
                  </div>
                </div>
              </div>
              <div className={styles.agendaCardRight}>
                <div className={styles.agendaStatus}>
                  <span className={`${styles.statusBadge} ${styles[getStatusClass(compromisso.status)]}`}>
                    <span className={styles.dot}></span>
                    {getStatusIcon(compromisso.status)} {compromisso.status}
                  </span>
                  <span className={`${styles.prioridadeBadge} ${styles[getPrioridadeClass(compromisso.prioridade)]}`}>
                    {getPrioridadeIcon(compromisso.prioridade)} {compromisso.prioridade}
                  </span>
                </div>
                <div className={styles.agendaActions}>
                  <Link
                    to={`/agenda/${compromisso.id}`}
                    className={`${styles.actionBtn} ${styles.view}`}
                    title="Visualizar"
                  >
                    👁
                  </Link>
                  <Link
                    to={`/agenda/${compromisso.id}/editar`}
                    className={`${styles.actionBtn} ${styles.edit}`}
                    title="Editar"
                  >
                    ✎
                  </Link>
                  <button
                    className={`${styles.actionBtn} ${styles.delete}`}
                    title="Remover"
                    onClick={() => {
                      if (window.confirm(`Deseja realmente remover o compromisso "${compromisso.titulo}"?`)) {
                        alert("Compromisso removido com sucesso!");
                      }
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINAÇÃO */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            <span>Mostrando 6 de 24 compromissos</span>
            <select>
              <option>10 por página</option>
              <option>25 por página</option>
              <option>50 por página</option>
            </select>
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>‹</button>
            <button className={styles.currentPage}>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agenda;