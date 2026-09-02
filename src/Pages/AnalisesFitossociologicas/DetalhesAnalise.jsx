import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./AnalisesFitossociologicas.module.css";

function DetalhesAnalise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analise, setAnalise] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const analises = [
      {
        id: 1,
        titulo: "Em frente ao Alpen",
        inicioColeta: "2026-03-30",
        parcelas: 8,
        areaParcela: "100 m²",
        areaTotal: "2.4 m²",
        areaAmostrada: "0.08 m²",
        projeto: "Em frente ao Alpen",
        status: "Concluída",
        responsavel: "Dr. Carlos Silva",
        coordenadas: "-23.5505, -46.6333",
        descricao: "Análise fitossociológica realizada na área em frente ao Alpen.",
        observacoes: "Amostragem realizada em 8 parcelas de 100m² cada.",
        historico: [
          { data: "2026-03-30", evento: "Início da coleta de dados" },
          { data: "2026-04-15", evento: "Análise de dados concluída" },
        ],
      },
      {
        id: 2,
        titulo: "Teste2",
        inicioColeta: "2026-03-10",
        parcelas: 17,
        areaParcela: "100 m²",
        areaTotal: "16.54 m²",
        areaAmostrada: "0.17 m²",
        projeto: "Fitossociologia testes",
        status: "Em andamento",
        responsavel: "Dra. Ana Oliveira",
        coordenadas: "-23.5505, -46.6333",
        descricao: "Análise de teste para validação da metodologia.",
        observacoes: "Em andamento, aguardando conclusão da coleta.",
        historico: [
          { data: "2026-03-10", evento: "Início da coleta" },
          { data: "2026-03-20", evento: "Coleta de dados em andamento" },
        ],
      },
    ];

    const encontrado = analises.find((a) => a.id === Number(id));
    setAnalise(encontrado);
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
      case "Concluída": return "completed";
      case "Em andamento": return "inProgress";
      case "Pendente": return "pending";
      case "Cancelada": return "canceled";
      default: return "";
    }
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando análise...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analise) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/analises" className={styles.backButton}>
              ← Análises
            </Link>
            <h1>Análise não encontrada</h1>
            <p>A análise que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/analises" className={styles.backButton}>
            ← Análises
          </Link>
          <h1>🌿 {analise.titulo}</h1>
          <p>Detalhes completos da análise fitossociológica</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/analises/${analise.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar análise
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover a análise "${analise.titulo}"?`)) {
                navigate("/analises");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>🌳</div>

        <div className={styles.detailsGrid}>
          <div>
            <span>TÍTULO</span>
            <strong>{analise.titulo}</strong>
          </div>

          <div>
            <span>PROJETO</span>
            <strong>{analise.projeto}</strong>
          </div>

          <div>
            <span>INÍCIO DA COLETA</span>
            <strong>{formatDate(analise.inicioColeta)}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(analise.status)]}`}>
              <span className={styles.dot}></span>
              {analise.status}
            </span>
          </div>

          <div>
            <span>RESPONSÁVEL</span>
            <strong>{analise.responsavel}</strong>
          </div>

          <div>
            <span>COORDENADAS</span>
            <strong>{analise.coordenadas || "Não informado"}</strong>
          </div>

          <div>
            <span>PARCELAS</span>
            <strong>{analise.parcelas}</strong>
          </div>

          <div>
            <span>ÁREA PARCELA</span>
            <strong>{analise.areaParcela}</strong>
          </div>

          <div>
            <span>ÁREA TOTAL</span>
            <strong>{analise.areaTotal}</strong>
          </div>

          <div>
            <span>ÁREA AMOSTRADA</span>
            <strong>{analise.areaAmostrada}</strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>DESCRIÇÃO</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {analise.descricao || "Sem descrição"}
            </strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {analise.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      {analise.historico && analise.historico.length > 0 && (
        <div className={styles.timeline}>
          <h3>📜 Histórico da análise</h3>
          {analise.historico.map((item, index) => (
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

export default DetalhesAnalise;