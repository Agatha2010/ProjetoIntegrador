import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import RecuperacaoSenha from "./pages/Login/RecuperacaoSenha/RecuperacaoSenha";
import Clientes, { DetalhesCliente, EditarCliente, NovoCliente } from "./pages/Clientes";
import Licencas, { DetalhesLicenca, EditarLicenca, NovaLicenca } from "./pages/Licencas";
import Protocolos, { DetalhesProtocolo, EditarProtocolo, NovoProtocolo } from "./pages/Protocolos";
import Agenda, { DetalhesAgenda, EditarAgenda, NovaAgenda } from "./pages/Agenda";
import Pagamentos, { DetalhesPagamento, EditarPagamento, NovoPagamento } from "./pages/Pagamentos";
import Especies, { DetalhesEspecie, EditarEspecie, NovaEspecie } from "./pages/Especies";
import AnalisesFitossociologicas, { DetalhesAnalise, EditarAnalise, NovaAnalise } from "./pages/AnalisesFitossociologicas";
import Oficios, { DetalhesOficio, EditarOficio, NovoOficio } from "./pages/Oficios";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/perfil" element={<Perfil />} />
        
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
        
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/pagamentos/:id" element={<DetalhesPagamento />} />
        <Route path="/pagamentos/:id/editar" element={<EditarPagamento />} />
        <Route path="/novo-pagamento" element={<NovoPagamento />} />
        
        <Route path="/especies" element={<Especies />} />
        <Route path="/especies/:id" element={<DetalhesEspecie />} />
        <Route path="/especies/:id/editar" element={<EditarEspecie />} />
        <Route path="/nova-especie" element={<NovaEspecie />} />
        
        <Route path="/analises" element={<AnalisesFitossociologicas />} />
        <Route path="/analises/:id" element={<DetalhesAnalise />} />
        <Route path="/analises/:id/editar" element={<EditarAnalise />} />
        <Route path="/nova-analise" element={<NovaAnalise />} />
        
        <Route path="/oficios" element={<Oficios />} />
        <Route path="/oficios/:id" element={<DetalhesOficio />} />
        <Route path="/oficios/:id/editar" element={<EditarOficio />} />
        <Route path="/novo-oficio" element={<NovoOficio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;