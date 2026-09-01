import { Link } from "react-router-dom";
import styles from "./Protocolos.module.css";

function Protocolos() {
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
    },
    {
      id: 3,
      numero: "PRO-2023-003",
      cliente: "Indústria Sustentável S.A.",
      tipo: "Novo Cadastro",
      dataAbertura: "2023-06-15",
      dataPrevista: "2023-12-15",
      status: "Em andamento",
      responsavel: "Fernanda Costa",
      prioridade: "Alta",
    },
    {
      id: 4,
      numero: "PRO-2023-004",
      cliente: "Eco Norte Comércio",
      tipo: "Regularização",
      dataAbertura: "2023-09-10",
      dataPrevista: "2023-11-10",
      status: "Pendente",
      responsavel: "Lucas Pereira",
      prioridade: "Urgente",
    },
    {
      id: 5,
      numero: "PRO-2023-005",
      cliente: "BioEnergia do Brasil",
      tipo: "Licenciamento Ambiental",
      dataAbertura: "2023-11-20",
      dataPrevista: "2024-05-20",
      status: "Em andamento",
      responsavel: "Ana Beatriz Souza",
      prioridade: "Média",
    },
    {
      id: 6,
      numero: "PRO-2023-006",
      cliente: "ReciclaMais Indústrias",
      tipo: "Renovação de Licença",
      dataAbertura: "2022-08-15",
      dataPrevista: "2023-02-15",
      status: "Atrasado",
      responsavel: "Roberto Mendes",
      prioridade: "Urgente",
    },
    {
      id: 7,
      numero: "PRO-2023-007",
      cliente: "Verde Campo Agropecuária",
      tipo: "Novo Cadastro",
      dataAbertura: "2023-05-01",
      dataPrevista: "2023-11-01",
      status: "Concluído",
      responsavel: "Patrícia Lima",
      prioridade: "Baixa",
    },
    {
      id: 8,
      numero: "PRO-2023-008",
      cliente: "EcoTech Soluções",
      tipo: "Regularização",
      dataAbertura: "2023-12-05",
      dataPrevista: "2024-03-05",
      status: "Pendente",
      responsavel: "Ricardo Nunes",
      prioridade: "Alta",
    },
  ];

  const total = protocolos.length;
  const emAndamento = protocolos.filter(p => p.status === "Em andamento").length;
  const concluidos = protocolos.filter(p => p.status === "Concluído").length;
  const pendentes = protocolos.filter(p => p.status === "Pendente").length;
  const atrasados = protocolos.filter(p => p.status === "Atrasado").length;

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
      case "Em andamento": return "inProgress";
      case "Concluído": return "completed";
      case "Pendente": return "pending";
      case "Atrasado": return "delayed";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Em andamento": return "...";
      case "Concluído": return "v";
      case "Pendente": return "?";
      case "Atrasado": return "!";
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
      "Licenciamento Ambiental": "🌿",
      "Renovação de Licença": "🔄",
      "Novo Cadastro": "📝",
      "Regularização": "📋",
    };
    return icons[tipo] || "📄";
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>📄 Protocolos</h1>
          <p>Gerencie todos os protocolos do sistema</p>
        </div>
        <Link to="/novo-protocolo" className={styles.newButton}>
          + Novo protocolo
        </Link>
      </div>

      {/* CARDS DE RESUMO */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>📄</span>
            <span className={styles.cardLabel}>Total de protocolos</span>
          </div>
          <strong>{total}</strong>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>⏳</span>
            <span className={styles.cardLabel}>Em andamento</span>
          </div>
          <strong>{emAndamento}</strong>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>✅</span>
            <span className={styles.cardLabel}>Concluídos</span>
          </div>
          <strong>
            {concluidos}
            <span className={`${styles.trend} ${styles.up}`}>↑ 12%</span>
          </strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.warning}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}></span>
            <span className={styles.cardLabel}>Pendentes</span>
          </div>
          <strong>{pendentes}</strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.danger}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Atrasados</span>
          </div>
          <strong>{atrasados}</strong>
        </div>
      </div>

      {/* TABELA */}
      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input type="text" placeholder="Buscar protocolo por número, cliente ou tipo..." />
          </div>
          <div className={styles.toolbarRight}>
            <select>
              <option>Todos os status</option>
              <option>Em andamento</option>
              <option>Concluído</option>
              <option>Pendente</option>
              <option>Atrasado</option>
            </select>
            <select>
              <option>Todas as prioridades</option>
              <option>Urgente</option>
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Protocolo</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Abertura</th>
                <th>Previsão</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {protocolos.map((protocolo) => (
                <tr key={protocolo.id}>
                  <td>
                    <div className={styles.protocoloName}>
                      <div className={styles.protocoloAvatar}>
                        {getTipoIcon(protocolo.tipo)}
                      </div>
                      <div>
                        <strong>{protocolo.numero}</strong>
                        <span className={styles.protocoloResponsavel}>
                          {protocolo.responsavel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{protocolo.cliente}</td>
                  <td>{protocolo.tipo}</td>
                  <td>{formatDate(protocolo.dataAbertura)}</td>
                  <td>
                    <span className={styles.dataPrevisao}>
                      {formatDate(protocolo.dataPrevista)}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.prioridadeBadge} ${styles[getPrioridadeClass(protocolo.prioridade)]}`}>
                      {getPrioridadeIcon(protocolo.prioridade)} {protocolo.prioridade}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[getStatusClass(protocolo.status)]}`}>
                      <span className={styles.dot}></span>
                      {getStatusIcon(protocolo.status)} {protocolo.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/protocolos/${protocolo.id}`}
                        className={`${styles.actionBtn} ${styles.view}`}
                        title="Visualizar protocolo"
                      >
                        👁
                      </Link>
                      <Link
                        to={`/protocolos/${protocolo.id}/editar`}
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Editar protocolo"
                      >
                        ✎
                      </Link>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Remover protocolo"
                        onClick={() => {
                          if (window.confirm(`Deseja realmente remover o protocolo "${protocolo.numero}"?`)) {
                            alert("Protocolo removido com sucesso!");
                          }
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            <span>Mostrando 8 de 32 protocolos</span>
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

export default Protocolos;