import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    navigate("/recuperar-senha");
  }

  return (
    <div className="login-page">

      <div className="login-info">
        <div className="info-content">
          <h1>Bem-vindo!</h1>

          <p>
            Gerencie seus projetos ambientais de forma
            rápida, ágil e intuitiva.
          </p>

          <p>
            Centralize clientes, licenças, protocolos,
            prazos e atividades em um só lugar.
          </p>
        </div>
      </div>

      <div className="login-form-area">
        <div className="login-card">

          <div className="logo-area">
            <div className="logo-placeholder">
              🌿
            </div>

            <h2>EcoGestão</h2>

            <span>Gestão ambiental</span>
          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>E-mail *</label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="input-group">
              <label>Senha *</label>

              <input
                type="password"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <button type="submit">
              Entrar
            </button>

            <a
              href="#"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Esqueci minha senha
            </a>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;