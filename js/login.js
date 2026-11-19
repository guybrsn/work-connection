// Inicializa os ícones da biblioteca Lucide
lucide.createIcons();

// Elementos da página
const btnGoogleLogin = document.getElementById('btnGoogleLogin');
const btnEmailToggle = document.getElementById('btnEmailToggle');
const btnHeaderLogin = document.getElementById('btnHeaderLogin');
const emailForm = document.getElementById('emailForm');
const toast = document.getElementById('toast');

// Função para exibir mensagem rápida na tela
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Simula login e redireciona para a tela de Serviços Disponíveis
function realizarLogin(usuario, perfil) {
  const dadosSessao = {
    nome: usuario,
    perfil: perfil,
    logadoEm: new Date().toISOString()
  };

  localStorage.setItem('usuarioLogado', JSON.stringify(dadosSessao));
  showToast(`Bem-vindo(a), ${usuario}! Redirecionando...`);

  // Redireciona para a próxima tela (que criaremos no próximo passo)
  setTimeout(() => {
    window.location.href = 'servicos.html';
  }, 1200);
}

// Clique em "Entrar com Google"
btnGoogleLogin.addEventListener('click', () => {
  realizarLogin('Usuário Google', 'tecnico');
});

// Clique em "Continuar com e-mail" abre o formulário
btnEmailToggle.addEventListener('click', () => {
  emailForm.classList.toggle('hidden');
  if (!emailForm.classList.contains('hidden')) {
    document.getElementById('userEmail').focus();
  }
});

// Clique no botão "Entrar" do cabeçalho também abre o formulário e rola até ele
btnHeaderLogin.addEventListener('click', () => {
  emailForm.classList.remove('hidden');
  emailForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('userEmail').focus();
});

// Envio do formulário de e-mail
emailForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('userEmail').value.trim();
  const tipo = document.getElementById('userType').value;

  if (!email) {
    showToast('Por favor, digite um e-mail válido.');
    return;
  }

  const nomeExtraido = email.split('@')[0];
  realizarLogin(nomeExtraido, tipo);
});

const btnCadastro = document.getElementById('btnEmailToggle'); // ou o ID do seu botão Cadastre-se
if (btnCadastro) {
  btnCadastro.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
  });
}
