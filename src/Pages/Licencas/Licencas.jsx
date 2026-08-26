// Importa o Link para navegar entre as páginas.
import { Link } from "react-router-dom";

// Importa o CSS da página de Licenças.
import "./Licencas.css";


// Componente principal da página de Licenças.
function Licencas() {

  // Lista provisória de licenças.
  // Futuramente esses dados poderão vir do banco de dados.
  const licencas = [
    {
      id: 1,
      nome: "Licença Ambiental",
      cliente: "Empresa Verde Ltda.",
      tipo: "Licença de Operação",
      vencimento: "25/08/2026",
      status: "Urgente",
    },
    {
      id: 2,
      nome: "Licença de Operação",
      cliente: "Eco Norte Comércio",
      tipo: "Licença Ambiental",
      vencimento: "30/08/2026",
      status: "Atenção",
    },
    {
      id: 3,
      nome: "Licença Prévia",
      cliente: "Indústria Sustentável",
      tipo: "Licença Prévia",
      vencimento: "05/09/2026",
      status: "Normal",
    },
    {
      id: 4,
      nome: "Renovação Ambiental",
      cliente: "AgroSul Ltda.",
      tipo: "Renovação",
      vencimento: "10/09/2026",
      status: "Normal",
    },
    {
      id: 5,
      nome: "Licença de Instalação",
      cliente: "Verde Vida Ltda.",
      tipo: "Licença de Instalação",
      vencimento: "20/09/2026",
      status: "Normal",
    },
  ];


  return (
    <div className="licencas-page">

      {/* 
CABEÇALHO
   */}

      <div className="licencas-header">

        <div>

{/* Botão para voltar ao Dashboard */}
<Link
  to="/dashboard"
  className="back-button"
>
  ← Dashboard
</Link>

{/* Título da página */}
<h1>
  Licenças
</h1>

{/* Descrição da página */}
<p>
  Controle e acompanhamento das licenças ambientais
</p>

        </div>


        {/* Botão para criar uma nova licença */}
        <Link
to="/nova-licenca"
className="new-license-button"
        >
+ Nova licença
        </Link>

      </div>


      {/* =====================================================
CARDS DE RESUMO
   */}

      <div className="licenses-summary">

        {/* Total de licenças */}
        <div className="license-summary-card">

<span>
  Total de licenças
</span>

<strong>
  48
</strong>

        </div>


        {/* Licenças ativas */}
        <div className="license-summary-card">

<span>
  Licenças ativas
</span>

<strong>
  40
</strong>

        </div>


        {/* Licenças próximas do vencimento */}
        <div className="license-summary-card">

<span>
  Vencendo em breve
</span>

<strong className="warning-number">
  5
</strong>

        </div>


        {/* Licenças vencidas */}
        <div className="license-summary-card">

<span>
  Vencidas
</span>

<strong className="danger-number">
  3
</strong>

        </div>

      </div>


      {/* =====================================================
TABELA DE LICENÇAS
   */}

      <div className="licenses-panel">


        {/* Barra de pesquisa e filtro */}
        <div className="licenses-toolbar">


{/* Campo de busca */}
<div className="license-search">

  <span>
    ⌕
  </span>

  <input
    type="text"
    placeholder="Buscar licença ou cliente..."
  />

</div>


{/* Filtro por status */}
<select>

  <option>
    Todos os status
  </option>

  <option>
    Normal
  </option>

  <option>
    Atenção
  </option>

  <option>
    Urgente
  </option>

</select>

        </div>


        {/* Container da tabela */}
        <div className="license-table-container">

<table>

  {/* Cabeçalho da tabela */}
  <thead>

    <tr>

      <th>
        Licença
      </th>

      <th>
        Cliente
      </th>

      <th>
        Tipo
      </th>

      <th>
        Vencimento
      </th>

      <th>
        Status
      </th>

      <th>
        Ações
      </th>

    </tr>

  </thead>


  {/* Corpo da tabela */}
  <tbody>

    {/* Percorre todas as licenças */}
    {licencas.map((licenca) => (

      <tr key={licenca.id}>


        {/* Nome da licença */}
        <td>

<div className="license-name">

  <div className="license-icon">
    !
  </div>

  <strong>
    {licenca.nome}
  </strong>

</div>

        </td>


        {/* Cliente relacionado */}
        <td>
{licenca.cliente}
        </td>


        {/* Tipo de licença */}
        <td>
{licenca.tipo}
        </td>


        {/* Data de vencimento */}
        <td>
{licenca.vencimento}
        </td>


        {/* Status da licença */}
        <td>

<span
  className={
    licenca.status === "Urgente"
      ? "license-status urgent"
      : licenca.status === "Atenção"
      ? "license-status attention"
      : "license-status normal"
  }
>
  {licenca.status}
</span>

        </td>


        {/* Botões da licença */}
        <td>

<div className="license-actions">


  {/* Botão visualizar */}
  <Link
    to={`/licencas/${licenca.id}`}
    className="license-action-button"
    title="Visualizar licença"
  >
    👁
  </Link>


  {/* Botão editar */}
  <Link
    to={`/licencas/${licenca.id}/editar`}
    className="license-action-button"
    title="Editar licença"
  >
    ✎
  </Link>

</div>

        </td>

      </tr>

    ))}

  </tbody>

</table>

        </div>


        {/* 
  PAGINAÇÃO
     */}

        <div className="licenses-pagination">

{/* Informação da quantidade de registros */}
<span>
  Mostrando 5 de 48 licenças
</span>


{/* Botões da paginação */}
<div>

  <button type="button">
    ‹
  </button>

  <button
    type="button"
    className="current-license-page"
  >
    1
  </button>

  <button type="button">
    2
  </button>

  <button type="button">
    3
  </button>

  <button type="button">
    ›
  </button>

</div>

    </div>
     </div>
    </div>
  );
}


// Exporta a página de Licenças.
export default Licencas;