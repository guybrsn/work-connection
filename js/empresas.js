// Lista de empresas reconhecidas internacionalmente que demandam serviços técnicos
const empresasInternacionais = [
  {
    id: 1,
    nome: 'Bosch',
    sigla: 'BOSCH',
    corBg: '#dc2626',
    corTexto: '#ffffff',
    estrelas: '★★★★★',
    avaliacoes: '14.820 avaliações',
    setor: 'Engenharia, Ferramentas e Automação',
    especialidade: 'Elétrica e Automação',
    mediaDiaria: 'R$ 420,00',
    chamadosAbertos: 12,
    descricao: 'Multinacional alemã líder em tecnologia industrial, sistemas de segurança, automação predial e manutenção de equipamentos eletroeletrônicos.'
  },
  {
    id: 2,
    nome: 'Samsung Electronics',
    sigla: 'SAMSUNG',
    corBg: '#1d4ed8',
    corTexto: '#ffffff',
    estrelas: '★★★★☆',
    avaliacoes: '22.410 avaliações',
    setor: 'Tecnologia, Climatização e Eletrônicos',
    especialidade: 'Refrigeração e TI',
    mediaDiaria: 'R$ 390,00',
    chamadosAbertos: 18,
    descricao: 'Rede credenciada e parceiros corporativos para instalação de sistemas VRF/Split WindFree, displays comerciais e suporte técnico especializado.'
  },
  {
    id: 3,
    nome: 'Siemens',
    sigla: 'SIEMENS',
    corBg: '#0f766e',
    corTexto: '#ffffff',
    estrelas: '★★★★★',
    avaliacoes: '9.640 avaliações',
    setor: 'Infraestrutura Inteligente e Energia',
    especialidade: 'Elétrica Industrial',
    mediaDiaria: 'R$ 480,00',
    chamadosAbertos: 7,
    descricao: 'Referência global em painéis elétricos, automação predial, controle de acesso e eficiência energética para indústrias e grandes edifícios.'
  },
  {
    id: 4,
    nome: 'Dell Technologies',
    sigla: 'DELL',
    corBg: '#0284c7',
    corTexto: '#ffffff',
    estrelas: '★★★★☆',
    avaliacoes: '18.305 avaliações',
    setor: 'Infraestrutura de TI e Servidores',
    especialidade: 'TI e Redes',
    mediaDiaria: 'R$ 360,00',
    chamadosAbertos: 15,
    descricao: 'Chamados técnicos on-site para manutenção de servidores, workstations corporativas, switches e suporte presencial em empresas parceiras.'
  },
  {
    id: 5,
    nome: 'Schneider Electric',
    sigla: 'SE',
    corBg: '#15803d',
    corTexto: '#ffffff',
    estrelas: '★★★★★',
    avaliacoes: '8.190 avaliações',
    setor: 'Gestão de Energia e Automação',
    especialidade: 'Elétrica e Nobreaks',
    mediaDiaria: 'R$ 440,00',
    chamadosAbertos: 9,
    descricao: 'Especialista mundial em quadros elétricos, nobreaks corporativos (APC), subestações e automação residencial e comercial.'
  },
  {
    id: 6,
    nome: 'LG Electronics',
    sigla: 'LG',
    corBg: '#be123c',
    corTexto: '#ffffff',
    estrelas: '★★★★☆',
    avaliacoes: '16.500 avaliações',
    setor: 'Climatização e Soluções Comerciais',
    especialidade: 'Refrigeração',
    mediaDiaria: 'R$ 375,00',
    chamadosAbertos: 14,
    descricao: 'Demandas frequentes para instalação, higienização técnica e manutenção preventiva de sistemas de ar-condicionado residencial e comercial.'
  },
  {
    id: 7,
    nome: 'Leroy Merlin',
    sigla: 'LM',
    corBg: '#16a34a',
    corTexto: '#ffffff',
    estrelas: '★★★★☆',
    avaliacoes: '6.739 avaliações',
    setor: 'Varejo, Construção e Instalações',
    especialidade: 'Instalações Residenciais',
    mediaDiaria: 'R$ 310,00',
    chamadosAbertos: 24,
    descricao: 'Rede internacional que conecta instaladores parceiros para serviços de elétrica, hidráulica, fechaduras digitais e climatização na casa dos clientes.'
  },
  {
    id: 8,
    nome: 'Cisco Systems',
    sigla: 'CISCO',
    corBg: '#0369a1',
    corTexto: '#ffffff',
    estrelas: '★★★★★',
    avaliacoes: '11.920 avaliações',
    setor: 'Redes Corporativas e Segurança',
    especialidade: 'Redes e CFTV',
    mediaDiaria: 'R$ 460,00',
    chamadosAbertos: 6,
    descricao: 'Projetos de cabeamento estruturado, instalação de access points corporativos, racks de telecomunicações e segurança de rede.'
  },
  {
    id: 9,
    nome: 'DHL Supply Chain',
    sigla: 'DHL',
    corBg: '#ffc523',
    corTexto: '#18181b',
    estrelas: '★★★★☆',
    avaliacoes: '13.480 avaliações',
    setor: 'Logística e Centros de Distribuição',
    especialidade: 'Manutenção Predial e TI',
    mediaDiaria: 'R$ 340,00',
    chamadosAbertos: 11,
    descricao: 'Manutenção preventiva em galpões logísticos, leitores ópticos, coletores de dados, redes Wi-Fi industriais e sistemas de monitoramento.'
  }
];

