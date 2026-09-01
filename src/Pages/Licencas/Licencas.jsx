import { Link } from "react-router-dom";
import styles from "./Licencas.module.css";

function Licencas() {
  const licencas = [
    { id: 1, tipo: "Licença Ambiental", cliente: "Empresa Verde Ltda.", numero: "LA-2023-001", emissao: "2023-01-15", vencimento: "2024-01-15", status: "Ativo", diasRestantes: 45 },
    { id: 2, tipo: "Licença de Operação", cliente: "AgroSul Ltda.", numero: "LO-2023-002", emissao: "2023-03-22", vencimento: "2024-03-22", status: "Ativo", diasRestantes: 78 },
    { id: 3, tipo: "Licença Prévia", cliente: "Indústria Sustentável S.A.", numero: "LP-2023-003", emissao: "2023-06-10", vencimento: "2024-06-10", status: "Ativo", diasRestantes: 158 },
    { id: 4, tipo: "Licença de Instalação", cliente: "Eco Norte Comércio", numero: "LI-2023-004", emissao: "2023-09-05", vencimento: "2024-09-05", status: "Pendente", diasRestantes: 245 },
    { id: 5, tipo: "Licença Ambiental", cliente: "BioEnergia do Brasil", numero: "LA-2023-005", emissao: "2023-11-18", vencimento: "2024-05-18", status: "Vencendo", diasRestantes: 15 },
    { id: 6, tipo: "Licença de Operação", cliente: "ReciclaMais Indústrias", numero: "LO-2023-006", emissao: "2022-08-12", vencimento: "2023-08-12", status: "Vencida", diasRestantes: -15 },
    { id: 7, tipo: "Licença Prévia", cliente: "Verde Campo Agropecuária", numero: "LP-2023-007", emissao: "2023-04-28", vencimento: "2024-04-28", status: "Ativo", diasRestantes: 115 },
    { id: 8, tipo: "Licença de Operação", cliente: "EcoTech Soluções", numero: "LO-2023-008", emissao: "2023-12-01", vencimento: "2024-06-01", status: "Vencendo", diasRestantes: 28 },
  ];

  const formatDate = (d) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const getStatusClass = (s) => {
    switch (s) {
      case "Ativo": return "active";
      case "Vencendo": return "expiring";
      case "Vencida": return "expired";
      case "Pendente": return "pending";
      default: return "";
    }
  };

  const getDaysBadge = (dias) => {
    if (dias < 0) return { class: "urgent", text: "Vencida" };
    if (dias <= 30) return { class: "urgent", text: `${dias} dias` };
    if (dias <= 60) return { class: "attention", text: `${dias} dias` };
    return { class: "normal", text: `${dias} dias` };
  };

  const getTipoIcon = (tipo) => {
    const icons = { "Licença Ambiental": "♻️", "Licença de Operação": "♻️", "Licença Prévia": "♻️", "Licença de Instalação": "♻️", "Renovação Ambiental": "♻️" };
    return icons[tipo] || "♻️";
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/dashboard" className={styles.backButton}>← Dashboard</Link>
          <h1>👁️ Licenças</h1>
          <p>Gerencie todas as licenças ambientais</p>
        </div>
        <Link to="/nova-licenca" className={styles.newButton}>+ Nova licença</Link>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryCard}><div className={styles.cardHeader}><span className={styles.cardIcon}>👥</span><span>Total</span></div><strong>{licencas.length}</strong></div>
        <div className={styles.summaryCard}><div className={styles.cardHeader}><span className={styles.cardIcon}>✅</span><span>Ativas</span></div><strong>{licencas.filter(l => l.status === "Ativo").length}</strong></div>
        <div className={`${styles.summaryCard} ${styles.warning}`}><div className={styles.cardHeader}><span className={styles.cardIcon}>⚠️</span><span>Vencendo</span></div><strong>{licencas.filter(l => l.status === "Vencendo").length}</strong></div>
        <div className={`${styles.summaryCard} ${styles.danger}`}><div className={styles.cardHeader}><span className={styles.cardIcon}>👥</span><span>Vencidas</span></div><strong>{licencas.filter(l => l.status === "Vencida").length}</strong></div>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}><span>🔎</span><input type="text" placeholder="Buscar licença..." /></div>
          <div className={styles.toolbarRight}><select><option>Todas</option><option>Ativas</option><option>Vencendo</option><option>Vencidas</option></select></div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead><tr><th>Licença</th><th>Cliente</th><th>Número</th><th>Emissão</th><th>Vencimento</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {licencas.map(l => {
                const db = getDaysBadge(l.diasRestantes);
                return (
                  <tr key={l.id}>
                    <td><div className={styles.licencaName}><div className={styles.licencaAvatar}>{getTipoIcon(l.tipo)}</div><strong>{l.tipo}</strong></div></td>
                    <td>{l.cliente}</td><td>{l.numero}</td><td>{formatDate(l.emissao)}</td>
                    <td><span className={styles.vencimentoDate}>{formatDate(l.vencimento)} <span className={`${styles.daysBadge} ${styles[db.class]}`}>{db.text}</span></span></td>
                    <td><span className={`${styles.statusBadge} ${styles[getStatusClass(l.status)]}`}><span className={styles.dot}></span>{l.status}</span></td>
                    <td><div className={styles.actionButtons}>
                      <Link to={`/licencas/${l.id}`} className={`${styles.actionBtn} ${styles.view}`}>👁</Link>
                      <Link to={`/licencas/${l.id}/editar`} className={`${styles.actionBtn} ${styles.edit}`}>✎</Link>
                      <button className={`${styles.actionBtn} ${styles.delete}`}>❌</button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <span>Mostrando 8 de 32 licenças</span>
          <div className={styles.paginationButtons}><button disabled>‹</button><button className={styles.currentPage}>1</button><button>2</button><button>3</button><button>4</button><button>›</button></div>
        </div>
      </div>
    </div>
  );
}

export default Licencas;
