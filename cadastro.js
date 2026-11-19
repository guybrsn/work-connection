const typeButtons = document.querySelectorAll('.type-btn');
const tecnicoFields = document.getElementById('tecnicoFields');
const clienteFields = document.getElementById('clienteFields');

const servicoInput = document.getElementById('servicoInput');
const btnAddServico = document.getElementById('btnAddServico');
const servicosLista = document.getElementById('servicosLista');

const registerForm = document.getElementById('registerForm');
const toast = document.getElementById('toast');

let perfilSelecionado = 'tecnico';
let servicosRealizados = [];

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// Alternar entre Técnico e Cliente/Empresa
typeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    typeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    perfilSelecionado = btn.dataset.type;

    if (perfilSelecionado === 'tecnico') {
      tecnicoFields.classList.remove('hidden');
      clienteFields.classList.add('hidden');
    } else {
      tecnicoFields.classList.add('hidden');
      clienteFields.classList.remove('hidden');
    }
  });
});

// Renderizar tags de serviços já realizados
function renderizarServicos() {
  servicosLista.innerHTML = '';

  servicosRealizados.forEach((servico, index) => {
    const tag = document.createElement('span');
    tag.className = 'service-tag';
    tag.innerHTML = `
      ${servico}
      <button type="button" aria-label="Remover ${servico}" data-index="${index}">&times;</button>
    `;
    servicosLista.appendChild(tag);
  });

  // Evento para remover tag
  servicosLista.querySelectorAll('button').forEach((btnRemove) => {
    btnRemove.addEventListener('click', (e) => {
      const idx = Number(e.target.dataset.index);
      servicosRealizados.splice(idx, 1);
      renderizarServicos();
    });
  });
}

// Adicionar novo serviço à lista
function adicionarServico() {
  const valor = servicoInput.value.trim();
  if (!valor) return;

  if (servicosRealizados.includes(valor)) {
    showToast('Esse serviço já foi adicionado à lista.');
    return;
  }

  servicosRealizados.push(valor);
  servicoInput.value = '';
  servicoInput.focus();
  renderizarServicos();
}

btnAddServico.addEventListener('click', adicionarServico);

// Permitir adicionar pressionando Enter sem enviar o formulário antes da hora
servicoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    adicionarServico();
  }
});

// Envio do cadastro completo
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeCompleto').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cidade = document.getElementById('cidade').value.trim();

  if (perfilSelecionado === 'tecnico') {
    const area = document.getElementById('areaAtuacao').value;
    const resumo = document.getElementById('resumoExperiencia').value.trim();

    if (!area) {
      showToast('Selecione sua área principal de atuação.');
      document.getElementById('areaAtuacao').focus();
      return;
    }

    if (!resumo) {
      showToast('Descreva brevemente sua experiência técnica.');
      document.getElementById('resumoExperiencia').focus();
      return;
    }
  }

  const locaisMarcados = Array.from(
    document.querySelectorAll('input[name="localAtendimento"]:checked')
  ).map((el) => el.value);

  const novoUsuario = {
    nome,
    email,
    telefone,
    cidade,
    perfil: perfilSelecionado,
    areaAtuacao: document.getElementById('areaAtuacao').value,
    tempoExperiencia: document.getElementById('tempoExperiencia').value,
    locaisAtendimento: locaisMarcados,
    servicosRealizados,
    resumoExperiencia: document.getElementById('resumoExperiencia').value.trim(),
    criadoEm: new Date().toISOString()
  };

  // Salva no localStorage para usar nas próximas telas (Serviços Disponíveis / Perfil)
  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));

  showToast('Cadastro realizado com sucesso! Indo para Serviços Disponíveis...');

  setTimeout(() => {
    window.location.href = 'servicos.html';
  }, 1400);
});

