// ################################################################### inicio

inicio();

function inicio() {
  montarSectionNome();
  mostrarElementoComID('sectionNome');

  montarSectionMaquina();
  mostrarElementoComID('sectionMaquina');

  montarSectionOutros();
  mostrarElementoComID('sectionOutros');
  
  montarSectionSalvos();
  mostrarElementoComID('sectionSalvos');
  
  esconderElementoComID('sectionAlterarNome');
  esconderElementoComID('sectionAjustes');
  esconderElementoComID('sectionDadosPerfil');
  esconderElementoComID('sectionSenha');
  esconderElementoComID('sectionNav');
}

// ################################################################### montarSectionNome

function montarSectionNome() {
  innerHTML('tituloNome', nomePerfisSalvos[perfilAtivo]);
}

// ################################################################### montarSectionMaquina

function montarSectionMaquina() {
  montarBotoesDB(dbMaquina, 'conteudoMaquina');
}

// ################################################################### montarSectionOutros

function montarSectionOutros() {
  montarBotoesDB(dbOutros, 'conteudoOutros');
}

// ################################################################### montarBotoesDB

function montarBotoesDB(db, idDaSessao) {
  let html = "";

  db.forEach((item)=>{
    html += `<button class="btAzul doisBT" onclick="vaiParaPaginaAjustes(this.innerHTML)">${item.nomeBotao}</button>`;
  });

  innerHTML(idDaSessao, html);
}

// ################################################################### montarSectionSalvos

function montarSectionSalvos() {
  let html = "";

  nomePerfisSalvos.forEach((nome)=>{
    html += `<button class="btAzul doisBT" onclick="vaiParaPaginaDadosPerfil(this.innerHTML)">${nome}</button>`;
  });

  innerHTML('conteudoSalvos', html);
}

// ################################################################### innerHTML

function innerHTML(id, conteudo) {
  document.getElementById(id).innerHTML = conteudo;
}

// ################################################################### mostrarElementoComID

function mostrarElementoComID(id) {
  document.getElementById(id).style.display = "";
}

// ################################################################### esconderElementoComID

function esconderElementoComID(id) {
  document.getElementById(id).style.display = "none";
}

// ################################################################### salvarHistoricoDaPagina

function salvarHistoricoDaPagina(id) {
  historicoDaPagina = document.getElementById(id);
}

// ################################################################### pegarDisplayStyleDoElementoID

function pegarDisplayStyleDoElementoID(id) {
  return document.getElementById(id).style.display;
}

// ################################################################### protocolar

// function protocolar(dados) {
//   let query = "/setValues?title=";
//   query += limpraString(dados.titulo) + "&";

//   for(let i = 0; i < dados.valores.length; i++) {
//     query += dados.valores[i].id + "=";
//     query += dados.valores[i].value;

//     if(i < dados.valores.length-1) query += "&";
//   }

//   console.log(query);
//   return query;
// }

// ################################################################### limparString

// function limpraString(string) {
//   let stringLimpa = string.replace(/\s+/g, '');
//   stringLimpa = stringLimpa.replace(/[^a-zA-Z0-9 ]/g, "x");
//   stringLimpa = stringLimpa.toLowerCase();
//   return stringLimpa;
// }

// ################################################################### enviarParaCLP

// function enviarParaCLP() {
//   console.log("Enviando para CLP");
// }