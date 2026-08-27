// =====================================================
// IMPORTAÇÕES DO REACT ROUTER
// =====================================================

// BrowserRouter:
// Permite que o React controle a navegação entre as páginas.
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


// =====================================================
// IMPORTAÇÃO DAS PÁGINAS
// =====================================================

// Página de Login
import Login from "../Login/Login";

// Página principal do sistema
import Dashboard from "../Dashboard/Dashboard";


// =====================================================
// PÁGINAS DE CLIENTES
// =====================================================

// Lista de clientes
import Clientes from "../Clientes/Clientes";

// Formulário para cadastrar um novo cliente
import NovoCliente from "../Clientes/NovoCliente";

// Página com os detalhes de um cliente
import DetalhesCliente from "../Clientes/DetalhesCliente";

// Página para editar um cliente
import EditarCliente from "../Clientes/EditarCliente";

import RecuperarSenha from "../Login/RecuperacaoSenha/RecuperarSenha";
// =====================================================
// PÁGINA DE LICENÇAS
// =====================================================

// Lista de licenças
import Licencas from "../Licencas/Licencas";


// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

function App() {

  return (

    // BrowserRouter envolve todo o sistema
    // e permite a navegação entre as páginas.
    <BrowserRouter>

      {/* =================================================
          ROTAS DO SISTEMA
      ================================================= */}

        
      <Routes>


        {/* ===============================================
            ROTA INICIAL
        =============================================== */}

        {/* Quando o usuário entrar apenas em "/",
            ele será enviado para o Login. */}
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />


        {/* ===============================================
            LOGIN
        =============================================== */}

        {/* Endereço:
            http://localhost:5173/login
        */}
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/recuperar-senha"
         element={<RecuperarSenha />}
        />


        {/* ===============================================
            DASHBOARD
        =============================================== */}

        {/* Endereço:
            http://localhost:5173/dashboard
        */}
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />


        {/* ===============================================
            CLIENTES
        =============================================== */}

        {/* Página principal de clientes */}
        <Route
          path="/clientes"
          element={
            <Clientes />
          }
        />


        {/* Cadastro de novo cliente

            Quando clicar em:
            + Novo cliente

            será aberto:
            /novo-cliente
        */}
        <Route
          path="/novo-cliente"
          element={
            <NovoCliente />
          }
        />


        {/* ===============================================
            VISUALIZAR CLIENTE
        =============================================== */}

        {/*

          :id é um parâmetro da URL.

          Exemplo:

          /clientes/1
          /clientes/2
          /clientes/3

          Cada número representa um cliente diferente.
        */}

        <Route
          path="/clientes/:id"
          element={
            <DetalhesCliente />
          }
        />


        {/* ===============================================
            EDITAR CLIENTE
        =============================================== */}

        {/*

          Exemplo:

          /clientes/1/editar
          /clientes/2/editar

        */}

        <Route
          path="/clientes/:id/editar"
          element={
            <EditarCliente />
          }
        />


        {/* ===============================================
            LICENÇAS
        =============================================== */}

        {/* Página principal de licenças

            Endereço:
            /licencas
        */}

        <Route
          path="/licencas"
          element={
            <Licencas />
          }
        />


        {/* =================================================
            FUTURAS PÁGINAS
        =================================================

            Protocolos
            Agenda
            Pagamentos
            Configurações

            ainda não foram adicionadas aqui porque
            essas páginas ainda não foram criadas.
        */}


      </Routes>

    </BrowserRouter>
  );
}


// =====================================================
// EXPORTAÇÃO
// =====================================================

// Exporta o App para ser utilizado pelo main.jsx.
export default App;