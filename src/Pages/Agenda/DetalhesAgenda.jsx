import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Agenda.module.css";

function DetalhesAgenda() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [compromisso, setCompromisso] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const compromissos = [
      {
        id: 1,
        titulo: "Reunião com cliente - Empresa Verde",
        data: "2024-08-24",
        hora: "14:00",
        tipo: "Reunião",
        cliente: "Empresa Verde Ltda.",
        local: "Sala de Reuniões 1",
        status: "Confirmado",
        prioridade: "Alta",
        descricao: "Apresentação do projeto de licenciamento ambiental para a Empresa Verde.",
        observacoes: "Trazer documentos e relatórios atualizados.",
      },
      {
        id: 2,
        titulo: "Visita técnica - AgroSul",
        data: "2024-08-26",
        hora: "09:30",
        tipo: "Visita",
        cliente: "AgroSul Ltda.",
        local: "Unidade AgroSul - Novo Hamburgo",
        status: "Confirmado",
        prioridade: "Média",
        descricao: "Vistoria para renovação de licença na unidade AgroSul.",
        observacoes: "Equipamentos de segurança necessários.",
      },
    ];

    const encontrado = compromissos.find((c) => c.id === Number(id));
    setCompromisso(encontrado);
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
      case "Confirmado": return "confirmed";
      case "Pendente": return "pending";
      case "Concluído": return "completed";
      case "Cancelado": return "canceled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmado": return "✅";
      case "Pendente": return "⏳";
      case "Concluído": return "✔️";
      case "Cancelado": return "❌";
      default: return "";
    }
  };

  const getPrioridadeClass = (prioridade) => {
    switch (prioridade) {
      case "Urgente": return "urgent";
      case "Alta": return "high";
      case "Média": return "medium";
      case "Baixa": return "low";
      default: return "";
    }
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      "Reunião": "🤝",
      "Visita": "🏭",
      "Entrega": "📦",
      "Vistoria": "🔍",
      "Apresentação": "📊",
    };
    return icons[tipo] || "📅";
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando compromisso...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!compromisso) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/agenda" className={styles.backButton}>
              ← Agenda
            </Link>
            <h1>Compromisso não encontrado</h1>
            <p>O compromisso que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/agenda" className={styles.backButton}>
            ← Agenda
          </Link>
          <h1>{getTipoIcon(compromisso.tipo)} {compromisso.titulo}</h1>
          <p>Detalhes completos do compromisso</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/agenda/${compromisso.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar compromisso
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover o compromisso "${compromisso.titulo}"?`)) {
                navigate("/agenda");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>
          {getTipoIcon(compromisso.tipo)}
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <span>TÍTULO</span>
            <strong>{compromisso.titulo}</strong>
          </div>

          <div>
            <span>TIPO</span>
            <strong>{compromisso.tipo}</strong>
          </div>

          <div>
            <span>DATA</span>
            <strong>{formatDate(compromisso.data)}</strong>
          </div>

          <div>
            <span>HORA</span>
            <strong>{compromisso.hora}</strong>
          </div>

          <div>
            <span>CLIENTE</span>
            <strong>{compromisso.cliente}</strong>
          </div>

          <div>
            <span>LOCAL</span>
            <strong>{compromisso.local}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(compromisso.status)]}`}>
              <span className={styles.dot}></span>
              {getStatusIcon(compromisso.status)} {compromisso.status}
            </span>
          </div>

          <div>
            <span>PRIORIDADE</span>
            <span className={`${styles.prioridadeBadge} ${styles[getPrioridadeClass(compromisso.prioridade)]}`}>
              {compromisso.prioridade}
            </span>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>DESCRIÇÃO</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {compromisso.descricao || "Sem descrição"}
            </strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {compromisso.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesAgenda;