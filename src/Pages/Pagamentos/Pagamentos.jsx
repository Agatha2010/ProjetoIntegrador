import { Link } from "react-router-dom";
import styles from "./Pagamentos.module.css";

function Pagamentos() {
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
      observacoes: "Aguardando pagamento",
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
      observacoes: "Pagamento confirmado",
    },
    {
      id: 3,
      cliente: "Indústria Sustentável S.A.",
      descricao: "Licença Prévia - LP-2023-003",
      valor: 3200.00,
      dataVencimento: "2024-09-01",
      dataPagamento: null,
      status: "Atrasado",
      formaPagamento: "Boleto",
      parcela: "2/4",
      observacoes: "Pagamento em atraso",
    },
    {
      id: 4,
      cliente: "Eco Norte Comércio",
      descricao: "Licença de Instalação - LI-2023-004",
      valor: 1500.00,
      dataVencimento: "2024-09-10",
      dataPagamento: "2024-09-08",
      status: "Pago",
      formaPagamento: "Cartão de Crédito",
      parcela: "1/2",
      observacoes: "Pagamento realizado com cartão",
    },
    {
      id: 5,
      cliente: "BioEnergia do Brasil",
      descricao: "Licença Ambiental - LA-2023-005",
      valor: 4200.00,
      dataVencimento: "2024-09-15",
      dataPagamento: null,
      status: "Pendente",
      formaPagamento: "Boleto",
      parcela: "3/6",
      observacoes: "Aguardando segunda via",
    },
    {
      id: 6,
      cliente: "ReciclaMais Indústrias",
      descricao: "Licença de Operação - LO-2023-006",
      valor: 2800.00,
      dataVencimento: "2024-09-20",
      dataPagamento: "2024-09-19",
      status: "Pago",
      formaPagamento: "PIX",
      parcela: "Única",
      observacoes: "Pagamento via PIX confirmado",
    },
    {
      id: 7,
      cliente: "Verde Campo Agropecuária",
      descricao: "Licença Prévia - LP-2023-007",
      valor: 2200.00,
      dataVencimento: "2024-09-25",
      dataPagamento: null,
      status: "Pendente",
      formaPagamento: "Boleto",
      parcela: "1/3",
      observacoes: "Boleto enviado",
    },
    {
      id: 8,
      cliente: "EcoTech Soluções",
      descricao: "Licença de Operação - LO-2023-008",
      valor: 3500.00,
      dataVencimento: "2024-09-28",
      dataPagamento: "2024-09-27",
      status: "Pago",
      formaPagamento: "Transferência",
      parcela: "Única",
      observacoes: "Pagamento confirmado",
    },
  ];

  // Estatísticas
  const total = pagamentos.length;
  const totalPago = pagamentos.filter(p => p.status === "Pago").length;
  const totalPendente = pagamentos.filter(p => p.status === "Pendente").length;
  const totalAtrasado = pagamentos.filter(p => p.status === "Atrasado").length;
  const totalCancelado = pagamentos.filter(p => p.status === "Cancelado").length;

  const valorTotal = pagamentos.reduce((acc, p) => acc + p.valor, 0);
  const valorPago = pagamentos
    .filter(p => p.status === "Pago")
    .reduce((acc, p) => acc + p.valor, 0);
  const valorPendente = pagamentos
    .filter(p => p.status === "Pendente" || p.status === "Atrasado")
    .reduce((acc, p) => acc + p.valor, 0);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
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

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>💰 Pagamentos</h1>
          <p>Gerencie todos os pagamentos do sistema</p>
        </div>
        <Link to="/novo-pagamento" className={styles.newButton}>
          + Novo pagamento
        </Link>
      </div>

      {/* CARDS DE RESUMO */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>📊</span>
            <span className={styles.cardLabel}>Total de pagamentos</span>
          </div>
          <strong>{total}</strong>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>✅</span>
            <span className={styles.cardLabel}>Pagos</span>
          </div>
          <strong>
            {totalPago}
            <span className={`${styles.trend} ${styles.up}`}>↑ 15%</span>
          </strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.warning}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>⏳</span>
            <span className={styles.cardLabel}>Pendentes</span>
          </div>
          <strong>{totalPendente}</strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.danger}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>🔴</span>
            <span className={styles.cardLabel}>Atrasados</span>
          </div>
          <strong>{totalAtrasado}</strong>
        </div>
      </div>

      {/* CARDS DE VALORES */}
      <div className={styles.valoresSummary}>
        <div className={styles.valorCard}>
          <span className={styles.valorLabel}>💰 Valor Total</span>
          <strong className={styles.valorTotal}>{formatCurrency(valorTotal)}</strong>
        </div>
        <div className={styles.valorCard}>
          <span className={styles.valorLabel}>✅ Valor Pago</span>
          <strong className={styles.valorPago}>{formatCurrency(valorPago)}</strong>
        </div>
        <div className={styles.valorCard}>
          <span className={styles.valorLabel}>⏳ Valor Pendente</span>
          <strong className={styles.valorPendente}>{formatCurrency(valorPendente)}</strong>
        </div>
        <div className={styles.valorCard}>
          <span className={styles.valorLabel}>📊 Taxa de Conformidade</span>
          <strong className={styles.valorConformidade}>
            {total > 0 ? Math.round((totalPago / total) * 100) : 0}%
          </strong>
        </div>
      </div>

      {/* TABELA */}
      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input type="text" placeholder="Buscar pagamento..." />
          </div>
          <div className={styles.toolbarRight}>
            <select>
              <option>Todos os status</option>
              <option>Pago</option>
              <option>Pendente</option>
              <option>Atrasado</option>
              <option>Cancelado</option>
            </select>
            <select>
              <option>Todas as formas</option>
              <option>Boleto</option>
              <option>Transferência</option>
              <option>Cartão de Crédito</option>
              <option>PIX</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Pagamento</th>
                <th>Forma</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pagamento) => (
                <tr key={pagamento.id}>
                  <td>
                    <div className={styles.clienteNome}>
                      <div className={styles.clienteAvatar}>
                        {pagamento.cliente.charAt(0)}
                      </div>
                      <strong>{pagamento.cliente}</strong>
                    </div>
                  </td>
                  <td>{pagamento.descricao}</td>
                  <td className={styles.valorColuna}>
                    <strong>{formatCurrency(pagamento.valor)}</strong>
                    <span className={styles.parcela}>{pagamento.parcela}</span>
                  </td>
                  <td className={styles.dataVencimento}>
                    {formatDate(pagamento.dataVencimento)}
                  </td>
                  <td>
                    {pagamento.dataPagamento ? (
                      <span className={styles.dataPaga}>
                        ✅ {formatDate(pagamento.dataPagamento)}
                      </span>
                    ) : (
                      <span className={styles.naoPaga}>—</span>
                    )}
                  </td>
                  <td>
                    <span className={styles.formaPagamento}>
                      {getFormaPagamentoIcon(pagamento.formaPagamento)}
                      {pagamento.formaPagamento}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[getStatusClass(pagamento.status)]}`}>
                      <span className={styles.dot}></span>
                      {getStatusIcon(pagamento.status)} {pagamento.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        to={`/pagamentos/${pagamento.id}`}
                        className={`${styles.actionBtn} ${styles.view}`}
                        title="Visualizar pagamento"
                      >
                        👁
                      </Link>
                      <Link
                        to={`/pagamentos/${pagamento.id}/editar`}
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Editar pagamento"
                      >
                        ✎
                      </Link>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Remover pagamento"
                        onClick={() => {
                          if (window.confirm(`Deseja realmente remover este pagamento?`)) {
                            alert("Pagamento removido com sucesso!");
                          }
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            <span>Mostrando 8 de 24 pagamentos</span>
            <select>
              <option>10 por página</option>
              <option>25 por página</option>
              <option>50 por página</option>
            </select>
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>‹</button>
            <button className={styles.currentPage}>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagamentos;