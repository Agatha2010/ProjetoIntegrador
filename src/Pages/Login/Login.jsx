// Importa useNavigate, que permite mudar de página pelo código.(Mandar o usuario para outra pagina)
import { useNavigate } from "react-router-dom";

// Importa o CSS específico da tela de login.
import "./Login.css";

function Login() {

  // Cria a função responsável por navegar para outras páginas.
  const navigate = useNavigate();

  // Função executada quando o formulário é enviado.
  function handleLogin(event) {

    // Impede que a página recarregue ao enviar o formulário.
    event.preventDefault();

    // Como ainda não temos banco de dados,
    // o botão simplesmente leva para o Dashboard.
    navigate("/dashboard");
  }

  return (
    <div className="login-page">

{/* =========================
    LADO ESQUERDO
========================= */}

<div className="login-info">

  <div className="info-content">

    {/* Título da apresentação */}
    <h1>Bem-vindo!</h1>

    {/* Descrição do sistema */}
    <p>
Gerencie seus projetos ambientais de forma
rápida, ágil e intuitiva.
    </p>

    {/* Explicação da proposta */}
    <p>
Centralize clientes, licenças, protocolos,
prazos e atividades em um só lugar.
    </p>

  </div>

</div>

{/* =========================
    LADO DIREITO
========================= */}

<div className="login-form-area">

  <div className="login-card">

    {/* Logo e nome do sistema */}
    <div className="logo-area">

<div className="logo-placeholder">
  🌿
</div>

<h2>
  EcoGestão
</h2>

<span>
  Gestão ambiental
</span>

    </div>

    {/* Formulário de login */}
    <form onSubmit={handleLogin}>

{/* Campo de e-mail */}
<div className="input-group">

  <label>
    E-mail *
  </label>

  <input
    type="email"
    placeholder="Digite seu e-mail"
    required
  />

</div>

{/* Campo de senha */}
<div className="input-group">

  <label>
    Senha *
  </label>

  <input
    type="password"
    placeholder="Digite sua senha"
    required
  />

</div>

{/* Botão para entrar */}
<button type="submit">
  Entrar
</button>

{/* Link para recuperação de senha.
    A funcionalidade será feita depois. */}
<a
  href="#"
  className="forgot-password"
  onClick={(event) => event.preventDefault()}
>
  Esqueci minha senha
</a>

    </form>

  </div>

</div>

    </div>
  );
}

// Exporta a página de Login.
export default Login;