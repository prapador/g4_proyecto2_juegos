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
let player_type_3 = document.getElementById("player_type_3");

const changeCardColor = (card, type) => {
  switch (type) {
      case "grass":
          card.style.background = `radial-gradient(circle, ${elementColors.grass[0]} 0%, ${elementColors.grass[1]} 50%, ${elementColors.grass[2]} 100%)`;
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
  player_type_3.innerHTML = `${pokemons_player[2].getType()}`;
}



async function combatirPokemos(index) {
  await asignarPlayerCards();
  let poke_player = pokemons_player[index];
  let poke_pc = pokemons_pc[index];
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
          if (b == "water" || b == "tierra" || b == "roca") {
              ret = true;
          }
          break;
      case "water":
          if (b == "grass" || b == "eléctrico") {
              ret = true;
          }
          break;
      case "grass":
          if (b == "fire" || b == "hielo" || b == "veneno" || b == "volador" || b == "bicho") {
              ret = true;
          }
          break;
      case "eléctrico":
          if (b == "tierra") {
              ret = true;
          }
          break;
      case "hielo":
          if (b == "fire" || b == "fighting" || b == "roca" || b == "acero") {
              ret = true;
          }
          break;
      case "fighting":
          if (b == "volador" || b == "psiquico" || b == "hada") {
              ret = true;
          }
          break;
      case "veneno":
          if (b == "tierra" || b == "psiquico") {
              ret = true;
          }
          break;
      case "tierra":
          if (b == "water" || b == "grass" || b == "hielo") {
              ret = true;
          }
          break;
      case "volador":
          if (b == "electrico" || b == "hielo" || b == "roca") {
              ret = true;
          }
          break;
      case "psíquico":
          if (b == "bicho" || b == "fantasma" || b == "siniestro") {
              ret = true;
          }
          break;
      case "bicho":
          if (b == "fire" || b == "volador" || b == "roca") {
              ret = true;
          }
          break;
      case "roca":
          if (b == "water" || b == "grass" || b == "fighting" || b == "tierra" || b == "acero") {
              ret = true;
          }
          break;
      case "fantasma":
          if (b == "fantasma" || b == "siniestro") {
              ret = true;
          }
          break;
      case "dragón":
          if (b == "hielo" || b == "dragon" || b == "hada") {
              ret = true;
          }
          break;
      case "siniestro":
          if (b == "fighting" || b == "bicho" || b == "hada") {
              ret = true;
          }
          break;
      case "acero":
          if (b == "fighting" || b == "tierra" || b == "fire") {
              ret = true;
          }
          break;
      case "hada":
          if (b == "veneno" || b == "acero") {
              ret = true;
          }
          break;
  }
  return ret;
}