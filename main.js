// import dbMaquina from './dataBase/dbMaquina.json' assert {type: 'json'};
// import dbOutros from './dataBase/dbOutros.json' assert {type: 'json'};

const dbMaquina = [
  {
    buttonName: "AVANÇA TÁBUA",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Delay Leitura Sensor Ótico"],
    minificados: ["teMaAv", "teMaRe", "deLeSeOt"],
    values: [1000, 2000, 50]
  },
  {
    buttonName: "BOMBA",
    inputs: ["Tempo de Partida"],
    minificados: ["tePa"],
    values: [3000]
  },
  {
    buttonName: "CHAVE MOLDE",
    inputs: ["Tempo Molde 1", "Tempo Molde 2", "Tempo Molde 3"],
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

const dbOutros = [
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
  }
];

let historicoBotaoClicado = {
  idDiv: "",
  indexBotao: ""
};

const senha = "Daniel";
let dadosColetados = {
  titulo: "",
  valores: ""
};

// var input = document.getElementById("myInput");

// input.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     document.getElementById("btEnter").click();
//   }
// });

// function debug() {
//   esconderDiv('iHeader')
//   esconderDiv('iMaquina');
//   esconderDiv('iOutros');
//   esconderDiv('iConfiguracoes');
//   esconderDiv('iNavegacao');
//   // esconderDiv('iNavegacao2');
//   // esconderDiv('iSenha');
//   esconderDiv('iFooter');
// } debug();  //Comente para produção

function start() {
  montarBotoesNaDiv('iConteudoMaquina');
  montarBotoesNaDiv('iConteudoOutros');
  esconderDiv('iConfiguracoes');
  esconderDiv('iNavegacao');
  esconderDiv('iSenha');
  esconderDiv('iNavegacao2');
} 
start();

function montarBotoesNaDiv(idDiv) {
  let htmlDosBotoes = "";
  const dados = pegarDadosReferenteADiv(idDiv);

  dados.forEach((dado, index)=>{
    htmlDosBotoes += `<button id="${index}" class="cBotao cBotaoAzul" onclick="acessarConfiguracoes(this.parentElement.id, this.id)">${dado.buttonName}</button>`;
  });
  document.getElementById(idDiv).innerHTML = htmlDosBotoes;
}

function pegarDadosReferenteADiv(idDiv) {
  if(idDiv === 'iConteudoMaquina') return dbMaquina;
  else if(idDiv === 'iConteudoOutros') return dbOutros;
}

function esconderDiv(idDiv) {
  document.getElementById(idDiv).style.display = "none";
}

function mostrarDiv(idDiv) {
  document.getElementById(idDiv).style.display = "";
}

function acessarConfiguracoes(idDivPai, indexBotao) {
  const dados = pegarDadosReferenteADiv(idDivPai);
  let htmlInputs = montarHtmlInputs(dados[indexBotao]);

  salvarBotaoClicado(idDivPai, indexBotao);
  document.getElementById('iTituloConfiguracoes').innerHTML = dados[indexBotao].buttonName;
  document.getElementById('iConteudoConfiguracoes').innerHTML = htmlInputs;

  esconderDiv('iMaquina');
  esconderDiv('iOutros');
  mostrarDiv('iConfiguracoes');
  mostrarDiv('iNavegacao');
  esconderDiv('iSenha');
  esconderDiv('iNavegacao2');
}

function montarHtmlInputs(dadosDoBotao) {
  let htmlInputs = "";
  let sufixo = "ms";
  let minificado = "";
  let valor = "";

  if(dadosDoBotao.buttonName === "MEMÓRIA" || dadosDoBotao.buttonName === "ESTOQUE") sufixo = "tábuas";
  
  if(dadosDoBotao.buttonName === "ALARME") {
    minificado = dadosDoBotao.minificados[0];
    input = dadosDoBotao.inputs[0];

    dadosDoBotao.values.forEach((value)=>{
      valor += value+"\n";
    });
    
    htmlInputs = `
      <p>
        <label for="${minificado}">${input}</label><br>
        <textarea id="${minificado}" name="${minificado}" class="cInputsConfiguracoes" rows="10" cols="40">${valor}</textarea>
      </p>`;
  }
  else {
    dadosDoBotao.inputs.forEach((input, index)=>{
      minificado = dadosDoBotao.minificados[index];
      valor = dadosDoBotao.values[index];

      htmlInputs += `
        <p>
          <label for="${minificado}">${input}</label><br>
          <input type="number" id="${minificado}" name="${minificado}" class="cInputsConfiguracoes" value="${valor}" min="0" max="15000"> ${sufixo}
        </p>`;
    });
  }
  return htmlInputs;
}

function salvarBotaoClicado(idDivPai, idBotao) {
  historicoBotaoClicado.idDiv = idDivPai;
  historicoBotaoClicado.indexBotao = idBotao;
}

function btGoHome() {
  mostrarDiv('iMaquina');
  mostrarDiv('iOutros');
  start();
}

function btReset() {
  document.getElementById('mensagemSenha').innerHTML = "";
  acessarConfiguracoes(historicoBotaoClicado.idDiv, historicoBotaoClicado.indexBotao);
}

function btSave() {
  const tituloDaDiv = document.getElementById('iTituloConfiguracoes').innerHTML;
  if(tituloDaDiv === "ALARME" || tituloDaDiv === "ESTOQUE" || tituloDaDiv === "MEMÓRIA") return;

  dadosColetados.titulo = tituloDaDiv;
  dadosColetados.valores = document.getElementsByClassName('cInputsConfiguracoes');

  esconderDiv('iConfiguracoes');
  esconderDiv('iNavegacao');
  mostrarDiv('iSenha');
  mostrarDiv('iNavegacao2');
}

function btEnter() {
  const pass = document.getElementById('senha').value;

  if(pass === "") {
    document.getElementById('mensagemSenha').innerHTML = "Insira uma senha";
  }
  else if(pass !== senha) {
    document.getElementById('mensagemSenha').innerHTML = "Senha incorreta";
  }
  else {
    document.getElementById('senha').value = "";
    let protocolo = protocolar(dadosColetados);
    enviarParaCLP(protocolo);
    btGoHome();
  }
}

function protocolar(dados) {
  let query = "/setValues?title=";
  query += limpraString(dados.titulo) + "&";

  for(let i = 0; i < dados.valores.length; i++) {
    query += dados.valores[i].id + "=";
    query += dados.valores[i].value;

    if(i < dados.valores.length-1) query += "&";
  }

  console.log(query);
  return query;
}

function limpraString(string) {
  let stringLimpa = string.replace(/\s+/g, '');
  stringLimpa = stringLimpa.replace(/[^a-zA-Z0-9 ]/g, "x");
  stringLimpa = stringLimpa.toLowerCase();
  return stringLimpa;
}

function enviarParaCLP() {
  console.log("Enviando para CLP");
}