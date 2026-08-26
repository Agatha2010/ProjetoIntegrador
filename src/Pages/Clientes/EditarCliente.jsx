import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import "./Clientes.css";

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    try {
      const clientes =
        JSON.parse(localStorage.getItem("clientes")) || [];

      const encontrado = clientes.find(
        (cliente) => String(cliente.id) === String(id)
      );

      if (encontrado) {
        setForm(encontrado);
        setErro(false);
      } else {
        setErro(true);
      }
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const clientes =
        JSON.parse(localStorage.getItem("clientes")) || [];

      const novaLista = clientes.map((cliente) =>
        String(cliente.id) === String(id)
          ? { ...form, id: cliente.id }
          : cliente
      );

      localStorage.setItem(
        "clientes",
        JSON.stringify(novaLista)
      );

      navigate(`/clientes/${id}`);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Não foi possível salvar as alterações.");
    }
  }

  // Carregando
  if (carregando) {
    return (
      <div className="clientes-page">
        <div className="clientes-header">
          <div>
            <h1>Carregando cliente...</h1>
            <p>Aguarde enquanto os dados são carregados.</p>
          </div>
        </div>
      </div>
    );
  }

  // Cliente não encontrado
  if (erro || !form) {
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

            <h1>Cliente não encontrado</h1>

            <p>
              Não foi possível encontrar os dados desse cliente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="clientes-page">

      <div className="clientes-header">
        <div>

          <Link
            to={`/clientes/${id}`}
            className="back-button"
          >
            ← Cliente
          </Link>

          <h1>Editar cliente</h1>

          <p>
            Atualize os dados do cliente
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
                value={form.nome || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CNPJ *</label>

              <input
                type="text"
                name="cnpj"
                value={form.cnpj || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Responsável *</label>

              <input
                type="text"
                name="responsavel"
                value={form.responsavel || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>

              <input
                type="text"
                name="telefone"
                value={form.telefone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>

              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Endereço</label>

              <input
                type="text"
                name="endereco"
                value={form.endereco || ""}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-actions">

            <Link
              to={`/clientes/${id}`}
              className="cancel-button"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="save-button"
            >
              Salvar alterações
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditarCliente;