// Importa o Link do React Router.
// Ele permite navegar entre as páginas sem recarregar o site.
import { Link } from "react-router-dom";

// Importa os estilos da página de clientes.
import "./Clientes.css";

function Clientes() {

  // Lista provisória de clientes.
  // Depois, esses dados poderão vir do banco de dados.
  const clientes = [
    {
      id: 1,
      nome: "Empresa Verde Ltda.",
      cnpj: "12.345.678/0001-90",
      responsavel: "Mariana Silva",
      telefone: "(51) 99999-1234",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "AgroSul Ltda.",
      cnpj: "23.456.789/0001-81",
      responsavel: "Carlos Oliveira",
      telefone: "(51) 98888-4321",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Indústria Sustentável",
      cnpj: "34.567.890/0001-72",
      responsavel: "Fernanda Costa",
      telefone: "(51) 97777-5678",
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Eco Norte Comércio",
      cnpj: "45.678.901/0001-63",
      responsavel: "Lucas Pereira",
      telefone: "(51) 96666-8765",
      status: "Pendente",
    },
  ];

  return (
    <div className="clientes-page">

      {/* =========================
          CABEÇALHO
      ========================= */}

      <div className="clientes-header">

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
            Clientes
          </h1>

          {/* Descrição */}
          <p>
            Gerencie os clientes da empresa
          </p>

        </div>

        {/* Botão para cadastrar um novo cliente */}
        <Link
          to="/novo-cliente"
          className="new-client-button"
        >
          + Novo cliente
        </Link>

      </div>

      {/* =========================
          CARDS DE RESUMO
      ========================= */}

      <div className="clientes-summary">

        {/* Total de clientes */}
        <div className="client-summary-card">
          <span>
            Total de clientes
          </span>

          <strong>
            32
          </strong>
        </div>

        {/* Clientes ativos */}
        <div className="client-summary-card">
          <span>
            Clientes ativos
          </span>

          <strong>
            29
          </strong>
        </div>

        {/* Clientes pendentes */}
        <div className="client-summary-card">
          <span>
            Clientes pendentes
          </span>

          <strong>
            3
          </strong>
        </div>

      </div>

      {/* =========================
          TABELA
      ========================= */}

      <div className="clientes-panel">

        {/* Barra de busca e filtro */}
        <div className="clientes-toolbar">

          {/* Campo de busca */}
          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Buscar cliente..."
            />

          </div>

          {/* Filtro por status */}
          <select>

            <option>
              Todos os clientes
            </option>

            <option>
              Ativos
            </option>

            <option>
              Pendentes
            </option>

          </select>

        </div>

        {/* Container da tabela */}
        <div className="table-container">

          <table>

            {/* Cabeçalho da tabela */}
            <thead>

              <tr>

                <th>
                  Cliente
                </th>

                <th>
                  CNPJ
                </th>

                <th>
                  Responsável
                </th>

                <th>
                  Telefone
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

              {/* Percorre todos os clientes */}
              {clientes.map((cliente) => (

                <tr key={cliente.id}>

                  {/* Nome do cliente */}
                  <td>

                    <div className="client-name">

                      {/* Primeira letra do nome */}
                      <div className="client-avatar">
                        {cliente.nome.charAt(0)}
                      </div>

                      <strong>
                        {cliente.nome}
                      </strong>

                    </div>

                  </td>

                  {/* CNPJ */}
                  <td>
                    {cliente.cnpj}
                  </td>

                  {/* Responsável */}
                  <td>
                    {cliente.responsavel}
                  </td>

                  {/* Telefone */}
                  <td>
                    {cliente.telefone}
                  </td>

                  {/* Status */}
                  <td>

                    <span
                      className={
                        cliente.status === "Ativo"
                          ? "status-client active"
                          : "status-client pending"
                      }
                    >
                      {cliente.status}
                    </span>

                  </td>

                  {/* Botões */}
                  <td>

                    <div className="table-actions">

                      {/* Visualizar cliente */}
                      <Link
                        to={`/clientes/${cliente.id}`}
                        className="action-button"
                        title="Visualizar cliente"
                      >
                        👁
                      </Link>

                      {/* Editar cliente */}
                      <Link
                        to={`/clientes/${cliente.id}/editar`}
                        className="action-button"
                        title="Editar cliente"
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

        {/* =========================
            PAGINAÇÃO
        ========================= */}

        <div className="pagination">

          <span>
            Mostrando 4 de 32 clientes
          </span>

          <div>

            <button type="button">
              ‹
            </button>

            <button
              type="button"
              className="current-page"
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

// Exporta a página de Clientes.
export default Clientes;