import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Perfil.module.css";

function Perfil() {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "Fulano de tal",
    tipoUsuario: "Técnico",
    cpf: "523103206-00",
    registroProfissional: "Registro profissional não informado",
    graduacao: "Graduação não informada",
    ctf: "CTF não informado",
    telefone: "(51) 023105210",
    email: "ecogestao.core@gmail.com",
    endereco: "Rua Antônio Galvão, 59, Petrópolis, Taquara/RS",
    empresaRazao: "Ecoeficiência Soluções Ambientais e Cursos LTDA",
    empresaFantasia: "Ecoeficiência",
    empresaCnpj: "09.664.224/0001-72",
    empresaEmail: "ciclanodetal.gov",
    empresaTelefone: "(51) 9 9891-4604",
    empresaEndereco: "r Antônio Galvão, 59, Petrópolis, Taquara/RS",
  });

  const permissoes = [
    { funcionalidade: "Análises fitossociológicas", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Calendário", criar: false, visualizar: true, editar: false, excluir: false },
    { funcionalidade: "Clientes", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Complementos", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Condicionantes", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Espécies", criar: false, visualizar: true, editar: false, excluir: false },
    { funcionalidade: "Licenças", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Ofícios", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Pagamentos", criar: true, visualizar: true, editar: true, excluir: true },
    { funcionalidade: "Protocolos", criar: true, visualizar: true, editar: true, excluir: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSave = () => {
    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>👤 Sua área</h1>
          <p>Aqui você encontra todas suas informações.</p>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.editButton}
            onClick={() => setModoEdicao(!modoEdicao)}
          >
            {modoEdicao ? "❌ Cancelar" : "✎ Editar perfil"}
          </button>
          {modoEdicao && (
            <button className={styles.saveButton} onClick={handleSave}>
              💾 Salvar
            </button>
          )}
        </div>
      </div>

      {/* AVATAR */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarLarge}>
          <span>{usuario.nome.charAt(0)}</span>
        </div>
        <div className={styles.avatarInfo}>
          <h2>{usuario.nome}</h2>
          <span className={styles.userType}>{usuario.tipoUsuario}</span>
        </div>
      </div>

      {/* INFORMAÇÕES DO USUÁRIO */}
      <div className={styles.infoGrid}>
        {/* Informações de usuário */}
        <div className={styles.infoCard}>
          <h3>👤 Informações de usuário</h3>
          <div className={styles.infoItem}>
            <span>Nome</span>
            {modoEdicao ? (
              <input
                type="text"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.nome}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Tipo de usuário</span>
            {modoEdicao ? (
              <select
                name="tipoUsuario"
                value={usuario.tipoUsuario}
                onChange={handleChange}
              >
                <option value="Administrador">Administrador</option>
                <option value="Técnico">Técnico</option>
                <option value="Gestor">Gestor</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            ) : (
              <strong>{usuario.tipoUsuario}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>CPF</span>
            {modoEdicao ? (
              <input
                type="text"
                name="cpf"
                value={usuario.cpf}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.cpf}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Registro Profissional</span>
            {modoEdicao ? (
              <input
                type="text"
                name="registroProfissional"
                value={usuario.registroProfissional}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.registroProfissional}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Graduação</span>
            {modoEdicao ? (
              <input
                type="text"
                name="graduacao"
                value={usuario.graduacao}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.graduacao}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>CTF</span>
            {modoEdicao ? (
              <input
                type="text"
                name="ctf"
                value={usuario.ctf}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.ctf}</strong>
            )}
          </div>
        </div>

        {/* Informações de contato */}
        <div className={styles.infoCard}>
          <h3>📞 Informações de contato</h3>
          <div className={styles.infoItem}>
            <span>Telefone</span>
            {modoEdicao ? (
              <input
                type="text"
                name="telefone"
                value={usuario.telefone}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.telefone}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>E-mail</span>
            {modoEdicao ? (
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.email}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Endereço</span>
            {modoEdicao ? (
              <input
                type="text"
                name="endereco"
                value={usuario.endereco}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.endereco}</strong>
            )}
          </div>
        </div>

        {/* Informações da empresa */}
        <div className={styles.infoCard}>
          <h3>🏢 Informações de empresa</h3>
          <div className={styles.infoItem}>
            <span>Razão social</span>
            {modoEdicao ? (
              <input
                type="text"
                name="empresaRazao"
                value={usuario.empresaRazao}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaRazao}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Nome fantasia</span>
            {modoEdicao ? (
              <input
                type="text"
                name="empresaFantasia"
                value={usuario.empresaFantasia}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaFantasia}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>CNPJ</span>
            {modoEdicao ? (
              <input
                type="text"
                name="empresaCnpj"
                value={usuario.empresaCnpj}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaCnpj}</strong>
            )}
          </div>
        </div>

        {/* Contato da empresa */}
        <div className={styles.infoCard}>
          <h3>📧 Contato da empresa</h3>
          <div className={styles.infoItem}>
            <span>E-mail</span>
            {modoEdicao ? (
              <input
                type="email"
                name="empresaEmail"
                value={usuario.empresaEmail}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaEmail}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Telefone</span>
            {modoEdicao ? (
              <input
                type="text"
                name="empresaTelefone"
                value={usuario.empresaTelefone}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaTelefone}</strong>
            )}
          </div>
          <div className={styles.infoItem}>
            <span>Endereço</span>
            {modoEdicao ? (
              <input
                type="text"
                name="empresaEndereco"
                value={usuario.empresaEndereco}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.empresaEndereco}</strong>
            )}
          </div>
        </div>
      </div>

      {/* PERMISSÕES */}
      <div className={styles.permissoesSection}>
        <h3>🔐 Suas permissões</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Funcionalidade</th>
                <th>Criar</th>
                <th>Visualizar</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {permissoes.map((item, index) => (
                <tr key={index}>
                  <td>{item.funcionalidade}</td>
                  <td>
                    <span className={item.criar ? styles.permissaoTrue : styles.permissaoFalse}>
                      {item.criar ? "✔" : "—"}
                    </span>
                  </td>
                  <td>
                    <span className={item.visualizar ? styles.permissaoTrue : styles.permissaoFalse}>
                      {item.visualizar ? "✔" : "—"}
                    </span>
                  </td>
                  <td>
                    <span className={item.editar ? styles.permissaoTrue : styles.permissaoFalse}>
                      {item.editar ? "✔" : "—"}
                    </span>
                  </td>
                  <td>
                    <span className={item.excluir ? styles.permissaoTrue : styles.permissaoFalse}>
                      {item.excluir ? "✔" : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Perfil;