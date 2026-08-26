// Importa hooks e componentes do React Router.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Importa os estilos.
import "./Clientes.css";

function DetalhesCliente() {

  // Pega o ID pela URL.
  const { id } = useParams();

  // Guarda o cliente encontrado.
  const [cliente, setCliente] = useState(null);

  // Busca o cliente ao abrir a página.
  useEffect(() => {

    const clientes =
      JSON.parse(localStorage.getItem("clientes")) || [];

    const encontrado = clientes.find(
      (cliente) => String(cliente.id) === id
    );

    setCliente(encontrado);

  }, [id]);

  // Caso o cliente não exista.
  if (!cliente) {
    return (
      <div className="clientes-page">
        <h1>Cliente não encontrado</h1>

        <Link
          to="/clientes"
          className="back-button"
        >
          ← Voltar para Clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="clientes-page">

      <div className="clientes-header">

        <div>

          <Link
            to="/clientes"
            className="back-button"
          >
            ← Clientes
          </Link>

          <h1>{cliente.nome}</h1>

          <p>
            Detalhes do cliente
          </p>

        </div>

        <Link
          to={`/clientes/${cliente.id}/editar`}
          className="new-client-button"
        >
          ✎ Editar cliente
        </Link>

      </div>

      <div className="details-panel">

        <div className="details-avatar">
          {cliente.nome.charAt(0)}
        </div>

        <div className="details-grid">

          <div>
            <span>Empresa</span>
            <strong>{cliente.nome}</strong>
          </div>

          <div>
            <span>CNPJ</span>
            <strong>{cliente.cnpj}</strong>
          </div>

          <div>
            <span>Responsável</span>
            <strong>{cliente.responsavel}</strong>
          </div>

          <div>
            <span>Telefone</span>
            <strong>{cliente.telefone || "Não informado"}</strong>
          </div>

          <div>
            <span>E-mail</span>
            <strong>{cliente.email || "Não informado"}</strong>
          </div>

          <div>
            <span>Endereço</span>
            <strong>{cliente.endereco || "Não informado"}</strong>
          </div>

          <div>
            <span>Status</span>
            <span className="status-client active">
              {cliente.status}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DetalhesCliente;