import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>🌳</div>
          <div>
            <h2>EcoGestão</h2>
            <span>Gestão ambiental</span>
          </div>
        </div>
        <nav className={styles.menu}>
          <Link to="/protocolos" className={styles.menuItem}>📄 Protocolos</Link>
          <Link to="/protocolos" className={styles.quickButton}> <span>+</span> Novo protocolo</Link>
          <Link to="/dashboard" className={`${styles.menuItem} ${styles.active}`}>📊 Dashboard</Link>
          <Link to="/clientes" className={styles.menuItem}>👤 Clientes</Link>
          <Link to="/licencas" className={styles.menuItem}>🗓️ Licenças</Link>
          <Link to="/protocolos" className={styles.menuItem}>📝 Protocolos</Link>
          <Link to="/agenda" className={styles.menuItem}>📅 Agenda</Link>
          <Link to="/pagamentos" className={styles.menuItem}>💲 Pagamentos</Link>
        </nav>
        <div className={styles.sidebarBottom}>
          <Link to="/dashboard" className={styles.menuItem}>⚙️ Configurações</Link>
          <button className={`${styles.menuItem} ${styles.logout}`} onClick={() => navigate("/login")}>
            ➜ Sair
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <h1>Dashboard</h1>
            <p>Visão geral da gestão ambiental</p>
          </div>
          <div className={styles.userArea}>
            <div className={styles.notification}>🔔</div>
            <div className={styles.userInfo}>
              <strong>Administrador</strong>
              <span>Gestor</span>
            </div>
            <div className={styles.avatar}>👤</div>
          </div>
        </header>

        <section className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>👥</div>
            <div><span>Clientes</span><strong>32</strong></div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>🆔
            </div>
            <div><span>Licenças ativas</span><strong>48</strong></div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>🟢</div>
            <div><span>Protocolos</span><strong>17</strong></div>
          </div>
          <div className={`${styles.summaryCard} ${styles.warning}`}>
            <div className={styles.cardIcon}>⚠️</div>
            <div><span>Vencimentos próximos</span><strong>5</strong></div>
          </div>
        </section>

        <section className={styles.dashboardGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><h2>Próximos vencimentos</h2><p>Licenças que precisam de atenção</p></div>
              <Link to="/licencas">Ver todos</Link>
            </div>
            <div className={styles.deadlineList}>
              <div className={styles.deadlineItem}>
                <div className={styles.deadlineInfo}><strong>Licença Ambiental</strong><span>Empresa Verde Ltda.</span></div>
                <div className={styles.deadlineDate}><strong>25/08/2026</strong><span className={`${styles.status} ${styles.urgent}`}>Urgente</span></div>
              </div>
              <div className={styles.deadlineItem}>
                <div className={styles.deadlineInfo}><strong>Licença de Operação</strong><span>Eco Norte Comércio</span></div>
                <div className={styles.deadlineDate}><strong>30/08/2026</strong><span className={`${styles.status} ${styles.attention}`}>Atenção</span></div>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><h2>Agenda</h2><p>Próximos compromissos</p></div>
              <Link to="/agenda">Ver agenda</Link>
            </div>
            <div className={styles.agendaList}>
              <div className={styles.agendaItem}>
                <div className={styles.agendaDate}><strong>24</strong><span>AGO</span></div>
                <div className={styles.agendaInfo}><strong>Reunião com cliente</strong><span>14:00 — Empresa Verde Ltda.</span></div>
              </div>
              <div className={styles.agendaItem}>
                <div className={styles.agendaDate}><strong>26</strong><span>AGO</span></div>
                <div className={styles.agendaInfo}><strong>Visita técnica</strong><span>09:30 — AgroSul Ltda.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.quickActions}>
          <h2>Acesso rápido</h2>
          <div className={styles.actions}>
            <Link to="/clientes" className={styles.quickButton}><span>+</span> Novo cliente</Link>
            <Link to="/licencas" className={styles.quickButton}><span>+</span> Nova licença</Link>
            <Link to="/protocolos" className={styles.quickButton}><span>+</span> Novo protocolo</Link>
            <Link to="/agenda" className={styles.quickButton}><span>+</span> Novo agendamento</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
