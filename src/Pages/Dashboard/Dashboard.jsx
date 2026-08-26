// Importa o Link do React Router.
// O Link permite navegar para outra página sem recarregar o site.
import { Link } from "react-router-dom";

// Importa o arquivo CSS responsável pelo visual do Dashboard.
import "./Dashboard.css";


// Componente principal do Dashboard.
function Dashboard() {

  return (

 // Container principal de toda a tela.
 <div className="dashboard">

{/* =====================================================
MENU LATERAL
===================================================== */}

{/* Barra lateral esquerda do sistema. */}
<aside className="sidebar">

  {/* Área com o logo e o nome do sistema. */}
  <div className="brand">

{/* Logo provisório da EcoGestão. */}
<div className="brand-logo">
🌿
</div>

{/* Nome e descrição do sistema. */}
<div>
  <h2>EcoGestão</h2>
  <span>Gestão ambiental</span>
</div>

  </div>


  {/* =====================================================
  MENU DE NAVEGAÇÃO
  ===================================================== */}

  <nav className="menu">


{/* -------------------------------------------------
 BOTÃO DASHBOARD
 -------------------------------------------------
 O Link leva o usuário para /dashboard.
*/}
<Link
  to="/dashboard"
  className="menu-item active"
>
 
  Dashboard
</Link>


{/* -------------------------------------------------
 BOTÃO CLIENTES
 -------------------------------------------------
 Ao clicar, abre a página de clientes.
*/}
<Link
  to="/clientes"
  className="menu-item"
>
  
  Clientes
</Link>


{/* -------------------------------------------------
 BOTÃO LICENÇAS
 -------------------------------------------------
 Ao clicar, abre a página de licenças.
*/}
<Link
  to="/licencas"
  className="menu-item"
>

  Licenças
</Link>


{/* -------------------------------------------------
 BOTÃO PROTOCOLOS
 -------------------------------------------------
 A página ainda será criada.
*/}
<Link
  to="/protocolos"
  className="menu-item"
>

  Protocolos
</Link>


{/* -------------------------------------------------
 BOTÃO AGENDA
 -------------------------------------------------
 A página ainda será criada.
*/}
<Link
  to="/agenda"
  className="menu-item"
>

  Agenda
</Link>


{/* -------------------------------------------------
 BOTÃO PAGAMENTOS
 -------------------------------------------------
 A página ainda será criada.
*/}
<Link
  to="/pagamentos"
  className="menu-item"
>

  Pagamentos
</Link>

  </nav>


  {/* =====================================================
  MENU INFERIOR
  ===================================================== */}

  <div className="sidebar-bottom">


{/* Botão de configurações.
 Por enquanto, está voltando para o Dashboard.
 Depois podemos criar uma página própria. */}
<Link
  to="/dashboard"
  className="menu-item"
>
  <span>*</span>
  Configurações
</Link>


{/* Botão Sair.
 Ao clicar, volta para a tela de Login. */}
<Link
  to="/login"
  className="menu-item logout"
>
  <span>-</span>
  Sair
</Link>

  </div>

</aside>


{/* =====================================================
CONTEÚDO PRINCIPAL
===================================================== */}

<main className="dashboard-content">


  {/* =====================================================
  CABEÇALHO
  ===================================================== */}

  <header className="topbar">

{/* Título e descrição do Dashboard. */}
<div>

  <h1>
 Dashboard
  </h1>

  <p>
 Visão geral da gestão ambiental
  </p>

</div>


{/* Área com notificações e usuário. */}
<div className="user-area">


  {/* Ícone de notificações.
Ainda é apenas visual. */}
  <div className="notification">
 !
  </div>


  {/* Informações do usuário logado. */}
  <div className="user-info">

 <strong>
Administrador
 </strong>

 <span>
Gestor
 </span>

  </div>


  {/* Avatar provisório do usuário. */}
  <div className="avatar">
 ?
  </div>

</div>

  </header>


  {/* =====================================================
  CARDS DE RESUMO
  ===================================================== */}

  <section className="summary-cards">


{/* -------------------------------------------------
 CARD DE CLIENTES
-------------------------------------------------- */}
<div className="summary-card">

  <div className="card-icon">
 II
  </div>

  <div>

 <span>
Clientes
 </span>

 <strong>
32
 </strong>

  </div>

</div>


{/* -------------------------------------------------
 CARD DE LICENÇAS
-------------------------------------------------- */}
<div className="summary-card">

  <div className="card-icon">
 L
  </div>

  <div>

 <span>
Licenças ativas
 </span>

 <strong>
48
 </strong>

  </div>

</div>


{/* -------------------------------------------------
 CARD DE PROTOCOLOS
-------------------------------------------------- */}
<div className="summary-card">

  <div className="card-icon">
 P
  </div>

  <div>

 <span>
Protocolos
 </span>

 <strong>
17
 </strong>

  </div>

</div>


{/* -------------------------------------------------
 CARD DE VENCIMENTOS
-------------------------------------------------- */}
<div className="summary-card warning">

  <div className="card-icon">
 !
  </div>

  <div>

 <span>
Vencimentos próximos
 </span>

 <strong>
5
 </strong>

  </div>

</div>

  </section>


  {/* =====================================================
  ÁREAS INFERIORES DO DASHBOARD
  ===================================================== */}

  <section className="dashboard-grid">


{/* ===================================================
 PAINEL DE VENCIMENTOS
 =================================================== */}

<div className="panel">


  {/* Cabeçalho do painel. */}
  <div className="panel-header">

 <div>

<h2>
  Próximos vencimentos
</h2>

<p>
  Licenças que precisam de atenção
</p>

 </div>


 {/* Botão "Ver todos".
  Leva para a página de Licenças. */}
 <Link to="/licencas">
Ver todos
 </Link>

  </div>


  {/* Lista de vencimentos. */}
  <div className="deadline-list">


 {/* ------------------------------------------------
  LICENÇA 1
 ------------------------------------------------ */}
 <div className="deadline-item">

<div className="deadline-info">

  <strong>
Licença Ambiental
  </strong>

  <span>
Empresa Verde Ltda.
  </span>

</div>

<div className="deadline-date">

  <strong>
25/08/2026
  </strong>

  <span className="status urgent">
Urgente
  </span>

</div>

 </div>


 {/* ------------------------------------------------
  LICENÇA 2
 ------------------------------------------------ */}
 <div className="deadline-item">

<div className="deadline-info">

  <strong>
Licença de Operação
  </strong>

  <span>
Eco Norte Comércio
  </span>

</div>

<div className="deadline-date">

  <strong>
30/08/2026
  </strong>

  <span className="status attention">
Atenção
  </span>

</div>

 </div>


 {/* ------------------------------------------------
  LICENÇA 3
 ------------------------------------------------ */}
 <div className="deadline-item">

<div className="deadline-info">

  <strong>
Licença Prévia
  </strong>

  <span>
Indústria Sustentável
  </span>

</div>

<div className="deadline-date">

  <strong>
05/09/2026
  </strong>

  <span className="status normal">
Normal
  </span>

</div>

 </div>


 {/* ------------------------------------------------
  LICENÇA 4
 ------------------------------------------------ */}
 <div className="deadline-item">

<div className="deadline-info">

  <strong>
Renovação Ambiental
  </strong>

  <span>
AgroSul Ltda.
  </span>

</div>

<div className="deadline-date">

  <strong>
10/09/2026
  </strong>

  <span className="status normal">
Normal
  </span>

</div>

 </div>

  </div>

</div>


{/* ===================================================
 PAINEL DA AGENDA
 =================================================== */}

<div className="panel">


  {/* Cabeçalho da agenda. */}
  <div className="panel-header">

 <div>

<h2>
  Agenda
</h2>

<p>
  Próximos compromissos
</p>

 </div>


 {/* Botão "Ver agenda".
  Futuramente abrirá a página Agenda. */}
 <Link to="/agenda">
Ver agenda
 </Link>

  </div>


  {/* Lista de compromissos. */}
  <div className="agenda-list">


 {/* ------------------------------------------------
  COMPROMISSO 1
 ------------------------------------------------ */}
 <div className="agenda-item">

<div className="agenda-date">

  <strong>
24
  </strong>

  <span>
AGO
  </span>

</div>

<div className="agenda-info">

  <strong>
Reunião com cliente
  </strong>

  <span>
14:00 — Empresa Verde Ltda.
  </span>

</div>

 </div>


 {/* ------------------------------------------------
  COMPROMISSO 2
 ------------------------------------------------ */}
 <div className="agenda-item">

<div className="agenda-date">

  <strong>
26
  </strong>

  <span>
AGO
  </span>

</div>

<div className="agenda-info">

  <strong>
Visita técnica
  </strong>

  <span>
09:30 — AgroSul Ltda.
  </span>

</div>

 </div>


 {/* ------------------------------------------------
  COMPROMISSO 3
 ------------------------------------------------ */}
 <div className="agenda-item">

<div className="agenda-date">

  <strong>
28
  </strong>

  <span>
AGO
  </span>

</div>

<div className="agenda-info">

  <strong>
Reunião interna
  </strong>

  <span>
15:30 — Sala de reuniões
  </span>

</div>

 </div>

  </div>

</div>

  </section>


  {/* =====================================================
  ACESSO RÁPIDO
  ===================================================== */}

  <section className="quick-actions">


{/* Título da área de atalhos. */}
<h2>
  Acesso rápido
</h2>


<div className="actions">


  {/* -------------------------------------------------
BOTÃO NOVO CLIENTE
-------------------------------------------------
Leva para a página de clientes.
  */}
  <Link
 to="/clientes"
 className="quick-button"
  >
 <span>+</span>
 Novo cliente
  </Link>


  {/* -------------------------------------------------
BOTÃO NOVA LICENÇA
-------------------------------------------------
Leva para a página de licenças.
  */}
  <Link
 to="/licencas"
 className="quick-button"
  >
 <span>+</span>
 Nova licença
  </Link>


  {/* -------------------------------------------------
BOTÃO NOVO PROTOCOLO
-------------------------------------------------
Leva para a página de protocolos.
  */}
  <Link
 to="/protocolos"
 className="quick-button"
  >
 <span>+</span>
 Novo protocolo
  </Link>


  {/* -------------------------------------------------
BOTÃO NOVO AGENDAMENTO
-------------------------------------------------
Leva para a página de agenda.
  */}
  <Link
 to="/agenda"
 className="quick-button"
  >
 <span>+</span>
 Novo agendamento
  </Link>

</div>

  </section>

</main>

 </div>
  );
}


// Exporta o Dashboard para que ele possa ser usado no App.jsx.
export default Dashboard;