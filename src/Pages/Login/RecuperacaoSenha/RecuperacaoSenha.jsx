import { useNavigate } from "react-router-dom";
import styles from "./RecuperacaoSenha.module.css";

function RecuperacaoSenha() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha.");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🌐</div>
          <h1>EcoGestão</h1>
          <span>Gestão ambiental</span>
        </div>

        <h2>Esqueceu sua senha?</h2>
        <p className={styles.text}>
          Digite seu e-mail abaixo para recuperar o acesso à sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>E-mail *</label>
            <input type="email" placeholder="Digite seu e-mail" required />
          </div>
          <button type="submit" className={styles.button}>Recuperar senha</button>
        </form>

        <button type="button" className={styles.backButton} onClick={() => navigate("/login")}>
          ← Voltar para o login
        </button>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
