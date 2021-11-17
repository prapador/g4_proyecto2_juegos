class Pokemon {
  constructor(id, name, type, stats, img) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stats = stats;
    this.img = img;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getStats() {
    return this.stats;
  }
  getImg() {
    return this.img;
  }
}

class Player {
  constructor(name, wins, loses) {
    this.name = name;
    this.wins = wins;
    this.loses = loses;
  }
  getName() {
    return this.name;
  }
  getWins() {
    return this.wins;
  }
  getLoses() {
    return this.loses;
  }
  setWins(w) {
    return this.wins = w;
  }
  setLoses(l) {
    this.loses = l;
  }
}

let url = "https://pokeapi.co/api/v2/pokemon/";
let players = [];
let pokemons_pc = [];
var pokemons_player = [];
var temp_user_name = "el pepe";
var temp_player_wins = 0;
var temp_player_losses = 0;

/******************ATRIBUCION******************/
let crd_plyr_id_1 = document.getElementById("crd_plyr_id_1");
let crd_plyr_name_1 = document.getElementById("crd_plyr_name_1");
let crd_plyr_stats_1 = document.getElementById("crd_plyr_stats_1");
let crd_plyr_img_1 = document.getElementById("crd_plyr_img_1");
let crd_plyr_type_1 = document.getElementById("crd_plyr_type_1");
let crd_plyr_bg_1 = document.getElementById("crd_plyr_bg_1");

let crd_plyr_id_2 = document.getElementById("crd_plyr_id_2");
let crd_plyr_name_2 = document.getElementById("crd_plyr_name_2");
let crd_plyr_stats_2 = document.getElementById("crd_plyr_stats_2");
let crd_plyr_img_2 = document.getElementById("crd_plyr_img_2");
let crd_plyr_type_2 = document.getElementById("crd_plyr_type_2");
let crd_plyr_bg_2 = document.getElementById("crd_plyr_bg_2");

let crd_plyr_id_3 = document.getElementById("crd_plyr_id_3");
let crd_plyr_name_3 = document.getElementById("crd_plyr_name_3");
let crd_plyr_stats_3 = document.getElementById("crd_plyr_stats_3");
let crd_plyr_img_3 = document.getElementById("crd_plyr_img_3");
let crd_plyr_type_3 = document.getElementById("crd_plyr_type_3");
let crd_plyr_bg_3 = document.getElementById("crd_plyr_bg_3");

let crd_fight_id_1 = document.getElementById("crd_fight_id_1");
let crd_fight_name_1 = document.getElementById("crd_fight_name_1");
let crd_fight_stats_1 = document.getElementById("crd_fight_stats_1");
let crd_fight_img_1 = document.getElementById("crd_fight_img_1");
let crd_fight_type_1 = document.getElementById("crd_fight_type_1");
let crd_fight_bg_1 = document.getElementById("crd_fight_bg_1");

let crd_fight_id_2 = document.getElementById("crd_fight_id_2");
let crd_fight_name_2 = document.getElementById("crd_fight_name_2");
let crd_fight_stats_2 = document.getElementById("crd_fight_stats_2");
let crd_fight_img_2 = document.getElementById("crd_fight_img_2");
let crd_fight_type_2 = document.getElementById("crd_fight_type_2");
let crd_fight_bg_2 = document.getElementById("crd_fight_bg_2");

let crd_pc_1 = document.getElementById("crd_pc_1");
let crd_pc_2 = document.getElementById("crd_pc_2");
let crd_pc_3 = document.getElementById("crd_pc_3");

let btn_user_submit = document.getElementById("elpepe");
let div_cards_pc = document.getElementById("div_cards_pc");

/********COLORES*********/
const elementColors = {
  grass: ["#ffffff", "#b6dfa5", "#7cd57a"],
  fire: ["#ffffff", "#e29a67", "#d53636"],
  water: ["#ffffff", "#a5c7df", "#7aacd5"],
  bug: ["#ffffff", "#d1dfa5", "#c2d57a"],
  normal: ["#ffffff", "#dfcda5", "#d5bd7a"],
  poison: ["#ffffff", "#b4a5df", "#807ad5"],
  electric: ["#ffffff", "#f6fb9f", "#fbff56"],
  ground: ["#ffffff", "#bbad8c", "#b9976b"],
  fairy: ["#ffffff", "#daa5df", "#d07ad5"],
  fighting: ["#ffffff", "#e2d067", "#d56f36"],
  psychic: ["#ffffff", "#a567e2", "#8036d5"],
  rock: ["#ffffff", "#ebb04f", "#a36d2c"],
  ghost: ["#ffffff", "#ba95df", "#9965d2"],
  ice: ["#ffffff", "#d8f3fa", "#7cd7f9"],
  dragon: ["#ffffff", "#f9fa49", "#f4c925"],
  dark: ["#ffffff", "#6c6c6c", "#000000"],
  steel: ["#ffffff", "#e6e5e5", "#8c8b8b"],
  flying: ["#ffffff", "#f9f9f9", "#dedede"]
};

