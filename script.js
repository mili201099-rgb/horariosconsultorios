// ===============================
// CONFIGURACIÓN BASE
// ===============================
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes"];
const horas = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

const consultorios = ["VERDE","BLANCO","AZUL"];
let actual = 0;

// ===============================
// DATOS
// ===============================
const data = {
  VERDE: [
    {dia:0, desde:18, hasta:22, nombre:"ADEN", clase:"aden"},
    {dia:1, desde:8, hasta:16, nombre:"ADEN", clase:"aden"},
    {dia:2, desde:12, hasta:16, nombre:"ADEN", clase:"aden"},
    {dia:4, desde:20, hasta:22, nombre:"ADEN", clase:"aden"},

    {dia:0, desde:13, hasta:18, nombre:"MARIANA", clase:"mariana"},
    {dia:3, desde:12, hasta:16, nombre:"MARIANA", clase:"mariana"},
    {dia:4, desde:13, hasta:20, nombre:"MARIANA", clase:"mariana"},

    {dia:1, desde:16, hasta:22, nombre:"MARISA", clase:"marisa"},
    {dia:2, desde:16, hasta:22, nombre:"MARISA", clase:"marisa"},
    {dia:3, desde:16, hasta:22, nombre:"MARISA", clase:"marisa"}
  ],

  BLANCO: [
    {dia:0, desde:16, hasta:20, nombre:"MAIDA", clase:"maida"},
    {dia:1, desde:16, hasta:20, nombre:"MAIDA", clase:"maida"},
    {dia:2, desde:8, hasta:20, nombre:"MAIDA", clase:"maida"},

    {dia:3, desde:12, hasta:20, nombre:"VICTORIA", clase:"victoria"},
    {dia:4, desde:8, hasta:16, nombre:"VICTORIA", clase:"victoria"},
    {dia:4, desde:16, hasta:22, nombre:"MARISA", clase:"marisa"}
  ],

  AZUL: [
    {dia:0, desde:12, hasta:20, nombre:"IVANA", clase:"ivana"},
    {dia:3, desde:12, hasta:20, nombre:"MAIDA", clase:"maida"},
    {dia:1, desde:12, hasta:20, nombre:"MARIA DEL CARMEN", clase:"maria"},
    {dia:2, desde:8, hasta:12, nombre:"LUIS", clase:"luis"},
    {dia:4, desde:8, hasta:16, nombre:"ROMINA", clase:"romina"}
  ]
};

// ===============================
// DOM
// ===============================
const grid = document.getElementById("grid");
const titulo = document.getElementById("titulo");
const diasCont = document.getElementById("dias");

// ===============================
// DIBUJAR HORAS
// ===============================
function dibujarHoras() {
  const cont = document.querySelector(".horas");
  cont.innerHTML = "";
  horas.forEach(h => {
    const div = document.createElement("div");
    div.textContent = h + ":00";
    cont.appendChild(div);
  });
}

// ===============================
// DIBUJAR DÍAS
// ===============================
function dibujarDias() {
  diasCont.innerHTML = "";
  dias.forEach(d => {
    const div = document.createElement("div");
    div.textContent = d;
    diasCont.appendChild(div);
  });
}

// ===============================
// BLOQUE LIBRE AGRUPADO
// ===============================
function crearBloqueLibre(dia, desde, hasta) {
  if (desde >= hasta) return;

  const div = document.createElement("div");
  div.className = "bloque libre";
  div.innerHTML = `
    <div class="nombre">LIBRE</div>
    <div class="hora">${desde}:00 a ${hasta}:00</div>
  `;
  div.style.gridColumn = dia + 1;
  div.style.gridRow = (desde - 8 + 1) + " / " + (hasta - 8 + 1);
  grid.appendChild(div);
}

// ===============================
// DIBUJAR TODO
// ===============================
function dibujar() {
  grid.innerHTML = "";
  const consultorio = consultorios[actual];
  titulo.textContent = "CONSULTORIO " + consultorio;

  const bloques = data[consultorio];

  // 1️⃣ BLOQUES LIBRES
  dias.forEach((_, diaIndex) => {
    const ocupados = bloques
      .filter(b => b.dia === diaIndex)
      .sort((a, b) => a.desde - b.desde);

    let inicioLibre = 8;

    ocupados.forEach(b => {
      if (b.desde > inicioLibre) {
        crearBloqueLibre(diaIndex, inicioLibre, b.desde);
      }
      inicioLibre = b.hasta;
    });

    if (inicioLibre < 22) {
      crearBloqueLibre(diaIndex, inicioLibre, 22);
    }
  });

  // 2️⃣ BLOQUES OCUPADOS
  bloques.forEach(b => {
    const div = document.createElement("div");
    div.className = "bloque " + b.clase;
    div.innerHTML = `
      <div class="nombre">${b.nombre}</div>
      <div class="hora">${b.desde}:00 a ${b.hasta}:00</div>
    `;
    div.style.gridColumn = b.dia + 1;
    div.style.gridRow = (b.desde - 8 + 1) + " / " + (b.hasta - 8 + 1);
    grid.appendChild(div);
  });
}

// ===============================
// NAVEGACIÓN
// ===============================
document.getElementById("prev").onclick = () => {
  actual = (actual - 1 + consultorios.length) % consultorios.length;
  dibujar();
};

document.getElementById("next").onclick = () => {
  actual = (actual + 1) % consultorios.length;
  dibujar();
};

// ===============================
// INIT
// ===============================
dibujarHoras();
dibujarDias();
dibujar();
