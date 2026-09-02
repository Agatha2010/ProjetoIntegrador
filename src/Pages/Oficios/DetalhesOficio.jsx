import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Oficios.module.css";

function DetalhesOficio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oficio, setOficio] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const oficios = [
      {
        id: 1,
        numero: "21967/2024/SEFIS-RS/ANM",
        dataEmissao: "2024-06-18",
        dataVencimento: "2024-07-18",
        status: "Concluído",
        links: "Sem links",
        projeto: "Carolina Borba da Silva - ME",
        cliente: "Pedreira Borbinha",
        descricao: "Ofício referente à regularização da licença ambiental.",
        observacoes: "Documento arquivado.",
        historico: [
          { data: "2024-06-18", evento: "Ofício emitido" },
          { data: "2024-07-18", evento: "Ofício concluído" },
        ],
      },
      {
        id: 2,
        numero: "00994 / 2024",
        dataEmissao: "2024-03-04",
        dataVencimento: "2024-07-04",
        status: "Concluído",
        links: "Sem links",
        projeto: "Parmíssimo",
        cliente: "Parmíssimo Alimentos LTDA",
        descricao: "Ofício para renovação de licença.",
        observacoes: "Processo finalizado.",
        historico: [
          { data: "2024-03-04", evento: "Ofício emitido" },
          { data: "2024-07-04", evento: "Ofício concluído" },
        ],
      },
    ];

    const encontrado = oficios.find((o) => o.id === Number(id));
    setOficio(encontrado);
    setCarregando(false);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Concluído": return "completed";
      case "Em andamento": return "inProgress";
      case "Pendente": return "pending";
      case "Cancelado": return "canceled";
      default: return "";
    }
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando ofício...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!oficio) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/oficios" className={styles.backButton}>
              ← Ofícios
            </Link>
            <h1>Ofício não encontrado</h1>
            <p>O ofício que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/oficios" className={styles.backButton}>
            ← Ofícios
          </Link>
          <h1>📄 {oficio.numero}</h1>
          <p>Detalhes completos do ofício</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/oficios/${oficio.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar ofício
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover o ofício "${oficio.numero}"?`)) {
                navigate("/oficios");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>📄</div>

        <div className={styles.detailsGrid}>
          <div>
            <span>NÚMERO DO OFÍCIO</span>
            <strong>{oficio.numero}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(oficio.status)]}`}>
              <span className={styles.dot}></span>
              {oficio.status}
            </span>
          </div>

          <div>
            <span>DATA DE EMISSÃO</span>
            <strong>{formatDate(oficio.dataEmissao)}</strong>
          </div>

          <div>
            <span>DATA DE VENCIMENTO</span>
            <strong>{formatDate(oficio.dataVencimento)}</strong>
          </div>

          <div>
            <span>PROJETO</span>
            <strong>{oficio.projeto}</strong>
          </div>

          <div>
            <span>CLIENTE</span>
            <strong>{oficio.cliente}</strong>
          </div>

          <div>
            <span>LINKS DE DOCUMENTOS</span>
            <strong>{oficio.links || "Nenhum link"}</strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>DESCRIÇÃO</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {oficio.descricao || "Sem descrição"}
            </strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {oficio.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      {oficio.historico && oficio.historico.length > 0 && (
        <div className={styles.timeline}>
          <h3>📜 Histórico do ofício</h3>
          {oficio.historico.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.timelineIcon}>
                {index === 0 ? "🌟" : "📌"}
              </div>
              <div className={styles.timelineContent}>
                <strong>{item.evento}</strong>
                <span>{formatDate(item.data)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DetalhesOficio;