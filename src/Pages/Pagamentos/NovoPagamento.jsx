import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Pagamentos.module.css";

function NovoPagamento() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    cliente: "",
    descricao: "",
    valor: "",
    dataVencimento: hoje,
    dataPagamento: "",
    status: "Pendente",
    formaPagamento: "Boleto",
    parcela: "Única",
    observacoes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);

    setTimeout(() => {
      const pagamentosSalvos = JSON.parse(localStorage.getItem("pagamentos")) || [];

      const novoPagamento = {
        id: Date.now(),
        ...form,
        valor: parseFloat(form.valor) || 0,
        historico: [
          {
            data: new Date().toISOString().split("T")[0],
            evento: "Pagamento cadastrado",
          },
        ],
      };

      const novaLista = [...pagamentosSalvos, novoPagamento];
      localStorage.setItem("pagamentos", JSON.stringify(novaLista));

      setSalvando(false);
      navigate("/pagamentos");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/pagamentos" className={styles.backButton}>← Pagamentos</Link>
          <h1>➕ Novo pagamento</h1>
          <p>Cadastre um novo pagamento no sistema</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input type="text" name="cliente" value={form.cliente} onChange={handleChange} placeholder="Nome do cliente" required />
            </div>

            <div className={styles.formGroup}>
              <label>Descrição *</label>
              <input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição do pagamento" required />
            </div>

            <div className={styles.formGroup}>
              <label>Valor *</label>
              <input type="number" name="valor" value={form.valor} onChange={handleChange} placeholder="0,00" step="0.01" required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Pago">✅ Pago</option>
                <option value="Pendente">⏳ Pendente</option>
                <option value="Atrasado">🔴 Atrasado</option>
                <option value="Cancelado">❌ Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data de vencimento *</label>
              <input type="date" name="dataVencimento" value={form.dataVencimento} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Data de pagamento</label>
              <input type="date" name="dataPagamento" value={form.dataPagamento} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Forma de pagamento *</label>
              <select name="formaPagamento" value={form.formaPagamento} onChange={handleChange} required>
                <option value="Boleto">📄 Boleto</option>
                <option value="Transferência">🏦 Transferência</option>
                <option value="Cartão de Crédito">💳 Cartão de Crédito</option>
                <option value="PIX">⚡ PIX</option>
                <option value="Dinheiro">💰 Dinheiro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Parcela</label>
              <input type="text" name="parcela" value={form.parcela} onChange={handleChange} placeholder="Ex: 1/3, Única" />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observações</label>
              <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações adicionais..." rows="3" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link to="/pagamentos" className={styles.cancelButton}>❌ Cancelar</Link>
            <button type="submit" className={styles.saveButton} disabled={salvando}>
              {salvando ? "💾 Salvando..." : "💾 Salvar pagamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoPagamento;