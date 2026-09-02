import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Pagamentos.module.css";

function EditarPagamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

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
        observacoes: "Pagamento confirmado.",
      },
    ];

    const encontrado = pagamentos.find((p) => p.id === Number(id));
    setForm(encontrado);
    setCarregando(false);
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((dados) => ({
      ...dados,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      navigate(`/pagamentos/${id}`);
    }, 1000);
  }

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/pagamentos" className={styles.backButton}>← Pagamentos</Link>
            <h1>Pagamento não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to={`/pagamentos/${id}`} className={styles.backButton}>← Pagamento</Link>
          <h1>✎ Editar pagamento</h1>
          <p>Atualize os dados do pagamento</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input type="text" name="cliente" value={form.cliente || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Descrição *</label>
              <input type="text" name="descricao" value={form.descricao || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Valor *</label>
              <input type="number" name="valor" value={form.valor || ""} onChange={handleChange} step="0.01" required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status || ""} onChange={handleChange}>
                <option value="Pago">✅ Pago</option>
                <option value="Pendente">⏳ Pendente</option>
                <option value="Atrasado">🔴 Atrasado</option>
                <option value="Cancelado">❌ Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data de vencimento *</label>
              <input type="date" name="dataVencimento" value={form.dataVencimento || ""} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Data de pagamento</label>
              <input type="date" name="dataPagamento" value={form.dataPagamento || ""} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Forma de pagamento *</label>
              <select name="formaPagamento" value={form.formaPagamento || ""} onChange={handleChange} required>
                <option value="Boleto">📄 Boleto</option>
                <option value="Transferência">🏦 Transferência</option>
                <option value="Cartão de Crédito">💳 Cartão de Crédito</option>
                <option value="PIX">⚡ PIX</option>
                <option value="Dinheiro">💰 Dinheiro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Parcela</label>
              <input type="text" name="parcela" value={form.parcela || ""} onChange={handleChange} placeholder="Ex: 1/3, Única" />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea name="observacoes" value={form.observacoes || ""} onChange={handleChange} rows="3" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to={`/pagamentos/${id}`} className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPagamento;