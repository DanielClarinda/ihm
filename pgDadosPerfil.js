// ################################################################### goDadosSalvoPage

function vaiParaPaginaDadosPerfil(innerHTMLDoElemento) {
  esconderElementoComID('sectionNome');
  esconderElementoComID('sectionMaquina');
  esconderElementoComID('sectionOutros');
  esconderElementoComID('sectionSalvos');

  montarSectionDadosPerfil(innerHTMLDoElemento);
  mostrarElementoComID('sectionDadosPerfil');

  mostrarElementoComID('btVoltar');
  esconderElementoComID('btReset');
  mostrarElementoComID('btAvancar');
  mostrarElementoComID('sectionNav');

  salvarHistoricoDaPagina('sectionDadosPerfil');
}

// ################################################################### montarSectionDadosPerfil

function montarSectionDadosPerfil(innerHTMLDoElemento) {
  let indiceMoldeEscolhido = 0;
  
  nomePerfisSalvos.forEach((nome, i)=>{
    if(nome === innerHTMLDoElemento) indiceMoldeEscolhido = i;
  });

  innerHTML('tituloDadosPerfil', innerHTMLDoElemento);

  let html = "";

  dbMaquina.forEach((item)=>{
    html += `<p class="left">${item.nomeBotao}</p>`;

    item.inputs.forEach((input, i)=>{
      html += `
        <label for="${i}">${input}:</label>
        <input class="margin inShort center" type="number" name="${i}" id="${i}" value="${item.valores[indiceMoldeEscolhido][i]}" disabled>(ms)<br>`;
    });

    html += `<br><br>`;
  });

  innerHTML('conteudoDadosPerfil', html);
}