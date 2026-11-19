// ================= MAPA DE NOMES DAS ÁREAS =================
const nomesAreas = {
  'ti-redes': 'Suporte de TI, Computadores e Redes',
  'eletrica': 'Instalações e Manutenção Elétrica',
  'refrigeracao': 'Ar-Condicionado e Refrigeração',
  'seguranca': 'CFTV, Câmeras e Segurança Eletrônica',
  'hidraulica': 'Manutenção Hidráulica e Predial',
  'automacao': 'Automação Residencial / Comercial',
  'outros': 'Especialista Técnico'
};

const nomesExperiencia = {
  'iniciante': 'Menos de 1 ano',
  '1-3': '1 a 3 anos',
  '3-5': '3 a 5 anos',
  '5+': 'Mais de 5 anos'
};

// Elementos da tela
const inputFotoPerfil = document.getElementById('inputFotoPerfil');
const fotoPerfilImg = document.getElementById('fotoPerfilImg');
const avatarIniciais = document.getElementById('avatarIniciais');

const formEditarPerfil = document.getElementById('formEditarPerfil');
const btnSairConta = document.getElementById('btnSairConta');
const btnToggleEditar = document.getElementById('btnToggleEditar');
const btnAddTagPerfil = document.getElementById('btnAddTagPerfil');
const editNovoServico = document.getElementById('editNovoServico');
const toast = document.getElementById('toast');

let usuarioAtual = null;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Carrega dados do localStorage (ou cria padrão se abrir direto)
function inicializarPerfil() {
  const salvo = localStorage.getItem('usuarioLogado');
  if (salvo) {
    usuarioAtual = JSON.parse(salvo);
  } else {
    usuarioAtual = {
      nome: 'Técnico Work Connection',
      email: 'tecnico@workconnection.com.br',
      telefone: '(65) 99999-0000',
      cidade: 'Cuiabá - MT',
      perfil: 'tecnico',
      areaAtuacao: 'ti-redes',
      tempoExperiencia: '1-3',
      servicosRealizados: ['Formatação de Computadores', 'Configuração de Redes Wi-Fi'],
      resumoExperiencia: 'Profissional dedicado a atendimento técnico rápido em residências e empresas.',
      foto: ''
    };
  }

  atualizarInterface();
  preencherFormulario();
}

// Atualiza visual do perfil (estilo LinkedIn)
function atualizarInterface() {
  const nome = usuarioAtual.nome || 'Usuário';
  document.getElementById('displayNome').textContent = nome;
  document.getElementById('displayEmail').textContent = usuarioAtual.email || '';
  document.getElementById('displayTelefone').textContent = usuarioAtual.telefone || 'Telefone não informado';
  document.getElementById('displayCidade').textContent = usuarioAtual.cidade || 'Cuiabá - MT';

  const areaTexto = nomesAreas[usuarioAtual.areaAtuacao] || 'Prestador de Serviços Técnicos';
  document.getElementById('displayTituloProfissional').textContent = `${areaTexto} • Work Connection`;
  document.getElementById('displayArea').textContent = areaTexto;
  document.getElementById('displayTempoExp').textContent = nomesExperiencia[usuarioAtual.tempoExperiencia] || 'Experiência verificada';

  document.getElementById('badgePerfilTipo').textContent =
    usuarioAtual.perfil === 'cliente' ? 'Cliente / Empresa' : 'Técnico Verificado';

  document.getElementById('displayResumo').textContent =
    usuarioAtual.resumoExperiencia || 'Nenhuma descrição informada ainda.';

  // Foto ou Iniciais
    // Foto ou Ícone SVG de Usuário
  if (usuarioAtual.foto) {
    fotoPerfilImg.src = usuarioAtual.foto;
    fotoPerfilImg.classList.remove('hidden');
    avatarIniciais.classList.add('hidden');
  } else {
    avatarIniciais.classList.remove('hidden');
    fotoPerfilImg.classList.add('hidden');
  }


  renderizarTags();
}

