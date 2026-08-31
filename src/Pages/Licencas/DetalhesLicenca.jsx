import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Licencas.module.css";

function DetalhesLicenca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [licenca, setLicenca] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const licencas = [
      { id: 1, tipo: "Licença Ambiental", cliente: "Empresa Verde Ltda.", numero: "LA-2023-001", emissao: "2023-01-15", vencimento: "2024-01-15", status: "Ativo", diasRestantes: 45, descricao: "Licença para consultoria ambiental", orgao: "IBAMA", processo: "12345/2023" },
      { id: 2, tipo: "Licença de Operação", cliente: "AgroSul Ltda.", numero: "LO-2023-002", emissao: "2023-03-22", vencimento: "2024-03-22", status: "Ativo", diasRestantes: 78, descricao: "Licença para operação de produção", orgao: "FEPAM", processo: "23456/2023" },
    ];

    const encontrado = licencas.find((l) => l.id === Number(id));
    setLicenca(encontrado);
    setCarregando(false);
  }, [id]);

  const formatDate = (d) => {
    if (!d) return "Não informado";
    return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  };

  const getStatusClass = (s) => {
    switch (s) {
      case "Ativo": return "active";
      case "Vencendo": return "expiring";
      case "Vencida": return "expired";
      case "Pendente": return "pending";
      default: return "";
    }
  };

  if (carregando) {
    return <div className={styles.page}><div className={styles.header}><div><h1>Carregando...</h1></div></div></div>;
  }

  if (!licenca) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <Link to="/licencas" className={styles.backButton}>← Licenças</Link>
            <h1>Licença não encontrada</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/licencas" className={styles.backButton}>← Licenças</Link>
          <h1>{licenca.tipo}</h1>
          <p>Detalhes completos da licença</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to={`/licencas/${licenca.id}/editar`} className={styles.newButton}>✎ Editar</Link>
          <button className={styles.newButton} style={{ background: "white", color: "#b33a3a", border: "2px solid #fde8e8" }} onClick={() => { if (window.confirm("Remover?")) navigate("/licencas"); }}>��� Remover</button>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div className={styles.detailsAvatar}>👩‍💼</div>
        <div className={styles.detailsGrid}>
          <div><span>Tipo</span><strong>{licenca.tipo}</strong></div>
          <div><span>Cliente</span><strong>{licenca.cliente}</strong></div>
          <div><span>Número</span><strong>{licenca.numero}</strong></div>
          <div><span>Status</span><span className={`${styles.statusBadge} ${styles[getStatusClass(licenca.status)]}`}><span className={styles.dot}></span>{licenca.status}</span></div>
          <div><span>Emissão</span><strong>{formatDate(licenca.emissao)}</strong></div>
          <div><span>Vencimento</span><strong>{formatDate(licenca.vencimento)}</strong></div>
          <div><span>Órgão</span><strong>{licenca.orgao || "Não informado"}</strong></div>
          <div><span>Processo</span><strong>{licenca.processo || "Não informado"}</strong></div>
          <div style={{ gridColumn: "1 / -1" }}><span>Descrição</span><strong style={{ fontSize: "14px", fontWeight: 400 }}>{licenca.descricao || "Sem descrição"}</strong></div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesLicenca;
