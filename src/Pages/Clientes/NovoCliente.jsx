// Importa useState para controlar os campos do formulário.
import { useState } from "react";

// Importa Link e useNavigate para navegação.
import { Link, useNavigate } from "react-router-dom";

// Importa o CSS da página.
import "./Clientes.css";

function NovoCliente() {

  // Permite navegar para outra página depois de salvar.
  const navigate = useNavigate();

  // Guarda os dados preenchidos pelo usuário.
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    responsavel: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  // Atualiza o campo que foi alterado.
  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  // Salva o cliente.
  function handleSubmit(event) {
    event.preventDefault();

    // Pega os clientes já salvos.
    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    // Cria um novo cliente com um ID.
    const novoCliente = {
      id: Date.now(),
      ...form,
      status: "Ativo",
    };

    // Adiciona o novo cliente à lista.
    const novaLista = [
      ...clientesSalvos,
      novoCliente,
    ];

    // Salva a lista atualizada no navegador.
    localStorage.setItem(
      "clientes",
      JSON.stringify(novaLista)
    );

    // Volta para a página de clientes.
    navigate("/clientes");
  }

  return (
    <div className="clientes-page">

      <div className="clientes-header">

        <div>
 <Link
   to="/clientes"
   className="back-button"
 >
   ← Clientes
 </Link>

 <h1>Novo cliente</h1>

 <p>
   Cadastre um novo cliente no sistema
 </p>
        </div>

      </div>

      <div className="form-panel">

        <form onSubmit={handleSubmit}>

 <div className="form-grid">

   <div className="form-group">
     <label>Nome da empresa *</label>

     <input
       type="text"
       name="nome"
       value={form.nome}
       onChange={handleChange}
       placeholder="Digite o nome da empresa"
       required
     />
   </div>

   <div className="form-group">
     <label>CNPJ *</label>

     <input
       type="text"
       name="cnpj"
       value={form.cnpj}
       onChange={handleChange}
       placeholder="00.000.000/0000-00"
       required
     />
   </div>

   <div className="form-group">
     <label>Responsável *</label>

     <input
       type="text"
       name="responsavel"
       value={form.responsavel}
       onChange={handleChange}
       placeholder="Nome do responsável"
       required
     />
   </div>

   <div className="form-group">
     <label>Telefone</label>

     <input
       type="text"
       name="telefone"
       value={form.telefone}
       onChange={handleChange}
       placeholder="(00) 00000-0000"
     />
   </div>

   <div className="form-group">
     <label>E-mail</label>

     <input
       type="email"
       name="email"
       value={form.email}
       onChange={handleChange}
       placeholder="empresa@email.com"
     />
   </div>

   <div className="form-group">
     <label>Endereço</label>

     <input
       type="text"
       name="endereco"
       value={form.endereco}
       onChange={handleChange}
       placeholder="Endereço da empresa"
     />
   </div>

 </div>

 <div className="form-actions">

   <Link
     to="/clientes"
     className="cancel-button"
   >
     Cancelar
   </Link>

   <button
     type="submit"
     className="save-button"
   >
     Salvar cliente
   </button>

 </div>

        </form>

      </div>

    </div>
  );
}

export default NovoCliente;