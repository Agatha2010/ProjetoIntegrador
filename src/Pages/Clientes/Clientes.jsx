import { Link } from "react-router-dom";
import styles from "./Clientes.module.css";

function Clientes() {
  const clientes = [
    { id: 1, nome: "Empresa Verde Ltda.", cnpj: "12.345.678/0001-90", responsavel: "Mariana Silva", telefone: "(51) 99999-1234", status: "Ativo", desde: "2023-01-15" },
    { id: 2, nome: "AgroSul Ltda.", cnpj: "23.456.789/0001-81", responsavel: "Carlos Oliveira", telefone: "(51) 98888-4321", status: "Ativo", desde: "2023-03-22" },
    { id: 3, nome: "Indústria Sustentável S.A.", cnpj: "34.567.890/0001-72", responsavel: "Fernanda Costa", telefone: "(51) 97777-5678", status: "Ativo", desde: "2023-06-10" },
    { id: 4, nome: "Eco Norte Comércio", cnpj: "45.678.901/0001-63", responsavel: "Lucas Pereira", telefone: "(51) 96666-8765", status: "Pendente", desde: "2023-09-05" },
    { id: 5, nome: "BioEnergia do Brasil", cnpj: "56.789.012/0001-54", responsavel: "Ana Beatriz Souza", telefone: "(51) 95555-2345", status: "Ativo", desde: "2023-11-18" },
    { id: 6, nome: "ReciclaMais Indústrias", cnpj: "67.890.123/0001-45", responsavel: "Roberto Mendes", telefone: "(51) 94444-6789", status: "Inativo", desde: "2022-08-12" },
    { id: 7, nome: "Verde Campo Agropecuária", cnpj: "78.901.234/0001-36", responsavel: "Patrícia Lima", telefone: "(51) 93333-7890", status: "Ativo", desde: "2023-04-28" },
    { id: 8, nome: "EcoTech Soluções", cnpj: "89.012.345/0001-27", responsavel: "Ricardo Nunes", telefone: "(51) 92222-8901", status: "Pendente", desde: "2023-12-01" },
  ];

  const formatDate = (d) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/dashboard" className={styles.backButton}>← Dashboard</Link>
          <h1>Clientes</h1>
          <p>Gerencie todos os clientes da empresa</p>
        </div>
        <Link to="/novo-cliente" className={styles.newButton}>+ Novo cliente</Link>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}><span className={styles.cardIcon}>👤</span><span>Total de clientes</span></div>
          <strong>{clientes.length}</strong>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}><span className={styles.cardIcon}>✅</span><span>Clientes ativos</span></div>
          <strong>{clientes.filter(c => c.status === "Ativo").length}</strong>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}><span className={styles.cardIcon}>⏳</span><span>Clientes pendentes</span></div>
          <strong>{clientes.filter(c => c.status === "Pendente").length}</strong>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}><span className={styles.cardIcon}>👤</span><span>Último cadastro</span></div>
          <strong style={{ fontSize: "18px" }}>08 dez 2023</strong>
        </div>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}><span>👤</span><input type="text" placeholder="Buscar cliente..." /></div>
          <div className={styles.toolbarRight}>
            <select><option>Todos</option><option>Ativos</option><option>Pendentes</option></select>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead><tr><th>Cliente</th><th>CNPJ</th><th>Responsável</th><th>Telefone</th><th>Status</th><th>Desde</th><th>Ações</th></tr></thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td><div className={styles.clientName}><div className={styles.clientAvatar}>{c.nome.charAt(0)}</div><strong>{c.nome}</strong></div></td>
                  <td>{c.cnpj}</td><td>{c.responsavel}</td><td>{c.telefone}</td>
                  <td><span className={`${styles.statusBadge} ${c.status === "Ativo" ? styles.active : c.status === "Pendente" ? styles.pending : styles.inactive}`}><span className={styles.dot}></span>{c.status}</span></td>
                  <td>{formatDate(c.desde)}</td>
                  <td><div className={styles.actionButtons}>
                    <Link to={`/clientes/${c.id}`} className={`${styles.actionBtn} ${styles.view}`}>👤</Link>
                    <Link to={`/clientes/${c.id}/editar`} className={`${styles.actionBtn} ${styles.edit}`}>✎</Link>
                    <button className={`${styles.actionBtn} ${styles.delete}`}>x</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <span>Mostrando 8 de 32 clientes</span>
          <div className={styles.paginationButtons}><button disabled>‹</button><button className={styles.currentPage}>1</button><button>2</button><button>3</button><button>4</button><button>›</button></div>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