// Preenche campos do formulário de edição
function preencherFormulario() {
  document.getElementById('editNome').value = usuarioAtual.nome || '';
  document.getElementById('editEmail').value = usuarioAtual.email || '';
  document.getElementById('editTelefone').value = usuarioAtual.telefone || '';
  document.getElementById('editCidade').value = usuarioAtual.cidade || '';
  document.getElementById('editArea').value = usuarioAtual.areaAtuacao || 'ti-redes';
  document.getElementById('editTempoExp').value = usuarioAtual.tempoExperiencia || '1-3';
  document.getElementById('editResumo').value = usuarioAtual.resumoExperiencia || '';
}

// Renderiza lista de serviços já realizados com botão de remover
function renderizarTags() {
  const container = document.getElementById('displayTagsServicos');
  container.innerHTML = '';

  const lista = usuarioAtual.servicosRealizados || [];
  if (lista.length === 0) {
    container.innerHTML = '<p style="font-size:0.88rem; color:#52525b;">Nenhum serviço listado ainda. Adicione no formulário ao lado.</p>';
    return;
  }

  lista.forEach((item, index) => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerHTML = `
      ${item}
      <button type="button" title="Remover" data-index="${index}">&times;</button>
    `;
    container.appendChild(tag);
  });

  container.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = Number(e.target.dataset.index);
      usuarioAtual.servicosRealizados.splice(idx, 1);
      salvarDadosNoNavegador();
      renderizarTags();
    });
  });
}

// Upload e pré-visualização imediata da foto de perfil
// Upload, redimensionamento leve e pré-visualização imediata da foto de perfil
inputFotoPerfil.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = function (evento) {
    const imgTemp = new Image();
    imgTemp.onload = function () {
      // Redimensiona para no máximo 400px para não travar o localStorage
      const canvas = document.createElement('canvas');
      const maxSize = 400;
      let width = imgTemp.width;
      let height = imgTemp.height;

      if (width > height && width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      } else if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgTemp, 0, 0, width, height);

      // Converte para JPEG leve e aplica na tela
      const fotoOtimizada = canvas.toDataURL('image/jpeg', 0.85);
      usuarioAtual.foto = fotoOtimizada;

      try {
        salvarDadosNoNavegador();
      } catch (err) {
        console.warn('Imagem exibida na sessão atual.');
      }

      atualizarInterface();
      showToast('Foto de perfil atualizada com sucesso!');
    };
    imgTemp.src = evento.target.result;
  };

  leitor.readAsDataURL(arquivo);
});


// Adicionar nova habilidade/serviço realizado
btnAddTagPerfil.addEventListener('click', () => {
  const valor = editNovoServico.value.trim();
  if (!valor) return;

  if (!usuarioAtual.servicosRealizados) {
    usuarioAtual.servicosRealizados = [];
  }

  usuarioAtual.servicosRealizados.push(valor);
  editNovoServico.value = '';
  salvarDadosNoNavegador();
  renderizarTags();
  showToast('Serviço adicionado ao seu portfólio!');
});

// Salvar edição completa dos dados
formEditarPerfil.addEventListener('submit', (e) => {
  e.preventDefault();

  usuarioAtual.nome = document.getElementById('editNome').value.trim();
  usuarioAtual.email = document.getElementById('editEmail').value.trim();
  usuarioAtual.telefone = document.getElementById('editTelefone').value.trim();
  usuarioAtual.cidade = document.getElementById('editCidade').value.trim();
  usuarioAtual.areaAtuacao = document.getElementById('editArea').value;
  usuarioAtual.tempoExperiencia = document.getElementById('editTempoExp').value;
  usuarioAtual.resumoExperiencia = document.getElementById('editResumo').value.trim();

  salvarDadosNoNavegador();
  atualizarInterface();
  showToast('Dados do perfil salvos com sucesso!');
});

function salvarDadosNoNavegador() {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtual));
}

// Botão "Editar Perfil" rola suave e foca no campo Nome
btnToggleEditar.addEventListener('click', () => {
  document.getElementById('editNome').focus();
  document.getElementById('cardFormularioEdicao').scrollIntoView({ behavior: 'smooth' });
});

// Botão "Sair da conta"
btnSairConta.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  showToast('Saindo da conta...');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 900);
});

// Inicia a tela
inicializarPerfil();
