let dadosMaquina = [
  {
    buttonName: "AVANÇA TÁBUA",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Delay Leitura Sensor Ótico"],
    minificados: ["teMaAv", "teMaRe", "deLeSeOt"],
    values: [1000, 2000, 50],
  },
  {
    buttonName: "BOMBA",
    inputs: ["Tempo de Partida"],
    minificados: ["tePa"],
    values: [3000]
  },
  {
    buttonName: "CHAVE MOLDE",
    inputs: ["Tempo para Posição 1", "Tempo para Posição 2", "Tempo para Posição 3"],
    minificados: ["tePo1", "tePo2", "tePo3"],
    values: [6000, 7000, 8000]
  },
  {
    buttonName: "COCHO",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Tempo para Começar Vibra", "Tempo Vibrando Parado", "Tempo Recuando sem Vibrar", "Tempo Avançanda sem Vibrar"],
    minificados: ["teMaAv", "teMaRe", "teCoVi", "teViPa", "teReSeVi", "teAvSeVi"],
    values: [5000, 6000, 3000, 1500, 3000, 2500]
  },
  {
    buttonName: "ESTOQUE",
    inputs: ["Quantidade"],
    minificados: ["qtd"],
    values: [7]
  },
  {
    buttonName: "FEMEA",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida", "Tempo Alívio", "Tempo Afasta", "Tempo Vibra", "Tempo Inércia dos Vibra"],
    minificados: ["teMaSu", "teMaDe", "teAl", "teAf", "teVi", "teInVi"],
    values: [3000, 4000, 200, 1000, 7000, 1200]
  },
  {
    buttonName: "MACHO",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida"],
    minificados: ["teMaSu", "teMaDe"],
    values: [4000, 10000]
  }
];

let dadosOutros = [
  {
    buttonName: "ALARME",
    inputs: ["Lista de Erros"],
    minificados: ["liEr"],
    values: ["Erro1", "Erro2", "Erro3", "Erro4", "Erro5", "Erro6", "Erro7", "Erro8", "Erro9", "Erro10"]
  },
  {
    buttonName: "MEMÓRIA",
    inputs: ["Contagem"],
    minificados: ["ctg"],
    values: [987]
  },
];

let historicoDaPaginaConfiguracoes = {
  idDiv: "",
  indexBotao: ""
}

// function debug() {
//   esconderDiv('iHeader')
//   esconderDiv('iMaquina');
//   esconderDiv('iOutros');
//   esconderDiv('iConfiguracoes');
//   esconderDiv('iNavegacao');
//   esconderDiv('iFooter');
// } 
// debug();  //Comente para produção

function start() {
  montarBotoesDaDiv('iConteudoMaquina');
  montarBotoesDaDiv('iConteudoOutros');
  esconderDiv('iConfiguracoes');
  esconderDiv('iNavegacao');
} start();

function montarBotoesDaDiv(idDiv) {
  const dados = pegarDadosReferenteADiv(idDiv);
  let htmlDosBotoes = "";

  dados.forEach((dado, index)=>{
    htmlDosBotoes += `<button id="${index}" class="cBotao cBotaoAzul" onclick="vaiParaConfiguracoes(this.parentElement.id, this.id)">${dado.buttonName}</button>`;
  });
  document.getElementById(idDiv).innerHTML = htmlDosBotoes;
}

function pegarDadosReferenteADiv(idDiv) {
  if(idDiv === 'iConteudoMaquina') return dadosMaquina;
  else if(idDiv === 'iConteudoOutros') return dadosOutros;
}

function esconderDiv(idDiv) {
  document.getElementById(idDiv).style.display = "none";
}

function mostrarDiv(idDiv) {
  document.getElementById(idDiv).style.display = "";
}

function vaiParaConfiguracoes(idDivPai, idBotao) {
  const dados = pegarDadosReferenteADiv(idDivPai);
  let htmlInputs = montarHtmlInputs(dados[idBotao]);

  setHistoricoDaPagina(idDivPai, idBotao);
  document.getElementById('iTituloConfiguracoes').innerHTML = dados[idBotao].buttonName;
  document.getElementById('iConteudoConfiguracoes').innerHTML = htmlInputs;

  esconderDiv('iMaquina');
  esconderDiv('iOutros');
  mostrarDiv('iConfiguracoes');
  mostrarDiv('iNavegacao');
}

function setHistoricoDaPagina(div, botao) {
  historicoDaPaginaConfiguracoes.idDiv = div;
  historicoDaPaginaConfiguracoes.indexBotao = botao;
}

function montarHtmlInputs(dado) {
  let htmlInputs = "";
  let sufixo = "ms";

  if(dado.buttonName === "MEMÓRIA" || dado.buttonName === "ESTOQUE") sufixo = "tábuas";
  
  if(dado.buttonName === "ALARME") {
    let minificado = dado.minificados[0];
    let input = dado.inputs[0];
    let valor = "";

    dado.values.forEach((value)=>{
      valor += value+"\n";
    });
    
    htmlInputs = `
      <p>
        <label for="${minificado}">${input}</label><br>
        <textarea id="${minificado}" name="${minificado}" rows="10" cols="40">${valor}</textarea>
      </p>`;
  }
  else {
    dado.inputs.forEach((input, index)=>{
      let minificado = dado.minificados[index];
      let valor = dado.values[index];

      htmlInputs += `
        <p>
          <label for="${minificado}">${input}</label><br>
          <input type="number" name="${minificado}" id="${minificado}" value="${valor}" min="0" max="15000"> ${sufixo}
        </p>`;
    });
  }

  return htmlInputs;
}

function btGoHome() {
  mostrarDiv('iMaquina');
  mostrarDiv('iOutros');
  start();
}

function btReset() {
  vaiParaConfiguracoes(historicoDaPaginaConfiguracoes.idDiv, historicoDaPaginaConfiguracoes.indexBotao);
}

function btSave() {
  // pegar todos os inputs
  // protocolar
  // enviar para o clp
}