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
    return (this.wins = w);
  }
  setLoses(l) {
    this.loses = l;
  }
}

let url = "https://pokeapi.co/api/v2/pokemon/";
let players = [];
let pokemons_pc = [];
let pokemons_player = [];

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

async function generarPokemon(posicion_pokedex, array,) {
  let response = await fetch(url + posicion_pokedex);
  data = await response.json();
  console.log(data);
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
  array.push(
    new Pokemon(
      generated_id,
      generated_name,
      generated_type,
      avg_stats,
      generated_img
    )
  );
      return


  // console.log(pokemons_player[1]);

// addPlayer("pepe", 2, 45);
// console.log(players);

// player_name_3.innerHTML = `${pokemons_player[0].getName()}`;
// player_stats_3.innerHTML = `${pokemons_player[0].getStats()}`;
// player_img_3.style.src = `${pokemons_player[0].getName()}`;
// player_type_3 = `${pokemons_player[0].getType()}`;

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
      players.push(parsearPlayer(players_cargados[i]));
    }
  }
}

function parsearPlayer(object) {
  let valores = Object.values(object);
  let result = new Player(valores[0], valores[1], valores[2]);
  return result;
}

let player_name_3 = document.getElementById("player_name_3");
let player_stats_3 = document.getElementById("player_stats_3");
let player_img_3 = document.getElementById("player_img_3");
let player_type_3 = document.getElementById("player_type_3");


async function call () {
await generarPokemons()
  console.log(pokemons_player[2]);
}
call()

player_name_3.innerHTML = `${pokemons_player[0].getName()}`;
player_stats_3.innerHTML = `${pokemons_player[0].getStats()}`;
player_img_3.style.src = `${pokemons_player[0].getName()}`;
player_type_3 = `${pokemons_player[0].getType()}`;
