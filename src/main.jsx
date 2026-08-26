// Importa o modo StrictMode do React.
// Ele ajuda a identificar possíveis problemas durante o desenvolvimento.
import { StrictMode } from "react";

// Importa a função responsável por renderizar o React na página.
import { createRoot } from "react-dom/client";

// Importa o CSS global do projeto.
import "./index.css";

// Importa o componente principal da aplicação.
import App from "./Pages/App/App.jsx";

// Cria a aplicação React e coloca dentro do elemento com id "root".
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);