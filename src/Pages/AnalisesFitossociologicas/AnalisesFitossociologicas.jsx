import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AnalisesFitossociologicas.module.css";

function AnalisesFitossociologicas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProjeto, setFilterProjeto] = useState("Todos");

  const analises = [
    {
      id: 1,
      titulo: "Em frente ao Alpen",
      inicioColeta: "2026-03-30",
      parcelas: 8,
      areaParcela: "100 m²",
      areaTotal: "2.4 m²",
      areaAmostrada: "0.08 m²",
      projeto: "Em frente ao Alpen",
      status: "Concluída",
      responsavel: "Dr. Carlos Silva",
    },
    {
      id: 2,
      titulo: "Teste2",
      inicioColeta: "2026-03-10",
      parcelas: 17,
      areaParcela: "100 m²",
      areaTotal: "16.54 m²",
      areaAmostrada: "0.17 m²",
      projeto: "Fitossociologia testes",
      status: "Em andamento",
      responsavel: "Dra. Ana Oliveira",
    },
    {
      id: 3,
      titulo: "Teste",
      inicioColeta: "2026-03-10",
      parcelas: 17,
      areaParcela: "100 m²",
      areaTotal: "16.54 m²",
      areaAmostrada: "0.17 m²",
      projeto: "Fitossociologia testes",
      status: "Pendente",
      responsavel: "Dr. Pedro Santos",
    },
  ];

  // Lista única de projetos para o filtro
  const projetos = ["Todos", ...new Set(analises.map(a => a.projeto))];

  // Filtros
  const analisesFiltradas = analises.filter((analise) => {
    const matchSearch =
      analise.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analise.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analise.responsavel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchProjeto = filterProjeto === "Todos" || analise.projeto === filterProjeto;

    return matchSearch && matchProjeto;
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
      case "Concluída": return "completed";
      case "Em andamento": return "inProgress";
      case "Pendente": return "pending";
      case "Cancelada": return "canceled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Concluída": return "✅";
      case "Em andamento": return "⏳";
      case "Pendente": return "⏸️";
      case "Cancelada": return "❌";
      default: return "";
    }
  };

  const handleExport = () => {
    alert("Exportando análises fitossociológicas...");
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>🌿 Análises Fitossociológicas</h1>
          <p>Aquí você encontra todas as análises fitossociológicas da empresa.</p>
        </div>
        <div className={styles.headerRight}>
          <button onClick={handleExport} className={styles.exportButton}>
            📤 Exportar
          </button>
          <Link to="/nova-analise" className={styles.newButton}>
            + Nova análise
          </Link>
        </div>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar análise por título, projeto ou responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.toolbarRight}>
          <select
            value={filterProjeto}
            onChange={(e) => setFilterProjeto(e.target.value)}
          >
            {projetos.map((projeto) => (
              <option key={projeto} value={projeto}>
                {projeto === "Todos" ? "📂 Todos os projetos" : projeto}
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
                <th>Título</th>
                <th>Início da Coleta</th>
                <th>Parcelas</th>
                <th>Área Parcela</th>
                <th>Área Total</th>
                <th>Área Amostrada</th>
                <th>Projeto</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {analisesFiltradas.map((analise) => (
                <tr key={analise.id}>
                  <td>
                    <div className={styles.analiseTitulo}>
                      <span className={styles.analiseIcon}>🌳</span>
                      <strong>{analise.titulo}</strong>
                    </div>
                  </td>
                  <td>{formatDate(analise.inicioColeta)}</td>
                  <td>
                    <span className={styles.parcelasBadge}>
                      {analise.parcelas}
                    </span>
                  </td>
                  <td>{analise.areaParcela}</td>
                  <td>{analise.areaTotal}</td>
                  <td>{analise.areaAmostrada}</td>
                  <td>
                    <span className={styles.projetoBadge}>
                      {analise.projeto}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[getStatusClass(analise.status)]}`}>
                      <span className={styles.dot}></span>
                      {getStatusIcon(analise.status)} {analise.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/analises/${analise.id}`}
                        className={`${styles.actionBtn} ${styles.view}`}
                        title="Visualizar análise"
                      >
                        👁
                      </Link>
                      <Link
                        to={`/analises/${analise.id}/editar`}
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Editar análise"
                      >
                        ✎
                      </Link>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Remover análise"
                        onClick={() => {
                          if (window.confirm(`Deseja realmente remover a análise "${analise.titulo}"?`)) {
                            alert("Análise removida com sucesso!");
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
            <span>
              Mostrando {analisesFiltradas.length} de {analises.length} análises
            </span>
            <span className={styles.statusResumo}>
              <span className={styles.statusDotGreen}></span>
              {analises.filter(a => a.status === "Concluída").length} Concluídas
              <span className={styles.statusDotYellow}></span>
              {analises.filter(a => a.status === "Em andamento").length} Em andamento
              <span className={styles.statusDotOrange}></span>
              {analises.filter(a => a.status === "Pendente").length} Pendentes
            </span>
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>‹</button>
            <button className={styles.currentPage}>1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalisesFitossociologicas;