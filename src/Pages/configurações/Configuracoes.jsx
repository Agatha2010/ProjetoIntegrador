import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Configuracoes.module.css";

function Configuracoes() {
  const [abaAtiva, setAbaAtiva] = useState("geral");
  const [salvando, setSalvando] = useState(false);

  // Configurações Gerais
  const [geral, setGeral] = useState({
    nomeEmpresa: "Gestão Ambiental",
    emailEmpresa: "contato@gestaoambiental.com.br",
    telefone: "(51) 99999-9999",
    site: "www.gestaoambiental.com.br",
    endereco: "Rua Antônio Galvão, 59, Petrópolis, Taquara/RS",
    cnpj: "09.664.224/0001-72",
    logo: "🌿",
  });

  // Configurações de Notificações
  const [notificacoes, setNotificacoes] = useState({
    emailVencimento: true,
    diasAntecedencia: 30,
    emailPagamento: true,
    emailProtocolo: true,
    resumoDiario: false,
    resumoSemanal: true,
  });

  // Configurações de Segurança
  const [seguranca, setSeguranca] = useState({
    autenticacao2FA: false,
    sessaoExpiracao: 60,
    tentativasLogin: 5,
    bloqueioAutomatico: true,
  });

  // Alterar Senha
  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmar: "",
  });

  const handleSalvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      alert("✅ Configurações salvas com sucesso!");
    }, 1000);
  };

  const handleAlterarSenha = (e) => {
    e.preventDefault();
    if (senha.nova !== senha.confirmar) {
      alert("❌ As senhas não coincidem!");
      return;
    }
    if (senha.nova.length < 6) {
      alert("❌ A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    alert("✅ Senha alterada com sucesso!");
    setSenha({ atual: "", nova: "", confirmar: "" });
  };

  const handleExportar = () => {
    alert("📥 Exportando dados...");
  };

  const handleBackup = () => {
    alert("💾 Criando backup do banco de dados...");
  };

  return (
    <div className={styles.page}>
      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div>
          <Link to="/dashboard" className={styles.backButton}>
            ← Dashboard
          </Link>
          <h1>⚙️ Configurações</h1>
          <p>Gerencie as configurações do sistema</p>
        </div>
        <button className={styles.saveButton} onClick={handleSalvar} disabled={salvando}>
          {salvando ? "💾 Salvando..." : "💾 Salvar alterações"}
        </button>
      </div>

      {/* ABAS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${abaAtiva === "geral" ? styles.active : ""}`}
          onClick={() => setAbaAtiva("geral")}
        >
          🏢 Geral
        </button>
        <button
          className={`${styles.tab} ${abaAtiva === "notificacoes" ? styles.active : ""}`}
          onClick={() => setAbaAtiva("notificacoes")}
        >
          🔔 Notificações
        </button>
        <button
          className={`${styles.tab} ${abaAtiva === "seguranca" ? styles.active : ""}`}
          onClick={() => setAbaAtiva("seguranca")}
        >
          🔒 Segurança
        </button>
        <button
          className={`${styles.tab} ${abaAtiva === "backup" ? styles.active : ""}`}
          onClick={() => setAbaAtiva("backup")}
        >
          💾 Backup
        </button>
        <button
          className={`${styles.tab} ${abaAtiva === "sobre" ? styles.active : ""}`}
          onClick={() => setAbaAtiva("sobre")}
        >
          ℹ️ Sobre
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className={styles.content}>
        {/* ABA GERAL */}
        {abaAtiva === "geral" && (
          <div className={styles.section}>
            <h2>🏢 Informações da Empresa</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Nome da empresa</label>
                <input
                  type="text"
                  value={geral.nomeEmpresa}
                  onChange={(e) => setGeral({ ...geral, nomeEmpresa: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>CNPJ</label>
                <input
                  type="text"
                  value={geral.cnpj}
                  onChange={(e) => setGeral({ ...geral, cnpj: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input
                  type="email"
                  value={geral.emailEmpresa}
                  onChange={(e) => setGeral({ ...geral, emailEmpresa: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input
                  type="text"
                  value={geral.telefone}
                  onChange={(e) => setGeral({ ...geral, telefone: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Site</label>
                <input
                  type="text"
                  value={geral.site}
                  onChange={(e) => setGeral({ ...geral, site: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Logo (emoji)</label>
                <input
                  type="text"
                  value={geral.logo}
                  onChange={(e) => setGeral({ ...geral, logo: e.target.value })}
                  maxLength={2}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Endereço</label>
                <input
                  type="text"
                  value={geral.endereco}
                  onChange={(e) => setGeral({ ...geral, endereco: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* ABA NOTIFICAÇÕES */}
        {abaAtiva === "notificacoes" && (
          <div className={styles.section}>
            <h2>🔔 Configurações de Notificações</h2>
            <div className={styles.toggleList}>
              <div className={styles.toggleItem}>
                <div>
                  <strong>Notificações por e-mail</strong>
                  <span>Receber notificações por e-mail</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificacoes.emailVencimento}
                    onChange={(e) => setNotificacoes({ ...notificacoes, emailVencimento: e.target.checked })}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <div>
                  <strong>Dias de antecedência</strong>
                  <span>Quantos dias antes avisar sobre vencimentos</span>
                </div>
                <input
                  type="number"
                  className={styles.numberInput}
                  value={notificacoes.diasAntecedencia}
                  onChange={(e) => setNotificacoes({ ...notificacoes, diasAntecedencia: e.target.value })}
                  min="1"
                  max="90"
                />
              </div>

              <div className={styles.toggleItem}>
                <div>
                  <strong>Alertas de pagamento</strong>
                  <span>Notificar sobre pagamentos pendentes</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificacoes.emailPagamento}
                    onChange={(e) => setNotificacoes({ ...notificacoes, emailPagamento: e.target.checked })}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <div>
                  <strong>Alertas de protocolo</strong>
                  <span>Notificar sobre novos protocolos</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificacoes.emailProtocolo}
                    onChange={(e) => setNotificacoes({ ...notificacoes, emailProtocolo: e.target.checked })}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <div>
                  <strong>Resumo diário</strong>
                  <span>Receber resumo das atividades do dia</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificacoes.resumoDiario}
                    onChange={(e) => setNotificacoes({ ...notificacoes, resumoDiario: e.target.checked })}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <div>
                  <strong>Resumo semanal</strong>
                  <span>Receber resumo das atividades da semana</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificacoes.resumoSemanal}
                    onChange={(e) => setNotificacoes({ ...notificacoes, resumoSemanal: e.target.checked })}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ABA SEGURANÇA */}
        {abaAtiva === "seguranca" && (
          <div className={styles.section}>
            <h2>🔒 Segurança</h2>

            <div className={styles.subSection}>
              <h3>Alterar Senha</h3>
              <form onSubmit={handleAlterarSenha} className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Senha atual</label>
                  <input
                    type="password"
                    value={senha.atual}
                    onChange={(e) => setSenha({ ...senha, atual: e.target.value })}
                    placeholder="Digite sua senha atual"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nova senha</label>
                  <input
                    type="password"
                    value={senha.nova}
                    onChange={(e) => setSenha({ ...senha, nova: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirmar nova senha</label>
                  <input
                    type="password"
                    value={senha.confirmar}
                    onChange={(e) => setSenha({ ...senha, confirmar: e.target.value })}
                    placeholder="Repita a nova senha"
                    required
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <button type="submit" className={styles.actionButton}>
                    🔑 Alterar senha
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.subSection}>
              <h3>Configurações de Segurança</h3>
              <div className={styles.toggleList}>
                <div className={styles.toggleItem}>
                  <div>
                    <strong>Autenticação em dois fatores</strong>
                    <span>Adicionar camada extra de segurança</span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={seguranca.autenticacao2FA}
                      onChange={(e) => setSeguranca({ ...seguranca, autenticacao2FA: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <strong>Bloqueio automático</strong>
                    <span>Bloquear após várias tentativas</span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={seguranca.bloqueioAutomatico}
                      onChange={(e) => setSeguranca({ ...seguranca, bloqueioAutomatico: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <strong>Expiração da sessão (minutos)</strong>
                    <span>Tempo para expirar a sessão</span>
                  </div>
                  <input
                    type="number"
                    className={styles.numberInput}
                    value={seguranca.sessaoExpiracao}
                    onChange={(e) => setSeguranca({ ...seguranca, sessaoExpiracao: e.target.value })}
                    min="5"
                    max="480"
                  />
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <strong>Tentativas de login</strong>
                    <span>Máximo de tentativas antes do bloqueio</span>
                  </div>
                  <input
                    type="number"
                    className={styles.numberInput}
                    value={seguranca.tentativasLogin}
                    onChange={(e) => setSeguranca({ ...seguranca, tentativasLogin: e.target.value })}
                    min="3"
                    max="10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA BACKUP */}
        {abaAtiva === "backup" && (
          <div className={styles.section}>
            <h2>💾 Backup e Dados</h2>
            <div className={styles.backupGrid}>
              <div className={styles.backupCard}>
                <div className={styles.backupIcon}>📥</div>
                <h3>Exportar Dados</h3>
                <p>Exportar todos os dados do sistema em formato Excel/CSV</p>
                <button className={styles.actionButton} onClick={handleExportar}>
                  📥 Exportar
                </button>
              </div>

              <div className={styles.backupCard}>
                <div className={styles.backupIcon}>💾</div>
                <h3>Criar Backup</h3>
                <p>Criar uma cópia de segurança do banco de dados</p>
                <button className={styles.actionButton} onClick={handleBackup}>
                  💾 Criar backup
                </button>
              </div>

              <div className={styles.backupCard}>
                <div className={styles.backupIcon}>📤</div>
                <h3>Importar Dados</h3>
                <p>Importar dados de um arquivo externo</p>
                <button className={styles.actionButton}>
                  📤 Importar
                </button>
              </div>

              <div className={styles.backupCard}>
                <div className={styles.backupIcon}>🗑️</div>
                <h3>Limpar Dados</h3>
                <p>Remover dados antigos do sistema</p>
                <button className={`${styles.actionButton} ${styles.danger}`}>
                  🗑️ Limpar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ABA SOBRE */}
        {abaAtiva === "sobre" && (
          <div className={styles.section}>
            <h2>ℹ️ Sobre o Sistema</h2>
            <div className={styles.aboutContent}>
              <div className={styles.aboutLogo}>🌿</div>
              <h3>Gestão Ambiental</h3>
              <p className={styles.version}>Versão 1.0.0</p>
              <p>Sistema completo para gestão ambiental</p>

              <div className={styles.aboutInfo}>
                <div className={styles.aboutItem}>
                  <span>📦 Versão</span>
                  <strong>1.0.0</strong>
                </div>
                <div className={styles.aboutItem}>
                  <span>👨‍💻 Desenvolvedor</span>
                  <strong>Agatha Seimetz da Costa</strong>
                </div>
                <div className={styles.aboutItem}>
                  <span>📅 Ano</span>
                  <strong>2026</strong>
                </div>
                <div className={styles.aboutItem}>
                  <span>🔧 Tecnologias</span>
                  <strong>React + Firebase</strong>
                </div>
                <div className={styles.aboutItem}>
                  <span>📧 Contato</span>
                  <strong>contato@gestaoambiental.com.br</strong>
                </div>
              </div>

              <div className={styles.aboutLinks}>
                <Link to="/dashboard">📊 Dashboard</Link>
                <Link to="/perfil">👤 Perfil</Link>
                <a href="#">📄 Termos de Uso</a>
                <a href="#">🔒 Política de Privacidade</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Configuracoes;