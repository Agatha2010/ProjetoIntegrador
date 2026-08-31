import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Clientes.module.css";

function DetalhesCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const clientes = [
      {
        id: 1,
        nome: "Empresa Verde Ltda.",
        cnpj: "12.345.678/0001-90",
        responsavel: "Mariana Silva",
        telefone: "(51) 99999-1234",
        email: "contato@empresaverde.com.br",
        endereco: "Av. dos Estados, 1500 - Porto Alegre/RS",
        status: "Ativo",
        desde: "2023-01-15",
        descricao: "Empresa especializada em consultoria ambiental e gestão de resíduos.",
        segmento: "Consultoria Ambiental",
        licencas: 5,
        protocolos: 12,
      },
      {
        id: 2,
        nome: "AgroSul Ltda.",
        cnpj: "23.456.789/0001-81",
        responsavel: "Carlos Oliveira",
        telefone: "(51) 98888-4321",
        email: "carlos@agrosul.com.br",
        endereco: "Rua das Árvores, 234 - Novo Hamburgo/RS",
        status: "Ativo",
        desde: "2023-03-22",
        descricao: "Produtora de alimentos orgânicos e sustentáveis.",
        segmento: "Agronegócio",
        licencas: 3,
        protocolos: 8,
      },
      {
        id: 3,
        nome: "Indústria Sustentável S.A.",
        cnpj: "34.567.890/0001-72",
        responsavel: "Fernanda Costa",
        telefone: "(51) 97777-5678",
        email: "fernanda@industriasustentavel.com.br",
        endereco: "Rodovia BR-116, 3450 - São Leopoldo/RS",
        status: "Ativo",
        desde: "2023-06-10",
        descricao: "Indústria de equipamentos para energia renovável.",
        segmento: "Energia",
        licencas: 7,
        protocolos: 15,
      },
      {
        id: 4,
        nome: "Eco Norte Comércio",
        cnpj: "45.678.901/0001-63",
        responsavel: "Lucas Pereira",
        telefone: "(51) 96666-8765",
        email: "lucas@econorte.com.br",
        endereco: "Av. Independência, 789 - Canoas/RS",
        status: "Pendente",
        desde: "2023-09-05",
        descricao: "Comércio de produtos ecológicos e sustentáveis.",
        segmento: "Varejo",
        licencas: 2,
        protocolos: 4,
      },
    ];

    const encontrado = clientes.find((c) => c.id === Number(id));
    setCliente(encontrado);
    setCarregando(false);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Ativo": return "active";
      case "Pendente": return "pending";
      case "Inativo": return "inactive";
      default: return "";
    }
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando cliente...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/clientes" className={styles.backButton}>← Clientes</Link>
            <h1>Cliente não encontrado</h1>
            <p>O cliente que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/clientes" className={styles.backButton}>← Clientes</Link>
          <h1>{cliente.nome}</h1>
          <p>Detalhes completos do cliente</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to={`/clientes/${cliente.id}/editar`} className={styles.newButton}>
            ✎ Editar cliente
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover o cliente "${cliente.nome}"?`)) {
                navigate("/clientes");
              }
            }}
          >
            x Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>
          {cliente.nome.charAt(0)}
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <span>Empresa</span>
            <strong>{cliente.nome}</strong>
          </div>

          <div>
            <span>CNPJ</span>
            <strong>{cliente.cnpj}</strong>
          </div>

          <div>
            <span>Segmento</span>
            <strong>{cliente.segmento || "Não informado"}</strong>
          </div>

          <div>
            <span>Status</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(cliente.status)]}`}>
              <span className={styles.dot}></span>
              {cliente.status}
            </span>
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
            <span>Cliente desde</span>
            <strong>{formatDate(cliente.desde)}</strong>
          </div>

          <div>
            <span>Licenças</span>
            <strong>{cliente.licencas || 0}</strong>
          </div>

          <div>
            <span>Protocolos</span>
            <strong>{cliente.protocolos || 0}</strong>
          </div>

          <div>
            <span>Descrição</span>
            <strong>{cliente.descricao || "Sem descrição"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesCliente;
