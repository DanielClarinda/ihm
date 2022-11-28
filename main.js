const dadosMaquina = [
  {
    nome: "AVANÇA TÁBUA",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Delay leitura sensor Ótico"]
  },
  {
    nome: "BOMBA",
    inputs: ["Tempo de Partida"]
  },
  {
    nome: "CHAVE MOLDE",
    inputs: ["Tempo para Posição 1", "Tempo para Posição 2", "Tempo para Posição 3"]
  },
  {
    nome: "COCHO",
    inputs: ["Tempo Máximo de Avança", "Tempo Máximo de Recua", "Tempo para Começar a vibrar", "Tempo Vibrando Parado", "Tempo Recuando sem Vibrar", "Tempo Avançanda sem Vibrar"]
  },
  {
    nome: "ESTOQUE",
    inputs: ["Quantidade"]
  },
  {
    nome: "FEMEA",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida", "Tempo Alívio", "Tempo Afasta", "Tempo Vibra", "Tempo Inércia dos Vibra"]
  },
  {
    nome: "MACHO",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida"]
  }
];

const dadosOutros = [
  {
    nome: "ALARME",
    inputs: ["Lista de Erros"]
  },
  {
    nome: "MEMÓRIA",
    inputs: ["Contagem"]
  },
];

function debug() {
  esconderDiv('divHeader')
  esconderDiv('divMaquina');
  esconderDiv('divOutros');
  esconderDiv('divConfiguracoes');
  esconderDiv('divNavegacao');
  esconderDiv('divFooter');
} 
// debug();  //Comente para produção

function start() {
  montarBotoesDiv('divConteudoMaquina');
  montarBotoesDiv('divConteudoOutros');
  esconderDiv('divConfiguracoes');
  esconderDiv('divNavegacao');
} 
start();  //comente para debugar

function montarBotoesDiv(div) {
  const valores = pegarValoresReferenteDiv(div);
  let htmlBotoes = "";

  valores.forEach((valor, index)=>{
    htmlBotoes += `<button id="${index}" class="botao btAzul" onclick="vaiParaConfiguracoes(this.parentElement.id, this.id)">${valor.nome}</button>`;
  });

  document.getElementById(div).innerHTML = htmlBotoes;
}

function pegarValoresReferenteDiv(div) {
  let valores;

  if(div === 'divConteudoMaquina') valores = dadosMaquina;
  else if(div === 'divConteudoOutros') valores = dadosOutros;

  return valores;
}

function esconderDiv(div) {
  document.getElementById(div).style.display = "none";
}

function mostrarDiv(div) {
  document.getElementById(div).style.display = "";
}

function vaiParaConfiguracoes(dessaDiv, botaoSelecionado) {
  const valores = pegarValoresReferenteDiv(dessaDiv);
  let htmlInputs = `<h3 class="subTitulo">${valores[botaoSelecionado].nome}</h3>`;

  valores[botaoSelecionado].inputs.forEach((input, index)=>{
    htmlInputs += `
      <p>
        <label for="x">${input}</label><br>
        <input type="number" name="x" id="x" value="123" min="0" max="15000"> ms
      </p>`
  });
  
  document.getElementById('divConteudoConfiguracoes').innerHTML = htmlInputs;

  esconderDiv('divMaquina');
  esconderDiv('divOutros');
  mostrarDiv('divConfiguracoes');
  mostrarDiv('divNavegacao');
}

function goHome() {
  mostrarDiv('divMaquina');
  mostrarDiv('divOutros');
  start();
}

function reset() {


  // document.getElementById('divConteudoConfiguracoes').innerHTML = //novamente o conteudo
}

function save() {
}