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
var temp_player_wins = 0;
var temp_player_losses = 0;

cargarPlayersLocal();

async function generarPokemons() {
  console.log("entro a generar pokemonS")
  for (let i = 0; i < 6; i++) {
    let posicion_pokedex = randomNumber(1, 898);
    if (i <= 2) {
      await generarPokemon(posicion_pokedex, pokemons_player);
      console.log("paso await genero player")
    } else {
      await generarPokemon(posicion_pokedex, pokemons_pc);
      console.log("paso await genero pc")
    }
  }
}

async function generarPokemon(posicion_pokedex, array) {
  console.log("entro a generar pokemoN")
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
  console.log("pusheo en generar pokemoN")
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      console.log(pos, existente);
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
/*
let player_name_1 = document.getElementById("player_name_1");
let player_stats_1 = document.getElementById("player_stats_1");
let player_img_1 = document.getElementById("player_img_1");
let player_type_1 = document.getElementById("player_type_1");

let player_name_2 = document.getElementById("player_name_2");
let player_stats_2 = document.getElementById("player_stats_2");
let player_img_2 = document.getElementById("player_img_2");
let player_type_2 = document.getElementById("player_type_2");

let player_name_3 = document.getElementById("player_name_3");
let player_stats_3 = document.getElementById("player_stats_3");
let player_img_3 = document.getElementById("player_img_3");
let player_type_3 = document.getElementById("player_type_3");*/

const changeCardColor = (card, type) => {
  switch (type) {
    case "plant":
      card.style.background = `radial-gradient(circle, ${elementColors.plant[0]} 0%, ${elementColors.plant[1]} 50%, ${elementColors.plant[2]} 100%)`;
      break;
    case "fire":
      card.style.background = `radial-gradient(circle, ${elementColors.fire[0]} 0%, ${elementColors.fire[1]} 50%, ${elementColors.fire[2]} 100%)`;
      break;
    case "water":
      card.style.background = `radial-gradient(circle, ${elementColors.water[0]} 0%, ${elementColors.water[1]} 50%, ${elementColors.water[2]} 100%)`;
      break;
    case "bug":
      card.style.background = `radial-gradient(circle, ${elementColors.bug[0]} 0%, ${elementColors.bug[1]} 50%, ${elementColors.bug[2]} 100%)`;
      break;
    case "normal":
      card.style.background = `radial-gradient(circle, ${elementColors.normal[0]} 0%, ${elementColors.normal[1]} 50%, ${elementColors.normal[2]} 100%)`;
      break;
    case "poison":
      card.style.background = `radial-gradient(circle, ${elementColors.poison[0]} 0%, ${elementColors.poison[1]} 50%, ${elementColors.poison[2]} 100%)`;
      break;
    case "electric":
      card.style.background = `radial-gradient(circle, ${elementColors.electric[0]} 0%, ${elementColors.electric[1]} 50%, ${elementColors.electric[2]} 100%)`;
      break;
    case "ground":
      card.style.background = `radial-gradient(circle, ${elementColors.ground[0]} 0%, ${elementColors.ground[1]} 50%, ${elementColors.ground[2]} 100%)`;
      break;
    case "fairy":
      card.style.background = `radial-gradient(circle, ${elementColors.fairy[0]} 0%, ${elementColors.fairy[1]} 50%, ${elementColors.fairy[2]} 100%)`;
      break;
    case "fighting":
      card.style.background = `radial-gradient(circle, ${elementColors.fighting[0]} 0%, ${elementColors.fighting[1]} 50%, ${elementColors.fighting[2]} 100%)`;
      break;
    case "psychic":
      card.style.background = `radial-gradient(circle, ${elementColors.psychic[0]} 0%, ${elementColors.psychic[1]} 50%, ${elementColors.psychic[2]} 100%)`;
      break;
    case "rock":
      card.style.background = `radial-gradient(circle, ${elementColors.rock[0]} 0%, ${elementColors.rock[1]} 50%, ${elementColors.rock[2]} 100%)`;
      break;
    case "ghost":
      card.style.background = `radial-gradient(circle, ${elementColors.ghost[0]} 0%, ${elementColors.ghost[1]} 50%, ${elementColors.ghost[2]} 100%)`;
      break;
    case "ice":
      card.style.background = `radial-gradient(circle, ${elementColors.ice[0]} 0%, ${elementColors.ice[1]} 50%, ${elementColors.ice[2]} 100%)`;
      break;
    case "dragon":
      card.style.background = `radial-gradient(circle, ${elementColors.dragon[0]} 0%, ${elementColors.dragon[1]} 50%, ${elementColors.dragon[2]} 100%)`;
      break;
    case "dark":
      card.style.background = `radial-gradient(circle, ${elementColors.dark[0]} 0%, ${elementColors.dark[1]} 50%, ${elementColors.dark[2]} 100%)`;
      break;
    case "steel":
      card.style.background = `radial-gradient(circle, ${elementColors.steel[0]} 0%, ${elementColors.steel[1]} 50%, ${elementColors.steel[2]} 100%)`;
      break;
    case "flying":
      card.style.background = `radial-gradient(circle, ${elementColors.flying[0]} 0%, ${elementColors.flying[1]} 50%, ${elementColors.flying[2]} 100%)`;
      break;
  }
};

async function asignarPlayerCards() {
  await generarPokemons();
  /*
    player_name_1.innerHTML = `${pokemons_player[0].getName()}`;
    player_stats_1.innerHTML = `${pokemons_player[0].getStats()}`;
    player_img_1.src = `${pokemons_player[0].getImg()}`;
    player_type_1.innerHTML = `${pokemons_player[0].getType()}`;

    player_name_2.innerHTML = `${pokemons_player[1].getName()}`;
    player_stats_2.innerHTML = `${pokemons_player[1].getStats()}`;
    player_img_2.src = `${pokemons_player[1].getImg()}`;
    player_type_2.innerHTML = `${pokemons_player[1].getType()}`;

    player_name_3.innerHTML = `${pokemons_player[2].getName()}`;
    player_stats_3.innerHTML = `${pokemons_player[2].getStats()}`;
    player_img_3.src = `${pokemons_player[2].getImg()}`;
    player_type_3.innerHTML = `${pokemons_player[2].getType()}`;*/
}



async function combatirPokemos(index) {
  await generarPokemons();
  console.log()
  let poke_player = pokemons_player[index];
  let poke_pc = pokemons_pc[index];/*
  let poke_player_power = poke_player.getStats();
  let poke_pc_power = poke_pc.getStats();
  let poke_player_type = poke_player.getType();
  let poke_pc_type = poke_pc.getType();*/

  let poke_player_power = 100;
let poke_pc_power = 100;
let poke_player_type = "plant";
let poke_pc_type = "fire";

  console.log(poke_player_power, poke_player_type, " VS ", poke_pc_power, poke_pc_type);
  
  if (esDebil(poke_player_type, poke_pc_type)) {

    poke_player_power = poke_player_power * 0.75;
    console.log("player es debil");
  }
  if (esDebil(poke_pc_type, poke_player_type)) {

    poke_pc_power = poke_pc_power * 0.75;
    console.log("pc es debil");
  }
  if(poke_player_power >= poke_pc_power){
    temp_player_wins ++;
  }
  if(poke_player_power < poke_pc_power){
    temp_player_losses ++;
  }
  console.log("V",temp_player_wins,"D",temp_player_losses)
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
      if (b == "plant" || b == "electric") {
        ret = true;
      }
      break;
    case "plant":
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
      if (b == "water" || b == "plant" || b == "ice") {
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
      if (b == "water" || b == "plant" || b == "fighting" || b == "tierra" || b == "steel") {
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