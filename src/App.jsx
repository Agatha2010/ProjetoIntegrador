import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import RecuperacaoSenha from "./pages/Login/RecuperacaoSenha/RecuperacaoSenha";
import Clientes, { DetalhesCliente, EditarCliente, NovoCliente } from "./pages/Clientes";
import Licencas, { DetalhesLicenca, EditarLicenca, NovaLicenca } from "./pages/Licencas";
import Protocolos, { DetalhesProtocolo, EditarProtocolo, NovoProtocolo } from "./pages/Protocolos";
import Agenda, { DetalhesAgenda, EditarAgenda, NovaAgenda } from "./pages/Agenda";

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
        
        <Route path="/protocolos" element={<Protocolos />} />
        <Route path="/protocolos/:id" element={<DetalhesProtocolo />} />
        <Route path="/protocolos/:id/editar" element={<EditarProtocolo />} />
        <Route path="/novo-protocolo" element={<NovoProtocolo />} />
        
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/agenda/:id" element={<DetalhesAgenda />} />
        <Route path="/agenda/:id/editar" element={<EditarAgenda />} />
        <Route path="/nova-agenda" element={<NovaAgenda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;