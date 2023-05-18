//Parâmetros da Bolinha.
let xBolinha = 400;
let yBolinha = 250;
const diametro = 20;
const raio = diametro /2;

//Velocidade.
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

let colisaoGitHub = false;

//Pontuação
let meusPontos = 0;
let pontosOponente = 0;

//Sons
let somPonto;
let somRaquete;
let somTrilha;

//Chance de Erro
let chanceDeErrar = 0;


function preload () {
  somTrilha = loadSound ("trilha.mp3");
  somPonto = loadSound ("ponto.mp3");
  somRaquete = loadSound ("raquete.mp3");
}


function setup() {
  createCanvas(800, 500);
  somTrilha.loop();
}

function draw() {
  background(color (0,128,0));
  bolinha();
  velocidade();
  colisao();
  raquete(xRaquete,yRaquete);
  movimentoRaquete();
  colisaoRaquete();
  colisaoRaqueteGitHub(xRaquete,yRaquete);
  raquete (xRaqueteOponente,yRaqueteOponente);
  movimentoRaqueteOponente ();
  colisaoRaqueteGitHub(xRaqueteOponente,yRaqueteOponente);
  placar ();
  pontuacao ();
  bolinhaNaoFicaPresa ();
}

function bolinha (){
  circle(xBolinha,yBolinha,diametro);
}
function velocidade (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function colisao (){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  } 
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  } 
}

//Parâmetros da Raquete;
let xRaquete = 10;
let yRaquete = 250;
const wRaquete = 10;
const hRaquete = 140;
const borda1Raquete = 25;

//Parâmetros da Raquete do Oponete;
let xRaqueteOponente = 780;
let yRaqueteOponente = 250;
let velocidadeYRaquete;


function raquete (x,y){
  rect(x,y,wRaquete,hRaquete);
}
function movimentoRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaquete (){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function colisaoRaqueteGitHub (x,y) {
  colisaoGitHub = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colisaoGitHub){
    velocidadeXBolinha *= -1;
    somRaquete.play ();

  }
}

function movimentoRaqueteOponente () {
   velocidadeYRaquete = yBolinha - yRaqueteOponente - hRaquete / 2 - 30
    yRaqueteOponente += velocidadeYRaquete + chanceDeErrar
    calcularChanceErrar();
}

function placar () {
  stroke (255)
  textAlign (CENTER);
  textSize (20);
  fill (color(0,128,128));
  rect (200, 12.5, 40, 20, 25);
  fill (255);
  text (meusPontos, 220, 30);
  fill (color(0,128,128));
  rect (600, 12.5, 40, 20, 25);
  fill (255);
  text (pontosOponente, 620, 30);
}

function pontuacao () {
  if (xBolinha > 790){
    meusPontos += 1;
    somPonto.play ();
  }
  if (xBolinha < 9){
    pontosOponente += 1;
    somPonto.play ();
  }
}

function calcularChanceErrar () {
  if (pontosOponente > meusPontos) {
    chanceDeErrar += 1;
      if (chanceDeErrar >= 39){
        chanceDeErrar = 40;
      }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
} 


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 400
    }
}