// Elementos da tela
const gridEmpresas = document.getElementById('gridEmpresas');
const contadorEmpresas = document.getElementById('contadorEmpresas');
const inputBuscaEmpresa = document.getElementById('inputBuscaEmpresa');
const btnBuscarEmpresa = document.getElementById('btnBuscarEmpresa');

// Modal
const modalEmpresa = document.getElementById('modalEmpresa');
const btnFecharModalEmpresa = document.getElementById('btnFecharModalEmpresa');
const btnFecharSecundario = document.getElementById('btnFecharSecundario');

// Mostra nome do usuário logado no cabeçalho
const salvo = localStorage.getItem('usuarioLogado');
if (salvo) {
  const user = JSON.parse(salvo);
  if (user.nome) {
    document.getElementById('userNameDisplay').textContent = user.nome.split(' ');
  }
}

// Renderiza o grid de 3 colunas igual à imagem de referência
function renderizarEmpresas() {
  const termo = inputBuscaEmpresa.value.trim().toLowerCase();

  const filtradas = empresasInternacionais.filter((emp) => {
    return (
      !termo ||
      emp.nome.toLowerCase().includes(termo) ||
      emp.setor.toLowerCase().includes(termo) ||
      emp.especialidade.toLowerCase().includes(termo)
    );
  });

  contadorEmpresas.textContent = `Mostrando ${filtradas.length} empresa(s)`;
  gridEmpresas.innerHTML = '';

  if (filtradas.length === 0) {
    gridEmpresas.innerHTML = `<p style="color:#52525b; grid-column:1/-1;">Nenhuma empresa encontrada com "${inputBuscaEmpresa.value}".</p>`;
    return;
  }

  filtradas.forEach((emp) => {
    const card = document.createElement('article');
    card.className = 'company-item';
    card.innerHTML = `
      <div class="company-logo-box" style="background-color:${emp.corBg}; color:${emp.corTexto};">
        ${emp.sigla}
      </div>
      <div class="company-info">
        <h3 class="company-name">${emp.nome}</h3>
        <div class="company-rating">
          <span class="stars">${emp.estrelas}</span>
          <span class="reviews-count">${emp.avaliacoes}</span>
        </div>
        <div class="company-sublinks">
          <span>Diárias</span>
          <span>Avaliações</span>
          <span>Chamados (${emp.chamadosAbertos})</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => abrirModalEmpresa(emp));
    gridEmpresas.appendChild(card);
  });
}

function abrirModalEmpresa(emp) {
  const logoBox = document.getElementById('modalLogoBox');
  logoBox.textContent = emp.sigla;
  logoBox.style.backgroundColor = emp.corBg;
  logoBox.style.color = emp.corTexto;

  document.getElementById('modalNomeEmpresa').textContent = emp.nome;
  document.getElementById('modalSetorEmpresa').textContent = `${emp.setor} • ${emp.avaliacoes}`;
  document.getElementById('modalDescricaoEmpresa').textContent = emp.descricao;
  document.getElementById('modalMediaDiaria').textContent = emp.mediaDiaria;
  document.getElementById('modalTotalChamados').textContent = `${emp.chamadosAbertos} abertos`;
  document.getElementById('modalEspecialidade').textContent = emp.especialidade;

  modalEmpresa.classList.remove('hidden');
}

// Eventos de busca e fechamento do modal
btnBuscarEmpresa.addEventListener('click', renderizarEmpresas);
inputBuscaEmpresa.addEventListener('input', renderizarEmpresas);

btnFecharModalEmpresa.addEventListener('click', () => modalEmpresa.classList.add('hidden'));
btnFecharSecundario.addEventListener('click', () => modalEmpresa.classList.add('hidden'));
modalEmpresa.addEventListener('click', (e) => {
  if (e.target === modalEmpresa) modalEmpresa.classList.add('hidden');
});

// Inicializa
renderizarEmpresas();
