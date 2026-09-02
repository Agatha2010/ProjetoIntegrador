import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Oficios.module.css";

function Oficios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const oficios = [
    {
      id: 1,
      numero: "21967/2024/SEFIS-RS/ANM",
      dataEmissao: "2024-06-18",
      dataVencimento: "2024-07-18",
      status: "Concluído",
      links: "Sem links",
      projeto: "Carolina Borba da Silva - ME",
      cliente: "Pedreira Borbinha",
    },
    {
      id: 2,
      numero: "00994 / 2024",
      dataEmissao: "2024-03-04",
      dataVencimento: "2024-07-04",
      status: "Concluído",
      links: "Sem links",
      projeto: "Parmíssimo",
      cliente: "Parmíssimo Alimentos LTDA",
    },
    {
      id: 3,
      numero: "0000000",
      dataEmissao: "2024-05-02",
      dataVencimento: "2024-06-21",
      status: "Em andamento",
      links: "Sem links",
      projeto: "Marmoraria RB Junior",
      cliente: "Marmoraria RB Junior",
    },
    {
      id: 4,
      numero: "Informação",
      dataEmissao: "2024-04-11",
      dataVencimento: "2024-05-26",
      status: "Concluído",
      links: "Sem links",
      projeto: "W.S Industria de Calcados",
      cliente: "W.S INDUSTRIA DE CALCADOS LTDA",
    },
    {
      id: 5,
      numero: "159/2024",
      dataEmissao: "2024-04-08",
      dataVencimento: "2024-05-23",
      status: "Concluído",
      links: "Sem links",
      projeto: "C.B CAR ACESSORIOS PARA VEICULOS LTDA",
      cliente: "C.B Auto Center",
    },
    {
      id: 6,
      numero: "PRO-2024-001",
      dataEmissao: "2024-07-01",
      dataVencimento: "2024-08-01",
      status: "Em andamento",
      links: "Sem links",
      projeto: "EcoTech Soluções",
      cliente: "EcoTech Soluções Ambientais",
    },
    {
      id: 7,
      numero: "OF-2024-002",
      dataEmissao: "2024-06-15",
      dataVencimento: "2024-07-15",
      status: "Pendente",
      links: "Sem links",
      projeto: "BioEnergia do Brasil",
      cliente: "BioEnergia Ltda.",
    },
  ];

  const statusOptions = ["Todos", "Concluído", "Em andamento", "Pendente", "Cancelado"];

  // Filtros
  const oficiosFiltrados = oficios.filter((oficio) => {
    const matchSearch =
      oficio.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oficio.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oficio.cliente.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "Todos" || oficio.status === filterStatus;

    return matchSearch && matchStatus;
  });

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
      case "Concluído": return "completed";
      case "Em andamento": return "inProgress";
      case "Pendente": return "pending";
      case "Cancelado": return "canceled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Concluído": return "✅";
      case "Em andamento": return "⏳";
      case "Pendente": return "⏸️";
      case "Cancelado": return "❌";
      default: return "";
    }
  };

  // Paginação
  const totalPaginas = Math.ceil(oficiosFiltrados.length / itemsPerPage);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const inicio = (paginaAtual - 1) * itemsPerPage;
  const fim = inicio + itemsPerPage;
  const oficiosPaginados = oficiosFiltrados.slice(inicio, fim);

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>📄 Ofícios</h1>
          <p>Aqui você encontra tudo sobre seus ofícios.</p>
        </div>
        <Link to="/novo-oficio" className={styles.newButton}>
          + Novo ofício
        </Link>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="O que deseja procurar?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.toolbarRight}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "Todos" ? "📂 Todos os status" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABELA */}
      <div className={styles.tablePanel}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Número do ofício</th>
                <th>Data de emissão</th>
                <th>Data de vencimento</th>
                <th>Status</th>
                <th>Links de documentos</th>
                <th>Projeto</th>
                <th>Cliente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {oficiosPaginados.map((oficio) => (
                <tr key={oficio.id}>
                  <td>
                    <div className={styles.oficioNumero}>
                      <span className={styles.oficioIcon}>📄</span>
                      <strong>{oficio.numero}</strong>
                    </div>
                  </td>
                  <td>{formatDate(oficio.dataEmissao)}</td>
                  <td>{formatDate(oficio.dataVencimento)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[getStatusClass(oficio.status)]}`}>
                      <span className={styles.dot}></span>
                      {getStatusIcon(oficio.status)} {oficio.status}
                    </span>
                  </td>
                  <td>
                    <span className={styles.linksBadge}>
                      {oficio.links}
                    </span>
                  </td>
                  <td>
                    <span className={styles.projetoBadge}>
                      {oficio.projeto}
                    </span>
                  </td>
                  <td>{oficio.cliente}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/oficios/${oficio.id}`}
                        className={`${styles.actionBtn} ${styles.view}`}
                        title="Visualizar ofício"
                      >
                        👁
                      </Link>
                      <Link
                        to={`/oficios/${oficio.id}/editar`}
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Editar ofício"
                      >
                        ✎
                      </Link>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Remover ofício"
                        onClick={() => {
                          if (window.confirm(`Deseja realmente remover o ofício "${oficio.numero}"?`)) {
                            alert("Ofício removido com sucesso!");
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

        {/* RODAPÉ DA TABELA */}
        <div className={styles.tableFooter}>
          <div className={styles.tableInfo}>
            <div className={styles.itemsPerPage}>
              <span>Linhas por página:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPaginaAtual(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <span className={styles.pageInfo}>
              {inicio + 1}-{Math.min(fim, oficiosFiltrados.length)} de {oficiosFiltrados.length}
            </span>
          </div>
          <div className={styles.paginationButtons}>
            <button
              onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPaginaAtual(num)}
                className={num === paginaAtual ? styles.currentPage : ""}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oficios;