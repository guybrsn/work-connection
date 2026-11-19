// ================= PARTE 1: DADOS E ESTADO =================
let servicosData = [
  {
    id: 1,
    titulo: 'Manutenção e Limpeza de 3 Ar-Condicionados Split',
    contratante: 'Clínica Odontológica Vida',
    nota: '4.9 ★',
    tipoLocal: 'Empresa',
    categoria: 'Refrigeração',
    cidade: 'Goiabeiras, Cuiabá - MT',
    valor: 380,
    periodo: 'Diária / Serviço fechado',
    tempoPublicado: 'Há 2 horas',
    urgencia: 'Para amanhã',
    descricao: 'Precisamos de técnico em refrigeração para realizar limpeza completa, higienização de filtros e verificação de gás em 3 aparelhos Split (12.000 e 18.000 BTUs) nos consultórios.',
    requisitos: ['Ferramentas próprias', 'Bomba de vácuo / Manifold', 'Atendimento comercial']
  },
  {
    id: 2,
    titulo: 'Instalação de Rede Wi-Fi Mesh e Cabeamento Estruturado',
    contratante: 'Residência — Família Mendes',
    nota: '5.0 ★',
    tipoLocal: 'Residência',
    categoria: 'TI e Redes',
    cidade: 'Jardim das Américas, Cuiabá - MT',
    valor: 260,
    periodo: 'Por visita técnica',
    tempoPublicado: 'Há 4 horas',
    urgencia: 'Esta semana',
    descricao: 'Passagem de cabo de rede Cat6 do roteador principal até o escritório no segundo andar e configuração de 3 roteadores Mesh para eliminar pontos cegos na casa.',
    requisitos: ['Alicate de crimpagem', 'Testador de cabos', 'Experiência com redes Wi-Fi']
  },
  {
    id: 3,
    titulo: 'Troca de Quadro de Distribuição e Disjuntores',
    contratante: 'Supermercado Bom Preço',
    nota: '4.7 ★',
    tipoLocal: 'Empresa',
    categoria: 'Elétrica',
    cidade: 'CPA II, Cuiabá - MT',
    valor: 450,
    periodo: 'Diária técnica',
    tempoPublicado: 'Há 6 horas',
    urgencia: 'Urgente (Hoje)',
    descricao: 'Substituição de 4 disjuntores trifásicos superaquecidos no quadro secundário da padaria e balanceamento de cargas. Serviço realizado após às 19h para não parar o atendimento.',
    requisitos: ['NR-10 em dia', 'Multímetro e alicate amperímetro', 'Experiência trifásica']
  },
  {
    id: 4,
    titulo: 'Formatação, Upgrade de SSD e Backup de Notebook',
    contratante: 'Ana Carolina Souza',
    nota: '4.8 ★',
    tipoLocal: 'Residência',
    categoria: 'TI e Redes',
    cidade: 'Bosque da Saúde, Cuiabá - MT',
    valor: 150,
    periodo: 'Por serviço',
    tempoPublicado: 'Há 1 dia',
    urgencia: 'Flexível',
    descricao: 'Instalação de SSD NVMe (já comprado), transferência de arquivos pessoais da pasta Documentos e instalação do pacote Office e antivírus no domicílio.',
    requisitos: ['Pendrive bootável', 'Case externa para backup', 'Pontualidade']
  },
  {
    id: 5,
    titulo: 'Instalação de 4 Câmeras CFTV Full HD e Acesso no Celular',
    contratante: 'Auto Peças Avenida',
    nota: '4.9 ★',
    tipoLocal: 'Empresa',
    categoria: 'Segurança Eletrônica',
    cidade: 'Centro Sul, Cuiabá - MT',
    valor: 420,
    periodo: 'Serviço fechado',
    tempoPublicado: 'Há 1 dia',
    urgencia: 'Esta semana',
    descricao: 'Fixação de 4 câmeras externas com infravermelho, conexão no DVR Intelbras e configuração do aplicativo no celular dos dois sócios.',
    requisitos: ['Furadeira / Escada', 'Conhecimento em DVR Intelbras', 'Acabamento limpo']
  }
];

let servicoSelecionadoId = servicosData[0].id;
let filtroAtual = 'todos';
let candidatosIds = [];
let salvosIds = [];
// ================= PARTE 2: ELEMENTOS E FILTROS =================
const listaServicosEl = document.getElementById('listaServicos');
const painelDetalhesEl = document.getElementById('painelDetalhes');
const contadorResultadosEl = document.getElementById('contadorResultados');
const inputBuscaServico = document.getElementById('inputBuscaServico');
const inputBuscaLocal = document.getElementById('inputBuscaLocal');
const btnBuscar = document.getElementById('btnBuscar');
const ordenarSelect = document.getElementById('ordenarSelect');
const filterPills = document.querySelectorAll('.pill');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3200);
}

