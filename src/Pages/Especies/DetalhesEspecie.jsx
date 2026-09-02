import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Especies.module.css";

function DetalhesEspecie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [especie, setEspecie] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const especies = [
      {
        id: 1,
        nomeCientifico: "Ma langsdorffii",
        familia: "Myrtaceae",
        nomePopular: "Brinco-de-macaco",
        versao: "v1",
        status: "Aprovada",
        dataCadastro: "2024-01-15",
        descricao: "Espécie nativa da Mata Atlântica, encontrada em regiões de altitude.",
        observacoes: "Coleta realizada na Serra do Mar.",
        historico: [
          { data: "2024-01-15", evento: "Espécie cadastrada" },
          { data: "2024-01-20", evento: "Análise realizada" },
          { data: "2024-01-25", evento: "Aprovada" },
        ],
      },
      {
        id: 2,
        nomeCientifico: "On pauciflorum",
        familia: "Malvaceae",
        nomePopular: "—",
        versao: "v1",
        status: "Aprovada",
        dataCadastro: "2024-01-20",
        descricao: "Espécie comum em áreas de cerrado.",
        observacoes: "Material herborizado.",
        historico: [
          { data: "2024-01-20", evento: "Espécie cadastrada" },
          { data: "2024-01-25", evento: "Aprovada" },
        ],
      },
    ];

    const encontrado = especies.find((e) => e.id === Number(id));
    setEspecie(encontrado);
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

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando espécie...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!especie) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/especies" className={styles.backButton}>
              ← Espécies
            </Link>
            <h1>Espécie não encontrada</h1>
            <p>A espécie que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/especies" className={styles.backButton}>
            ← Espécies
          </Link>
          <h1>🌿 {especie.nomeCientifico}</h1>
          <p>Detalhes completos da espécie</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/especies/${especie.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar espécie
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover a espécie "${especie.nomeCientifico}"?`)) {
                navigate("/especies");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>🌱</div>

        <div className={styles.detailsGrid}>
          <div>
            <span>NOME CIENTÍFICO</span>
            <strong style={{ fontStyle: "italic" }}>{especie.nomeCientifico}</strong>
          </div>

          <div>
            <span>FAMÍLIA</span>
            <strong>{especie.familia}</strong>
          </div>

          <div>
            <span>NOME POPULAR</span>
            <strong>{especie.nomePopular}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(especie.status)]}`}>
              <span className={styles.dot}></span>
              {getStatusIcon(especie.status)} {especie.status}
            </span>
          </div>

          <div>
            <span>VERSÃO</span>
            <strong>{especie.versao}</strong>
          </div>

          <div>
            <span>DATA DE CADASTRO</span>
            <strong>{formatDate(especie.dataCadastro)}</strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>DESCRIÇÃO</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {especie.descricao || "Sem descrição"}
            </strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {especie.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      {especie.historico && especie.historico.length > 0 && (
        <div className={styles.timeline}>
          <h3>📜 Histórico da espécie</h3>
          {especie.historico.map((item, index) => (
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

export default DetalhesEspecie;