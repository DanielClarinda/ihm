// ################################################################### vaiParaPaginaAjustes

function vaiParaPaginaAjustes(nomeBotaoPrecionado) {
  let itemDoDB = buscarItemNoDBPeloNome(nomeBotaoPrecionado);
  
  montarSectionAjustes(itemDoDB);
  mostrarElementoComID('sectionAjustes');

  esconderElementoComID('sectionNome');
  esconderElementoComID('sectionMaquina');
  esconderElementoComID('sectionOutros');
  esconderElementoComID('sectionSalvos');

  mostrarElementoComID('btVoltar');
  if(itemDoDB.nomeBotao === "ALARME" || itemDoDB.nomeBotao === "ESTOQUE") {
    esconderElementoComID('btReset');
    esconderElementoComID('btAvancar');
  }
  else {
    mostrarElementoComID('btReset');
    mostrarElementoComID('btAvancar');
  }
  mostrarElementoComID('sectionNav');

  salvarHistoricoDaPagina('sectionAjustes');
}

// ################################################################### buscarItemNoDBPeloNome

function buscarItemNoDBPeloNome(nomeBotao) {
  let itemDoDB;

  dbMaquina.forEach((item)=>{
    if(item.nomeBotao === nomeBotao) {
      itemDoDB = item;
    }
  });

  dbOutros.forEach((item)=>{
    if(item.nomeBotao === nomeBotao) {
      itemDoDB = item;
    }
  });

  return itemDoDB;
}

// ################################################################### montarSectionAjustes

function montarSectionAjustes(item) {
  let html = "";

  const nomeBotao = item.nomeBotao;
  innerHTML('tituloAjustes', nomeBotao);

  let sufixo = pegarSufixoPeloNomeBotao(nomeBotao);

  item.inputs.forEach((input, i)=>{
    let mini = item.mini[i];

    html += `<label for="${mini}">${input}:</label>`;

    if(nomeBotao === "ALARME") {
      html += `<textarea id="${mini}" name="${mini}" class="margin" cols="30" rows="10">`;
      
      item.valores[perfilAtivo].forEach((valor, i)=>{
        html += `${valor}`;

        if(i < item.valores[perfilAtivo].length-1) html += "\n";
      });
      html += `</textarea>`
    }
    else {
      html += `<input class="margin inShort center" type="number" name="${mini}" id="${mini}" value="${item.valores[perfilAtivo][i]}">${sufixo}<br>`;
    }
  });

  if(nomeBotao !== "ESTOQUE" && nomeBotao !== "ALARME" && nomeBotao !== "MEMÓRIA") {
    html += `<p class="padding center red">Valor máximo 16000ms</p>`;
  }

  innerHTML('conteudoAjustes', html);
}

// ################################################################### pegarSufixoPeloNomeBotao

function pegarSufixoPeloNomeBotao(nomeBotao) {
  if(nomeBotao === "ESTOQUE" || nomeBotao === "MEMÓRIA") return "Tábuas";
  else if(nomeBotao === "ALARME") return "";
  else return "(ms)";
}

// ################################################################### coletarDadosDaPaginaAjustes

function coletarDadosDaPaginaAjustes() {
  let dados = {
    nomeDoItem: "",
    mini: [],
    valoresDosInput: []
  };

  const sectionAjustes = document.getElementById('sectionAjustes');

  dados.nomeDoItem = sectionAjustes.getElementsByTagName('h3')[0].innerHTML;

  let tagsInput = sectionAjustes.getElementsByTagName('input');

  for(let i = 0; i < tagsInput.length; i++) {
    dados.mini[i] = tagsInput[i].id;
    dados.valoresDosInput[i] = tagsInput[i].value;
  }

  dadosColetadosDaPaginaAjustes = dados;
}