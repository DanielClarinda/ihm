const dbMaquina = [
  {
    buttonName: "AVANÇA TÁBUA",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Delay Leitura Sensor Ótico"],
    mini: ["teMaAv", "teMaRe", "deLeSeOt"],
    values: [1000, 2000, 50]
  },
  {
    buttonName: "BOMBA",
    inputs: ["Tempo de Partida"],
    mini: ["tePa"],
    values: [3000]
  },
  {
    buttonName: "CHAVE MOLDE",
    inputs: ["Tempo Molde 1", "Tempo Molde 2", "Tempo Molde 3"],
    mini: ["tePo1", "tePo2", "tePo3"],
    values: [6000, 7000, 8000]
  },
  {
    buttonName: "COCHO",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Tempo para Começar Vibra", "Tempo Vibrando Parado", "Tempo Recuando sem Vibrar", "Tempo Avançanda sem Vibrar"],
    mini: ["teMaAv", "teMaRe", "teCoVi", "teViPa", "teReSeVi", "teAvSeVi"],
    values: [5000, 6000, 3000, 1500, 3000, 2500]
  },
  {
    buttonName: "ESTOQUE",
    inputs: ["Quantidade"],
    mini: ["qtd"],
    values: [7]
  },
  {
    buttonName: "FÊMEA",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida", "Tempo Alívio", "Tempo Afasta", "Tempo Vibra", "Tempo Inércia dos Vibra"],
    mini: ["teMaSu", "teMaDe", "teAl", "teAf", "teVi", "teInVi"],
    values: [3000, 4000, 200, 1000, 7000, 1200]
  },
  {
    buttonName: "MACHO",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida"],
    mini: ["teMaSu", "teMaDe"],
    values: [4000, 10000]
  }
];

const dbOutros = [
  {
    buttonName: "ALARME",
    inputs: ["Lista de Erros"],
    mini: ["liEr"],
    values: ["Erro-1", "Erro-2", "Erro-3", "Erro-4", "Erro-5", "Erro-6", "Erro-7", "Erro-8", "Erro-9", "Erro-10"]
  },
  {
    buttonName: "MEMÓRIA",
    inputs: ["Contagem"],
    mini: ["ctg"],
    values: [987]
  }
];

let historico;
const chaveDeAcesso = "Daniel";

function start() {
  montarOpcoes(dbMaquina, 'conteudoMaquina');
  show('sectionMaquina');
  montarOpcoes(dbOutros, 'conteudoOutros');
  show('sectionOutros');
  hide('sectionAjustes');
  show('sectionSalvos');
  hide('sectionSenha');
  hide('sectionNav');
}
start();

function montarOpcoes(db, contentID) {
  let conteudo = "";

  db.forEach((item)=>{
    conteudo += `<button class="btAzul" onclick="goAjustes(this.innerHTML)">${item.buttonName}</button>`;
  });

  inserirConteudo(conteudo, contentID);
}

function inserirConteudo(content, id) {
  document.getElementById(id).innerHTML = content;
}

function show(sectionID) {
  document.getElementById(sectionID).style.display = "";
}

function hide(sectionID) {
  document.getElementById(sectionID).style.display = "none";
}

function goAjustes(buttonValue) {
  let configItem;
  
  dbMaquina.forEach((itemDB)=>{
    if(itemDB.buttonName === buttonValue) {
      configItem = itemDB;
    }
  });

  dbOutros.forEach((itemDB)=>{
    if(itemDB.buttonName === buttonValue) {
      configItem = itemDB;
    }
  });

  historico = configItem;

  montarAjustes(configItem);

  hide('sectionMaquina');
  hide('sectionOutros');
  hide('sectionSalvos');
  show('sectionAjustes');
  show('sectionNav');
}

function montarAjustes(itemDB) {
  let conteudo = "";
  const itemName = itemDB.buttonName;
  let sufixo = getSufixo(itemName);

  document.getElementById('tituloAjustes').innerHTML = itemName;

  itemDB.inputs.forEach((input, i)=>{
    let mini = itemDB.mini[i];

    conteudo += `<label for="${mini}">${input}:</label>`;

    if(itemName === "ALARME") {
      conteudo += `<textarea id="${mini}" name="${mini}" class="margin" cols="30" rows="10">`;
      
      itemDB.values.forEach((valor, i)=>{
        conteudo += `${valor}`;

        if(i < itemDB.values.length-1) conteudo += "\n";
      });

      conteudo += `</textarea>`
    }
    else {
      conteudo += `<input class="margin inShort center" type="number" name="${mini}" id="${mini}" value="${itemDB.values[i]}">${sufixo}<br>`;
    }
  });

  if(itemName !== "ESTOQUE" && itemName !== "ALARME" && itemName !== "MEMÓRIA") {
    conteudo += `<p class="padding center red">Valor máximo 16000ms</p>`;
  }

  if(itemName === "ESTOQUE" || itemName === "ALARME") {
    hide('btReset');
    hide('btAvancar');
  }

  inserirConteudo(conteudo, 'conteudoAjustes');
}

function getSufixo(name) {
  if(name === "ESTOQUE" || name === "MEMÓRIA") return "Tábuas";
  else if(name === "ALARME") return "";
  else return "(ms)";
}

function voltar() {
  const displayAjuste = document.getElementById('sectionAjustes').style.display;
  const displaySenha = document.getElementById('sectionSenha').style.display;

  if(displayAjuste !== "none") {
    show('btReset');
    show('btAvancar');
    start();
  }
  
  if(displaySenha !== "none") {
    hide('sectionSenha');
    goAjustes(historico.buttonName);
  }
}

function reset() {
  const displayAjuste = document.getElementById('sectionAjustes').style.display;
  const displaySenha = document.getElementById('sectionSenha').style.display;

  if(displayAjuste !== "none") goAjustes(historico.buttonName);

  if(displaySenha !== "none") {
    document.getElementById('inSenha').value = "";
    document.getElementById('senhaIncorreta').innerHTML = "";
  }
}

function avancar() {
  const displayAjuste = document.getElementById('sectionAjustes').style.display;
  const displaySenha = document.getElementById('sectionSenha').style.display;

  if(displayAjuste !== "none") getValues();

  if(displaySenha !== "none") checkSenha();
}

function getValues() {
  const pgAjustes = document.getElementById('sectionAjustes');
  const titulo = pgAjustes.getElementsByTagName('h3')[0].innerHTML;
  const listaInputs = pgAjustes.getElementsByTagName('input');

  let ids = [];
  let values = [];

  for(let i = 0; i < listaInputs.length; i++) {
    ids[i] = listaInputs[i].id;
    values[i] = listaInputs[i].value;
  }

  goSenha();
}

function goSenha() {
  hide('sectionAjustes');
  show('sectionSenha');
}

function checkSenha() {
  const senha = document.getElementById('inSenha').value;

  if(senha === "") {
    document.getElementById('senhaIncorreta').innerHTML = "Insira uma Senha";
    show('senhaIncorreta');
  }
  else if(senha === chaveDeAcesso) {
    document.getElementById('inSenha').value = "";
    document.getElementById('senhaIncorreta').innerHTML = "";
    start();
  }
  else {
    document.getElementById('senhaIncorreta').innerHTML = "Senha Incorreta"
    show('senhaIncorreta');
  }
}









function goPerfil() {

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