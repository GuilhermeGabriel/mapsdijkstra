const Graph = require('node-dijkstra');
const startSelect = document.getElementById('pontodepartida');
const finishSelect = document.getElementById('pontodechegada');
const btnFind = document.getElementById('btn-find');

const infoTitle = document.getElementById('info-title');
const infoCaminho = document.getElementById('info-caminho');
const infoKm = document.getElementById('info-km');

const route = new Graph();
/*
a 0 araguari
b 1 cascalhorico
c 2 capinopolis
d 3 centralina
e 4 douradinhos
f 5 estreladosul
g 6 grupiara
h 7 indianopolis
i 8 ituitaba
j 9 itumbiara
k 10 montealegreminas
l 11 romaria
m 12 saojuliana
n 13 tupaciguara
o 14 uberlandia
*/
//route.addNode('i', { b: 3, a: 6 });
route.addNode('araguari', {
  uberlandia: 30,
  estreladosul: 34,
  cascalhorico: 28,
});
route.addNode('cascalhorico', { araguari: 28, grupiara: 32 });
route.addNode('capinopolis', { centralina: 40, ituitaba: 30 });
route.addNode('centralina', {
  itumbiara: 20,
  capinopolis: 40,
  montealegreminas: 75,
});
route.addNode('douradinhos', {
  ituitaba: 90,
  montealegreminas: 28,
  uberlandia: 63,
});
route.addNode('estreladosul', { araguari: 34, grupiara: 38, romaria: 27 });
route.addNode('grupiara', { cascalhorico: 32, estreladosul: 38 });
route.addNode('indianopolis', { uberlandia: 45, saojuliana: 40 });
route.addNode('ituitaba', {
  capinopolis: 30,
  douradinhos: 90,
  montealegreminas: 85,
});
route.addNode('itumbiara', { centralina: 20, tupaciguara: 55 });
route.addNode('montealegreminas', {
  uberlandia: 60,
  douradinhos: 28,
  ituitaba: 85,
  centralina: 75,
  tupaciguara: 44,
});
route.addNode('romaria', { estreladosul: 27, uberlandia: 78, saojuliana: 28 });
route.addNode('saojuliana', { indianopolis: 40, romaria: 28 });
route.addNode('tupaciguara', {
  itumbiara: 55,
  montealegreminas: 44,
  uberlandia: 60,
});
route.addNode('uberlandia', {
  araguari: 30,
  romaria: 78,
  indianopolis: 45,
  douradinhos: 63,
  montealegreminas: 60,
  tupaciguara: 60,
});

const canvas = document.getElementById('canvas');
canvas.width = 851;
canvas.height = 395;
//canvas.style.border = 'red solid 5px';
const ctx = canvas.getContext('2d');

const locations = {
  araguari: [592, 137],
  cascalhorico: [709, 113],
  capinopolis: [90, 150],
  centralina: [226, 110],
  douradinhos: [403, 287],
  estreladosul: [774, 178],
  grupiara: [774, 79],
  indianopolis: [698, 292],
  ituitaba: [113, 262],
  itumbiara: [220, 53],
  montealegreminas: [391, 214],
  romaria: [803, 246],
  saojuliana: [802, 360],
  tupaciguara: [403, 113],
  uberlandia: [561, 238],
};

/*
for (let city in position) {
  var radius = 12;
  ctx.beginPath();
  ctx.arc(position[city][0], position[city][1], radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
}*/

btnFind.addEventListener('click', () => {
  const startSelected = startSelect.options[startSelect.selectedIndex];
  const finishSelected = finishSelect.options[finishSelect.selectedIndex];
  const cityStartValue = startSelected.value;
  const cityEndValue = finishSelected.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (cityStartValue === cityEndValue) {
    infoCaminho.textContent = '';
    infoKm.textContent = '';
    infoTitle.textContent = 'Ponto de partida igual ao de chegada ⚠️⚠️⚠️';
  }

  const rota = route.path(startSelected.value, finishSelected.value, {
    cost: true,
  });
  const distancia = rota.cost;
  let caminho = '';
  rota.path.map((cidade) => (caminho += `${cidade} > `));
  caminho = caminho.substring(0, caminho.length - 2);

  ctx.beginPath();
  ctx.moveTo(
    locations[startSelected.value][0],
    locations[startSelected.value][1]
  );
  for (city of rota.path) {
    ctx.lineTo(locations[city][0], locations[city][1]);
  }
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';
  ctx.stroke();

  drawPoint(
    locations[cityStartValue][0],
    locations[cityStartValue][1],
    'green'
  );
  drawPoint(locations[cityEndValue][0], locations[cityEndValue][1], 'red');

  infoTitle.textContent = `A menor distância entre: ${cityStartValue} e ${cityEndValue} é:`;
  infoCaminho.textContent = caminho;
  infoKm.textContent = `Distância total: ${rota.cost}Km`;
});

function drawPoint(x, y, color) {
  var radius = 15;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 5;
}
