import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import RecuperacaoSenha from "./pages/Login/RecuperacaoSenha/RecuperacaoSenha";
import Clientes, { DetalhesCliente, EditarCliente, NovoCliente } from "./pages/Clientes";
import Licencas, { DetalhesLicenca, EditarLicenca, NovaLicenca } from "./pages/Licencas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/:id" element={<DetalhesCliente />} />
        <Route path="/clientes/:id/editar" element={<EditarCliente />} />
        <Route path="/novo-cliente" element={<NovoCliente />} />
        <Route path="/licencas" element={<Licencas />} />
        <Route path="/licencas/:id" element={<DetalhesLicenca />} />
        <Route path="/licencas/:id/editar" element={<EditarLicenca />} />
        <Route path="/nova-licenca" element={<NovaLicenca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
