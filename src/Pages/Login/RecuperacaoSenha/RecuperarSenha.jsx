import { useNavigate } from "react-router-dom";
import "./RecuperarSenha.css";

function RecuperacaoSenha() {
  const navigate = useNavigate();

  // Envia o formulário
  function handleRecuperacao(event) {
    event.preventDefault();

    // Por enquanto não temos banco de dados.
    // Apenas mostramos uma mensagem para o usuário.
    alert(
      "Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha."
    );
  }

  // Voltar para o Login
  function voltarLogin() {
    navigate("/");
  }

  return (
    <div className="recuperacao-page">

      <div className="recuperacao-card">

        {/* Logo */}
        <div className="recuperacao-logo">

          <div className="recuperacao-logo-icon">
            🌿
          </div>

          <h1>EcoGestão</h1>

          <span>
            Gestão ambiental
          </span>

        </div>

        {/* Título */}
        <h2>Esqueceu sua senha?</h2>

        <p className="recuperacao-texto">
          Não se preocupe! Digite seu e-mail abaixo
          para recuperar o acesso à sua conta.
        </p>

        {/* Formulário */}
        <form onSubmit={handleRecuperacao}>

          <div className="recuperacao-input-group">

            <label>
              E-mail *
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              required
            />

          </div>

          <button
            type="submit"
            className="recuperacao-button"
          >
            Recuperar senha
          </button>

        </form>

        {/* Voltar */}
        <button
          type="button"
          className="voltar-login"
          onClick={voltarLogin}
        >
          ← Voltar para o login
        </button>

      </div>

    </div>
  );
}

export default RecuperacaoSenha;