import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Pagamentos.module.css";

function DetalhesPagamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagamento, setPagamento] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const pagamentos = [
      {
        id: 1,
        cliente: "Empresa Verde Ltda.",
        descricao: "Licença Ambiental - LA-2023-001",
        valor: 2500.00,
        dataVencimento: "2024-08-15",
        dataPagamento: null,
        status: "Pendente",
        formaPagamento: "Boleto",
        parcela: "1/3",
        observacoes: "Aguardando pagamento do boleto.",
        historico: [
          { data: "2024-08-01", evento: "Boleto emitido" },
          { data: "2024-08-10", evento: "Boleto enviado por e-mail" },
        ],
      },
      {
        id: 2,
        cliente: "AgroSul Ltda.",
        descricao: "Renovação de Licença - PRO-2023-002",
        valor: 1800.00,
        dataVencimento: "2024-08-20",
        dataPagamento: "2024-08-18",
        status: "Pago",
        formaPagamento: "Transferência",
        parcela: "Única",
        observacoes: "Pagamento confirmado via transferência bancária.",
        historico: [
          { data: "2024-08-15", evento: "Pagamento realizado" },
          { data: "2024-08-18", evento: "Pagamento confirmado" },
        ],
      },
    ];

    const encontrado = pagamentos.find((p) => p.id === Number(id));
    setPagamento(encontrado);
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

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pago": return "paid";
      case "Pendente": return "pending";
      case "Atrasado": return "overdue";
      case "Cancelado": return "canceled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pago": return "✅";
      case "Pendente": return "⏳";
      case "Atrasado": return "🔴";
      case "Cancelado": return "❌";
      default: return "";
    }
  };

  const getFormaPagamentoIcon = (forma) => {
    const icons = {
      "Boleto": "📄",
      "Transferência": "🏦",
      "Cartão de Crédito": "💳",
      "PIX": "⚡",
      "Dinheiro": "💰",
    };
    return icons[forma] || "💳";
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando pagamento...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pagamento) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/pagamentos" className={styles.backButton}>
              ← Pagamentos
            </Link>
            <h1>Pagamento não encontrado</h1>
            <p>O pagamento que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/pagamentos" className={styles.backButton}>
            ← Pagamentos
          </Link>
          <h1>💰 {pagamento.descricao}</h1>
          <p>Detalhes completos do pagamento</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={`/pagamentos/${pagamento.id}/editar`}
            className={styles.newButton}
          >
            ✎ Editar pagamento
          </Link>
          <button
            className={styles.newButton}
            style={{
              background: "white",
              color: "#b33a3a",
              border: "2px solid #fde8e8",
            }}
            onClick={() => {
              if (window.confirm(`Deseja realmente remover este pagamento?`)) {
                navigate("/pagamentos");
              }
            }}
          >
            🗑 Remover
          </button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>💰</div>

        <div className={styles.detailsGrid}>
          <div>
            <span>CLIENTE</span>
            <strong>{pagamento.cliente}</strong>
          </div>

          <div>
            <span>DESCRIÇÃO</span>
            <strong>{pagamento.descricao}</strong>
          </div>

          <div>
            <span>VALOR</span>
            <strong style={{ fontSize: "20px", color: "#24794f" }}>
              {formatCurrency(pagamento.valor)}
            </strong>
          </div>

          <div>
            <span>STATUS</span>
            <span className={`${styles.statusBadge} ${styles[getStatusClass(pagamento.status)]}`}>
              <span className={styles.dot}></span>
              {getStatusIcon(pagamento.status)} {pagamento.status}
            </span>
          </div>

          <div>
            <span>DATA DE VENCIMENTO</span>
            <strong>{formatDate(pagamento.dataVencimento)}</strong>
          </div>

          <div>
            <span>DATA DE PAGAMENTO</span>
            <strong>
              {pagamento.dataPagamento ? formatDate(pagamento.dataPagamento) : "—"}
            </strong>
          </div>

          <div>
            <span>FORMA DE PAGAMENTO</span>
            <strong>
              {getFormaPagamentoIcon(pagamento.formaPagamento)} {pagamento.formaPagamento}
            </strong>
          </div>

          <div>
            <span>PARCELA</span>
            <strong>{pagamento.parcela}</strong>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span>OBSERVAÇÕES</span>
            <strong style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {pagamento.observacoes || "Sem observações"}
            </strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      {pagamento.historico && pagamento.historico.length > 0 && (
        <div className={styles.timeline}>
          <h3>📜 Histórico do pagamento</h3>
          {pagamento.historico.map((item, index) => (
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

export default DetalhesPagamento;