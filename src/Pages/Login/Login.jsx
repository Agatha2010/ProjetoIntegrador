import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.infoContent}>
          <div className={styles.iconLarge}>🌳</div>
          <h1>EcoGestão</h1>
          <p>Sistema completo para gestão ambiental</p>
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <span className={styles.check}>✓</span>
              Gestão de licenças ambientais
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.check}>✓</span>
              Controle de clientes e protocolos
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.check}>✓</span>
              Agenda e vencimentos
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.logoArea}>
            <div className={styles.logoPlaceholder}>🌳</div>
            <h2>EcoGestão</h2>
            <span>Gestão ambiental</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div className={styles.options}>
              <label className={styles.rememberMe}>
                <input type="checkbox" /> Lembrar-me
              </label>
              <Link to="/recuperar-senha" className={styles.forgotPassword}>
                Esqueci a senha
              </Link>
            </div>

            <button type="submit" className={styles.button}>
              Entrar
            </button>
          </form>

          <div className={styles.footer}>
            <span>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