cargarPlayersLocal();

async function generarPokemons() {
  for (let i = 0; i < 6; i++) {
    let posicion_pokedex = randomNumber(1, 898);
    if (i <= 2) {
      await generarPokemon(posicion_pokedex, pokemons_player);
    } else {
      await generarPokemon(posicion_pokedex, pokemons_pc);
    }
  }
}

async function generarPokemon(posicion_pokedex, array) {
  let el_pepe = "text";
  await fetch(url + posicion_pokedex)
    .then(response => response.json())
    .then(data => {
      let generated_id = data.id;
      let generated_name = data.name.toUpperCase();
      let generated_type = data.types[0].type.name;
      let generated_img = data.sprites.front_default;
      let prom = 0;
      for (let i = 0; i < data.stats.length; i++) {
        prom += data.stats[i].base_stat;
      }
      prom /= 6;
      let avg_stats = parseInt(prom);
      el_pepe = new Pokemon(generated_id, generated_name, generated_type, avg_stats, generated_img);
    });
  array.push(el_pepe);
}

function randomNumber(min, max) {
  if (min == max && max == 1) {
    return max;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function addPlayer(n, w, l) {
  let_int_w = parseInt(w);
  let_int_l = parseInt(l);
  let existente = false;
  let pos = -1;
  for (let i = 0; i < players.length; i++) {
    if (players[i].getName() == n) {
      existente = true;
      pos = i;
    }
  }
  if (existente) {
    players[pos].setWins(parseInt(players[pos].getWins()) + let_int_w);
    players[pos].setLoses(parseInt(players[pos].getLoses()) + let_int_l);
  } else {
    players.push(new Player(n, let_int_w, let_int_l));
  }
  guardarPlayersLocal();
}

function guardarPlayersLocal() {
  localStorage.setItem("players", JSON.stringify(players));
}

function cargarPlayersLocal() {
  if (localStorage.getItem("players") != null) {
    players = [];
    let players_cargados = JSON.parse(localStorage.getItem("players"));
    for (let i = 0; i < players_cargados.length; i++) {
      players.push(parsearPlayer(players_cargados[i]))
    }
  }
}

function parsearPlayer(object) {
  let valores = Object.values(object)
  let result = new Player(valores[0], valores[1], valores[2]);
  return result;
}

function gradientBackgroundGenerator(type) {
  switch (type) {
    case "grass":
      return `radial-gradient(circle, ${elementColors.grass[0]} 0%, ${elementColors.grass[1]} 50%, ${elementColors.grass[2]} 100%)`;
    case "fire":
      return `radial-gradient(circle, ${elementColors.fire[0]} 0%, ${elementColors.fire[1]} 50%, ${elementColors.fire[2]} 100%)`;
    case "water":
      return `radial-gradient(circle, ${elementColors.water[0]} 0%, ${elementColors.water[1]} 50%, ${elementColors.water[2]} 100%)`;
    case "bug":
      return `radial-gradient(circle, ${elementColors.bug[0]} 0%, ${elementColors.bug[1]} 50%, ${elementColors.bug[2]} 100%)`;
    case "normal":
      return `radial-gradient(circle, ${elementColors.normal[0]} 0%, ${elementColors.normal[1]} 50%, ${elementColors.normal[2]} 100%)`;
    case "poison":
      return `radial-gradient(circle, ${elementColors.poison[0]} 0%, ${elementColors.poison[1]} 50%, ${elementColors.poison[2]} 100%)`;
    case "electric":
      return `radial-gradient(circle, ${elementColors.electric[0]} 0%, ${elementColors.electric[1]} 50%, ${elementColors.electric[2]} 100%)`;
    case "ground":
      return `radial-gradient(circle, ${elementColors.ground[0]} 0%, ${elementColors.ground[1]} 50%, ${elementColors.ground[2]} 100%)`;
    case "fairy":
      return `radial-gradient(circle, ${elementColors.fairy[0]} 0%, ${elementColors.fairy[1]} 50%, ${elementColors.fairy[2]} 100%)`;
    case "fighting":
      return `radial-gradient(circle, ${elementColors.fighting[0]} 0%, ${elementColors.fighting[1]} 50%, ${elementColors.fighting[2]} 100%)`;
    case "psychic":
      return `radial-gradient(circle, ${elementColors.psychic[0]} 0%, ${elementColors.psychic[1]} 50%, ${elementColors.psychic[2]} 100%)`;
    case "rock":
      return `radial-gradient(circle, ${elementColors.rock[0]} 0%, ${elementColors.rock[1]} 50%, ${elementColors.rock[2]} 100%)`;
    case "ghost":
      return `radial-gradient(circle, ${elementColors.ghost[0]} 0%, ${elementColors.ghost[1]} 50%, ${elementColors.ghost[2]} 100%)`
    case "ice":
      return `radial-gradient(circle, ${elementColors.ice[0]} 0%, ${elementColors.ice[1]} 50%, ${elementColors.ice[2]} 100%)`;
    case "dragon":
      return `radial-gradient(circle, ${elementColors.dragon[0]} 0%, ${elementColors.dragon[1]} 50%, ${elementColors.dragon[2]} 100%)`;
    case "dark":
      return `radial-gradient(circle, ${elementColors.dark[0]} 0%, ${elementColors.dark[1]} 50%, ${elementColors.dark[2]} 100%)`;
    case "steel":
      return `radial-gradient(circle, ${elementColors.steel[0]} 0%, ${elementColors.steel[1]} 50%, ${elementColors.steel[2]} 100%)`;
    case "flying":
      return `radial-gradient(circle, ${elementColors.flying[0]} 0%, ${elementColors.flying[1]} 50%, ${elementColors.flying[2]} 100%)`;
  }
};

function asignarPlayerCards() {
  crd_plyr_id_1.innerHTML = `${pokemons_player[0].getId()}`;
  crd_plyr_name_1.innerHTML = `${pokemons_player[0].getName()}`;
  crd_plyr_stats_1.innerHTML = `${pokemons_player[0].getStats()}`;
  crd_plyr_img_1.src = `${pokemons_player[0].getImg()}`;
  crd_plyr_type_1.innerHTML = `${pokemons_player[0].getType()}`;
  crd_plyr_bg_1.style.background = gradientBackgroundGenerator(pokemons_player[0].getType());

  crd_plyr_id_2.innerHTML = `${pokemons_player[1].getId()}`;
  crd_plyr_name_2.innerHTML = `${pokemons_player[1].getName()}`;
  crd_plyr_stats_2.innerHTML = `${pokemons_player[1].getStats()}`;
  crd_plyr_img_2.src = `${pokemons_player[1].getImg()}`;
  crd_plyr_type_2.innerHTML = `${pokemons_player[1].getType()}`;
  crd_plyr_bg_2.style.background = gradientBackgroundGenerator(pokemons_player[1].getType());

  crd_plyr_id_3.innerHTML = `${pokemons_player[2].getId()}`;
  crd_plyr_name_3.innerHTML = `${pokemons_player[2].getName()}`;
  crd_plyr_stats_3.innerHTML = `${pokemons_player[2].getStats()}`;
  crd_plyr_img_3.src = `${pokemons_player[2].getImg()}`;
  crd_plyr_type_3.innerHTML = `${pokemons_player[2].getType()}`;
  crd_plyr_bg_3.style.background = gradientBackgroundGenerator(pokemons_player[2].getType());
}

function asignarBattleCards(index) {
  crd_fight_bg_1.classList.remove("invisible");
  crd_fight_id_1.innerHTML = `${pokemons_player[index].getId()}`;
  crd_fight_name_1.innerHTML = `${pokemons_player[index].getName()}`;
  crd_fight_stats_1.innerHTML = `${pokemons_player[index].getStats()}`;
  crd_fight_img_1.src = `${pokemons_player[index].getImg()}`;
  crd_fight_type_1.innerHTML = `${pokemons_player[index].getType()}`;
  crd_fight_bg_1.style.background = gradientBackgroundGenerator(pokemons_player[index].getType());

  crd_fight_bg_2.classList.remove("invisible");
  crd_fight_id_2.innerHTML = `${pokemons_pc[index].getId()}`;
  crd_fight_name_2.innerHTML = `${pokemons_pc[index].getName()}`;
  crd_fight_stats_2.innerHTML = `${pokemons_pc[index].getStats()}`;
  crd_fight_img_2.src = `${pokemons_pc[index].getImg()}`;
  crd_fight_type_2.innerHTML = `${pokemons_pc[index].getType()}`;
  crd_fight_bg_2.style.background = gradientBackgroundGenerator(pokemons_pc[index].getType());
}



function combatirPokemons(index) {
  let poke_player = pokemons_player[index];
  let poke_pc = pokemons_pc[index];
  let poke_player_power = poke_player.getStats();
  let poke_pc_power = poke_pc.getStats();
  let poke_player_type = poke_player.getType();
  let poke_pc_type = poke_pc.getType();

  console.log(poke_player_power, poke_player_type, " VS ", poke_pc_power, poke_pc_type);

  if (esDebil(poke_player_type, poke_pc_type)) {

    poke_player_power = poke_player_power * 0.5;
    console.log("player es debil");
  }
  if (esDebil(poke_pc_type, poke_player_type)) {

    poke_pc_power = poke_pc_power * 0.5;
    console.log("pc es debil");
  }
  if (poke_player_power >= poke_pc_power) {
    temp_player_wins++;
    return "player";
  }
  if (poke_player_power < poke_pc_power) {
    temp_player_losses++;
    return "pc";
  }
  console.log("V", temp_player_wins, "D", temp_player_losses);
}

function esDebil(a, b) {
  let ret = false;
  switch (a) {
    case "normal":
      if (b == "fighting") {
        ret = true;
      }
      break;
    case "fire":
      if (b == "water" || b == "tierra" || b == "rock") {
        ret = true;
      }
      break;
    case "water":
      if (b == "grass" || b == "electric") {
        ret = true;
      }
      break;
    case "grass":
      if (b == "fire" || b == "ice" || b == "poison" || b == "flying" || b == "bug") {
        ret = true;
      }
      break;
    case "electric":
      if (b == "tierra") {
        ret = true;
      }
      break;
    case "ice":
      if (b == "fire" || b == "fighting" || b == "rock" || b == "steel") {
        ret = true;
      }
      break;
    case "fighting":
      if (b == "flying" || b == "psychic" || b == "fairy") {
        ret = true;
      }
      break;
    case "poison":
      if (b == "tierra" || b == "psychic") {
        ret = true;
      }
      break;
    case "tierra":
      if (b == "water" || b == "grass" || b == "ice") {
        ret = true;
      }
      break;
    case "flying":
      if (b == "electric" || b == "ice" || b == "rock") {
        ret = true;
      }
      break;
    case "psychic":
      if (b == "bug" || b == "ghost" || b == "dark") {
        ret = true;
      }
      break;
    case "bug":
      if (b == "fire" || b == "flying" || b == "rock") {
        ret = true;
      }
      break;
    case "rock":
      if (b == "water" || b == "grass" || b == "fighting" || b == "tierra" || b == "steel") {
        ret = true;
      }
      break;
    case "ghost":
      if (b == "ghost" || b == "dark") {
        ret = true;
      }
      break;
    case "dragon":
      if (b == "ice" || b == "dragon" || b == "fairy") {
        ret = true;
      }
      break;
    case "dark":
      if (b == "fighting" || b == "bug" || b == "fairy") {
        ret = true;
      }
      break;
    case "steel":
      if (b == "fighting" || b == "tierra" || b == "fire") {
        ret = true;
      }
      break;
    case "fairy":
      if (b == "poison" || b == "steel") {
        ret = true;
      }
      break;
  }
  return ret;
}

function animacionInicial() {
  //animacion al abrir el juego
}

function mostrarRound() {
  //animacion al abrir el juego
}

function userScreen() {
  //mostrar pantalla de usuario
}
let array_indices = [1, 2, 3];

function removeRandomPcCard() {
  let indice_a_cargarse = randomNumber(1, array_indices.length);
  indice_a_cargarse--;
  if (array_indices[indice_a_cargarse] == 1) {
    array_indices.splice(indice_a_cargarse, 1);
    crd_pc_1.classList.add("d-none");
  } else if (array_indices[indice_a_cargarse] == 2) {
    array_indices.splice(indice_a_cargarse, 1);
    crd_pc_2.classList.add("d-none");
  } else if (array_indices[indice_a_cargarse] == 3) {
    array_indices.splice(indice_a_cargarse, 1);
    crd_pc_3.classList.add("d-none");
  }
}

function invocarCarta(index) {
  if (index == 0) {
    crd_plyr_bg_1.classList.add("d-none");
    removeRandomPcCard();
    asignarBattleCards(index);
  }
  if (index == 1) {
    crd_plyr_bg_2.classList.add("d-none");
    removeRandomPcCard();
    asignarBattleCards(index);
  }
  if (index == 2) {
    crd_plyr_bg_3.classList.add("d-none");
    removeRandomPcCard();
    asignarBattleCards(index);
  }
}

function scoreScreen() {
  console.log("llegue al final");
  if(temp_player_wins > temp_player_losses){
    addPlayer(temp_user_name, 1, 0);
  }else{
    addPlayer(temp_user_name, 0, 1);
  }
  temp_player_wins = 0;
  temp_player_wins = 0;
  console.log(players);
}

function animarGanador() {

}

function duelo(card, turno) {
  turno++;
  return new Promise((resolve) => {
    crd_plyr_bg_1.onclick = function () {};
    crd_plyr_bg_2.onclick = function () {};
    crd_plyr_bg_3.onclick = function () {};
    let ganador = combatirPokemons(card);
    if (ganador == "player") {
      animarGanador(crd_fight_bg_1);
      console.log("WINNER", pokemons_player[card].getName());
      console.log("Victorias", temp_player_wins, "Derrotas ", temp_player_losses);
    }
    if (ganador == "pc") {
      animarGanador(crd_fight_bg_2);
      console.log("WINNER", pokemons_pc[card].getName());
      console.log("Victorias", temp_player_wins, "Derrotas ", temp_player_losses);
    }
    let timerId = setTimeout(function tick() {
      generarBattleField(turno);
      resolve("duelo terminado");
    }, 1000)
  });
}

async function generarBattleField(turno) {
  //animar la entrada al batlefiled
  return el_pepe = new Promise((resolve) => {
    let clickeable = true;
    mostrarRound(turno);
    crd_plyr_bg_1.onclick = async function () {
      if (clickeable && turno < 4) {
        clickeable = false;
        invocarCarta(0);
        await duelo(0, turno);
        mostrarRound(turno);
        clickeable = true;
      }
    }
    crd_plyr_bg_2.onclick = async function () {
      if (clickeable && turno < 4) {
        clickeable = false;
        invocarCarta(1);
        await duelo(1, turno);
        mostrarRound(turno);
        clickeable = true;
      }
    }
    crd_plyr_bg_3.onclick = async function () {
      if (clickeable && turno < 4) {
        clickeable = false;
        invocarCarta(2);
        await duelo(2, turno);
        mostrarRound(turno);
        clickeable = true;
      }
    }
    if (turno == 4) {
      scoreScreen();
      resolve();
    }
  });
}

function hacerBattleCardsInvisibles() {
  crd_fight_bg_1.classList.add("invisible");
  crd_fight_bg_2.classList.add("invisible");
}

async function secuenciaDeAcontecimientos() {
  animacionInicial();
  hacerBattleCardsInvisibles();
  userScreen();
  await generarPokemons();
  /************* DESPUES DE FETCH ***************/
  asignarPlayerCards();

  //meter usuario

  generarBattleField(1);

}

secuenciaDeAcontecimientos();


/************LOGICA*************/
/*
welcome to pokemon developed by

USER SCREEN
user screen
-pedir user
-guardar el nombre

COMBATIR

cargar datos
animacion pequeña


R1
correr un pequeño time
anim start round
sacar carta y llevar al medio junto a la de pc
pelea con animacion cool 
resultado de pelea
actualizar contadores V y D

R2
correr un pequeño time
anim start round
sacar carta y llevar al medio junto a la de pc
pelea con animacion cool 
resultado de pelea
actualizar contadores V y D

R3
correr un pequeño time
anim start round
sacar carta y llevar al medio junto a la de pc
pelea con animacion cool 
resultado de pelea
actualizar contadores V y D

dejar correr un tiempo

mostrar player X wins : pc Y wins
player o pc wins
add plyaer con 1,0 o 0,1
oedenar lista por victorias

END SCREEN
listar players
volver a jugar --> call combatir
cambiar player --> call user Screen
salir -- > call juegos

*/