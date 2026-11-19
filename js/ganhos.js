// Dados base de diária média por área (em R$)
const dadosAreas = {
  'eletrica': {
    nome: 'Instalações e Manutenção Elétrica',
    base: 290,
    residencia: 260,
    empresa: 390
  },
  'refrigeracao': {
    nome: 'Ar-Condicionado e Refrigeração',
    base: 310,
    residencia: 280,
    empresa: 410
  },
  'ti-redes': {
    nome: 'Suporte de TI, Computadores e Redes',
    base: 250,
    residencia: 210,
    empresa: 345
  },
  'seguranca': {
    nome: 'CFTV, Câmeras e Segurança Eletrônica',
    base: 280,
    residencia: 245,
    empresa: 380
  },
  'automacao': {
    nome: 'Automação Residencial e Comercial',
    base: 330,
    residencia: 300,
    empresa: 440
  },
  'hidraulica': {
    nome: 'Manutenção Hidráulica e Predial',
    base: 240,
    residencia: 215,
    empresa: 320
  }
};

// Dados do mini gráfico de Empresas Parceiras (média/dia)
const rankingEmpresas = [
  { nome: 'Siemens', diaria: 480 },
  { nome: 'Cisco Systems', diaria: 460 },
  { nome: 'Schneider', diaria: 440 },
  { nome: 'Bosch', diaria: 420 },
  { nome: 'Samsung', diaria: 390 },
  { nome: 'LG Electronics', diaria: 375 },
  { nome: 'Dell Tech', diaria: 360 },
  { nome: 'Leroy Merlin', diaria: 310 }
];

// Elementos DOM
const selectArea = document.getElementById('selectArea');
const selectExperiencia = document.getElementById('selectExperiencia');
const localButtons = document.querySelectorAll('.local-btn');
const rangeDias = document.getElementById('rangeDias');
const labelDias = document.getElementById('labelDias');

let multiplicadorLocal = 1.15; // Padrão: Empresas

// Carrega nome do usuário no cabeçalho
const salvo = localStorage.getItem('usuarioLogado');
if (salvo) {
  const user = JSON.parse(salvo);
  if (user.nome) {
    document.getElementById('userNameDisplay').textContent = user.nome.split(' ');
  }
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Calcula e atualiza os valores do simulador
function calcularGanhos() {
  const areaKey = selectArea.value;
  const infoArea = dadosAreas[areaKey];
  const multExp = Number(selectExperiencia.value);
  const diasSemana = Number(rangeDias.value);

  const diariaEstimada = Math.round(infoArea.base * multExp * multiplicadorLocal);
  const minimo = Math.round(diariaEstimada * 0.85);
  const maximo = Math.round(diariaEstimada * 1.22);

  const semanal = diariaEstimada * diasSemana;
  const mensal = semanal * 4;

  document.getElementById('tituloAreaResultado').textContent = infoArea.nome;
  document.getElementById('valorDiaria').textContent = formatarMoeda(diariaEstimada);
  document.getElementById('faixaDiaria').textContent = `Faixa comum: ${formatarMoeda(minimo)} a ${formatarMoeda(maximo)} / dia`;

  labelDias.textContent = `${diasSemana} ${diasSemana === 1 ? 'dia' : 'dias'}`;
  document.getElementById('diasSemanaTexto').textContent = `${diasSemana}d`;
  document.getElementById('valorSemanal').textContent = formatarMoeda(semanal);
  document.getElementById('valorMensal').textContent = formatarMoeda(mensal);
}

// Renderiza Mini Gráfico 1: Áreas Técnicas (Residência x Empresa)
function renderizarGraficoAreas() {
  const container = document.getElementById('graficoAreas');
  container.innerHTML = '';
  const maxValor = 460;

  Object.values(dadosAreas).forEach((area) => {
    const pctRes = Math.min(100, Math.round((area.residencia / maxValor) * 100));
    const pctEmp = Math.min(100, Math.round((area.empresa / maxValor) * 100));

    const item = document.createElement('div');
    item.className = 'area-bar-item';
    item.innerHTML = `
      <div class="area-bar-top">
        <span>${area.nome}</span>
        <span>R$ ${area.residencia} / R$ ${area.empresa}</span>
      </div>
      <div class="dual-track">
        <div class="bar-line bar-res" style="width: ${pctRes}%;" title="Residência: R$ ${area.residencia}/dia"></div>
        <div class="bar-line bar-emp" style="width: ${pctEmp}%;" title="Empresa: R$ ${area.empresa}/dia"></div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Renderiza Mini Gráfico 2: Empresas Parceiras
function renderizarGraficoEmpresas() {
  const container = document.getElementById('graficoEmpresas');
  container.innerHTML = '';
  const maxDiaria = 500;

  rankingEmpresas.forEach((emp) => {
    const pct = Math.min(100, Math.round((emp.diaria / maxDiaria) * 100));

    const row = document.createElement('div');
    row.className = 'comp-bar-row';
    row.innerHTML = `
      <span class="comp-name">${emp.nome}</span>
      <div class="comp-track">
        <div class="comp-fill" style="width: ${pct}%;"></div>
      </div>
      <span class="comp-val">R$ ${emp.diaria}/dia</span>
    `;
    container.appendChild(row);
  });
}

// Eventos dos controles do simulador
selectArea.addEventListener('change', calcularGanhos);
selectExperiencia.addEventListener('change', calcularGanhos);
rangeDias.addEventListener('input', calcularGanhos);

localButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    localButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    multiplicadorLocal = Number(btn.dataset.mult);
    calcularGanhos();
  });
});

// Inicialização
calcularGanhos();
renderizarGraficoAreas();
renderizarGraficoEmpresas();