function carregarUsuarioLogado() {
  const dadosSalvos = localStorage.getItem('usuarioLogado');
  if (dadosSalvos) {
    const user = JSON.parse(dadosSalvos);
    const nome = user.nome || 'Usuário';
    document.getElementById('userNameDisplay').textContent = nome.split(' ')[0];
    document.getElementById('userAvatar').textContent = nome.substring(0, 2).toUpperCase();
  }
}

function obterServicosFiltrados() {
  const termo = inputBuscaServico.value.trim().toLowerCase();
  const local = inputBuscaLocal.value.trim().toLowerCase();
  const ordem = ordenarSelect.value;

  let filtrados = servicosData.filter((item) => {
    const matchTermo =
      !termo ||
      item.titulo.toLowerCase().includes(termo) ||
      item.categoria.toLowerCase().includes(termo) ||
      item.descricao.toLowerCase().includes(termo);

    const matchLocal = !local || item.cidade.toLowerCase().includes(local);

    const matchPill =
      filtroAtual === 'todos' ||
      item.tipoLocal === filtroAtual ||
      item.categoria === filtroAtual;

    return matchTermo && matchLocal && matchPill;
  });

  if (ordem === 'maior-valor') {
    filtrados = [...filtrados].sort((a, b) => b.valor - a.valor);
  }

  return filtrados;
}
// ================= PARTE 3: RENDERIZAÇÃO NA TELA =================
function renderizarLista() {
  const lista = obterServicosFiltrados();
  contadorResultadosEl.textContent = `Mostrando ${lista.length} serviço(s) disponível(is)`;
  listaServicosEl.innerHTML = '';

  if (lista.length === 0) {
    listaServicosEl.innerHTML = `
      <div class="job-card">
        <h3>Nenhum serviço encontrado</h3>
        <p class="job-location">Tente limpar os filtros ou buscar por outra especialidade.</p>
      </div>
    `;
    painelDetalhesEl.innerHTML = `<p style="color:#52525b;">Selecione outro filtro para visualizar os detalhes do chamado.</p>`;
    return;
  }

  if (!lista.some((s) => s.id === servicoSelecionadoId)) {
    servicoSelecionadoId = lista[0].id;
  }

  lista.forEach((servico) => {
    const isSelected = servico.id === servicoSelecionadoId;
    const badgeClass = servico.tipoLocal === 'Empresa' ? 'badge-empresa' : 'badge-residencia';

    const card = document.createElement('article');
    card.className = `job-card ${isSelected ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="card-top">
        <span class="contratante-info">${servico.contratante} • ${servico.nota}</span>
        <span class="badge-local ${badgeClass}">${servico.tipoLocal}</span>
      </div>
      <h3>${servico.titulo}</h3>
      <p class="job-location">${servico.cidade}</p>
      <div class="card-bottom">
        <span class="job-price">R$ ${servico.valor},00</span>
        <span class="job-time">${servico.tempoPublicado}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      servicoSelecionadoId = servico.id;
      renderizarLista();
      renderizarDetalhes(servico);
    });

    listaServicosEl.appendChild(card);
  });

  const servicoAtivo = lista.find((s) => s.id === servicoSelecionadoId);
  if (servicoAtivo) {
    renderizarDetalhes(servicoAtivo);
  }
}

function renderizarDetalhes(servico) {
  const jaCandidatou = candidatosIds.includes(servico.id);
  const estaSalvo = salvosIds.includes(servico.id);
  const badgeClass = servico.tipoLocal === 'Empresa' ? 'badge-empresa' : 'badge-residencia';

  painelDetalhesEl.innerHTML = `
    <div class="detail-header">
      <div>
        <div class="detail-company-row">
          <span class="badge-local ${badgeClass}">${servico.tipoLocal}</span>
          <span class="contratante-info">${servico.contratante} (${servico.nota})</span>
        </div>
        <h2 class="detail-title">${servico.titulo}</h2>
        <p class="detail-meta">${servico.cidade} • Publicado ${servico.tempoPublicado}</p>
      </div>

      <div class="detail-actions">
        <button id="btnSalvarServico" class="btn-save ${estaSalvo ? 'saved' : ''}" title="Salvar chamado">
          ${estaSalvo ? '★' : '☆'}
        </button>
        <button id="btnAceitarServico" class="btn-apply ${jaCandidatou ? 'applied' : ''}">
          ${jaCandidatou ? '✓ Candidatura Enviada' : 'Aceitar / Candidatar-se'}
        </button>
      </div>
    </div>

    <div class="detail-highlights">
      <div class="highlight-box">
        <span class="highlight-label">Valor do Serviço</span>
        <span class="highlight-value">R$ ${servico.valor},00</span>
      </div>
      <div class="highlight-box">
        <span class="highlight-label">Modalidade</span>
        <span class="highlight-value">${servico.periodo}</span>
      </div>
      <div class="highlight-box">
        <span class="highlight-label">Prazo / Urgência</span>
        <span class="highlight-value">${servico.urgencia}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Descrição do Chamado Técnico</h4>
      <p>${servico.descricao}</p>
    </div>

    <div class="detail-section">
      <h4>Requisitos e Ferramentas Recomendadas</h4>
      <ul class="req-list">
        ${servico.requisitos.map((req) => `<li>${req}</li>`).join('')}
      </ul>
    </div>
  `;

  document.getElementById('btnAceitarServico').addEventListener('click', () => {
    if (!candidatosIds.includes(servico.id)) {
      candidatosIds.push(servico.id);
      showToast(`Solicitação enviada para "${servico.contratante}"! Aguarde contato.`);
      renderizarDetalhes(servico);
    }
  });

  document.getElementById('btnSalvarServico').addEventListener('click', () => {
    if (salvosIds.includes(servico.id)) {
      salvosIds = salvosIds.filter((id) => id !== servico.id);
      showToast('Serviço removido dos salvos.');
    } else {
      salvosIds.push(servico.id);
      showToast('Serviço salvo nos seus favoritos!');
    }
    renderizarDetalhes(servico);
  });
}
// ================= PARTE 4: EVENTOS E MODAL =================
const modalPublicar = document.getElementById('modalPublicar');
const btnAbrirModalPublicar = document.getElementById('btnAbrirModalPublicar');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnCancelarModal = document.getElementById('btnCancelarModal');
const formNovoServico = document.getElementById('formNovoServico');

btnBuscar.addEventListener('click', renderizarLista);
inputBuscaServico.addEventListener('input', renderizarLista);
inputBuscaLocal.addEventListener('input', renderizarLista);
ordenarSelect.addEventListener('change', renderizarLista);

filterPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    filterPills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    filtroAtual = pill.dataset.filter;
    renderizarLista();
  });
});

btnAbrirModalPublicar.addEventListener('click', () => modalPublicar.classList.remove('hidden'));
btnFecharModal.addEventListener('click', () => modalPublicar.classList.add('hidden'));
btnCancelarModal.addEventListener('click', () => modalPublicar.classList.add('hidden'));

formNovoServico.addEventListener('submit', (e) => {
  e.preventDefault();

  const novoChamado = {
    id: Date.now(),
    titulo: document.getElementById('novoTitulo').value.trim(),
    contratante: document.getElementById('novoContratante').value.trim(),
    nota: 'Novo ★',
    tipoLocal: document.getElementById('novoTipoLocal').value,
    categoria: document.getElementById('novaCategoria').value,
    cidade: document.getElementById('novaCidade').value.trim(),
    valor: Number(document.getElementById('novoValor').value),
    periodo: 'Serviço sob demanda',
    tempoPublicado: 'Agora mesmo',
    urgencia: 'Imediato',
    descricao: document.getElementById('novaDescricao').value.trim(),
    requisitos: ['Ferramentas próprias', 'Boa avaliação na plataforma']
  };

  servicosData.unshift(novoChamado);
  servicoSelecionadoId = novoChamado.id;

  formNovoServico.reset();
  modalPublicar.classList.add('hidden');
  showToast('Seu chamado técnico foi publicado com sucesso!');
  renderizarLista();
});

// Inicia a página
function carregarUsuarioLogado() {
  const dadosSalvos = localStorage.getItem('usuarioLogado');
  if (dadosSalvos) {
    const user = JSON.parse(dadosSalvos);
    const nome = user.nome || 'Usuário';
    document.getElementById('userNameDisplay').textContent = nome.split(' ')[0];
    document.getElementById('userAvatar').textContent = nome.substring(0, 2).toUpperCase();
  }
}

renderizarLista();
