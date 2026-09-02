import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Especies.module.css";

function Especies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todas");
  const [filterFamilia, setFilterFamilia] = useState("Todas");

  const especies = [
    {
      id: 1,
      nomeCientifico: "Ma langsdorffii",
      familia: "Myrtaceae",
      nomePopular: "Brinco-de-macaco",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-01-15",
    },
    {
      id: 2,
      nomeCientifico: "On pauciflorum",
      familia: "Malvaceae",
      nomePopular: "—",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-01-20",
    },
    {
      id: 3,
      nomeCientifico: "A longifolia",
      familia: "Fabaceae",
      nomePopular: "Acácia",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-02-01",
    },
    {
      id: 4,
      nomeCientifico: "A mearnsii",
      familia: "Fabaceae",
      nomePopular: "Acácia negra",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-02-10",
    },
    {
      id: 5,
      nomeCientifico: "A podalyrifolia",
      familia: "Fabaceae",
      nomePopular: "acácia-mimosa",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-02-15",
    },
    {
      id: 6,
      nomeCientifico: "Oha communis",
      familia: "Euphorbiaceae",
      nomePopular: "espinheira-vermelha",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-03-01",
    },
    {
      id: 7,
      nomeCientifico: "Oha sp",
      familia: "Euphorbiaceae",
      nomePopular: "Acalifa",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-03-10",
    },
    {
      id: 8,
      nomeCientifico: "Hospemum australe",
      familia: "Asteraceae",
      nomePopular: "carrapicho-da-praia",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-03-15",
    },
    {
      id: 9,
      nomeCientifico: "Hosyris spinescens",
      familia: "Cervantesiaeae",
      nomePopular: "Sombra-de-touro",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-03-20",
    },
    {
      id: 10,
      nomeCientifico: "Sellowiana",
      familia: "Myrtaceae",
      nomePopular: "goiaba-da-serra",
      versao: "v1",
      status: "Aprovada",
      dataCadastro: "2024-04-01",
    },
  ];

  // Lista única de famílias para o filtro
  const familias = ["Todas", ...new Set(especies.map(e => e.familia))];

  // Filtros
  const especiesFiltradas = especies.filter((especie) => {
    const matchSearch = 
      especie.nomeCientifico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      especie.nomePopular.toLowerCase().includes(searchTerm.toLowerCase()) ||
      especie.familia.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === "Todas" || especie.status === filterStatus;
    const matchFamilia = filterFamilia === "Todas" || especie.familia === filterFamilia;
    
    return matchSearch && matchStatus && matchFamilia;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Aprovada": return "approved";
      case "Pendente": return "pending";
      case "Rejeitada": return "rejected";
      case "Em análise": return "analyzing";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Aprovada": return "✅";
      case "Pendente": return "⏳";
      case "Rejeitada": return "❌";
      case "Em análise": return "🔍";
      default: return "";
    }
  };

  const handleExport = () => {
    alert("Exportando lista de espécies...");
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>🌿 Espécies</h1>
          <p>Cadastro, versionamento e aprovação de espécies</p>
        </div>
        <div className={styles.headerRight}>
          <button onClick={handleExport} className={styles.exportButton}>
            📤 Exportar
          </button>
          <Link to="/nova-especie" className={styles.newButton}>
            + Nova espécie
          </Link>
        </div>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar espécie por nome científico, popular ou família..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.toolbarRight}>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todas">Todos os status</option>
            <option value="Aprovada">✅ Aprovada</option>
            <option value="Pendente">⏳ Pendente</option>
            <option value="Rejeitada">❌ Rejeitada</option>
            <option value="Em análise">🔍 Em análise</option>
          </select>
          <select 
            value={filterFamilia} 
            onChange={(e) => setFilterFamilia(e.target.value)}
          >
            {familias.map((familia) => (
              <option key={familia} value={familia}>
                {familia === "Todas" ? "📂 Todas as famílias" : familia}
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
                <th>Nome Científico</th>
                <th>Família</th>
                <th>Nome Popular</th>
                <th>Versão</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {especiesFiltradas.map((especie) => (
                <tr key={especie.id}>
                  <td>
                    <div className={styles.especieNome}>
                      <span className={styles.especieIcon}>🌱</span>
                      <strong>{especie.nomeCientifico}</strong>
                    </div>
                  </td>
                  <td>
                    <span className={styles.familiaBadge}>
                      {especie.familia}
                    </span>
                  </td>
                  <td>{especie.nomePopular}</td>
                  <td>
                    <span className={styles.versaoBadge}>
                      {especie.versao}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[getStatusClass(especie.status)]}`}>
                      <span className={styles.dot}></span>
                      {getStatusIcon(especie.status)} {especie.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/especies/${especie.id}`}
                        className={`${styles.actionBtn} ${styles.view}`}
                        title="Visualizar espécie"
                      >
                        👁
                      </Link>
                      <Link
                        to={`/especies/${especie.id}/editar`}
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Editar espécie"
                      >
                        ✎
                      </Link>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Remover espécie"
                        onClick={() => {
                          if (window.confirm(`Deseja realmente remover a espécie "${especie.nomeCientifico}"?`)) {
                            alert("Espécie removida com sucesso!");
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

        {/* RESUMO */}
        <div className={styles.tableFooter}>
          <div className={styles.tableInfo}>
            <span>Mostrando {especiesFiltradas.length} de {especies.length} espécies</span>
            <span className={styles.statusResumo}>
              <span className={styles.statusDotGreen}></span>
              {especies.filter(e => e.status === "Aprovada").length} Aprovadas
              <span className={styles.statusDotYellow}></span>
              {especies.filter(e => e.status === "Pendente").length} Pendentes
              <span className={styles.statusDotRed}></span>
              {especies.filter(e => e.status === "Rejeitada").length} Rejeitadas
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

export default Especies;
