// ################################################################### voltar

function voltar() {
  if(pegarDisplayStyleDoElementoID('sectionAlterarNome') !== "none") inicio();

  else if(pegarDisplayStyleDoElementoID('sectionAjustes') !== "none") inicio();

  else if(pegarDisplayStyleDoElementoID('sectionDadosPerfil') !== "none") inicio();

  else if(pegarDisplayStyleDoElementoID('sectionSenha') !== "none") {

    if(historicoDaPagina.id === 'sectionAlterarNome') {
      esconderElementoComID('sectionSenha');
      mostrarElementoComID('sectionAlterarNome');
    }
    else if(historicoDaPagina.id === "sectionAjustes") {
      esconderElementoComID('sectionSenha');
      mostrarElementoComID('sectionAjustes');
    }
    else if(historicoDaPagina.id === "sectionDadosPerfil") {
      esconderElementoComID('sectionSenha');
      mostrarElementoComID('sectionDadosPerfil');
      esconderElementoComID('btReset');
    }
  }
}

// ################################################################### reset

function reset() {
  if(pegarDisplayStyleDoElementoID('sectionAlterarNome') !== "none") {
    vaiParaPaginaAlterarNome();
  }
  else if(pegarDisplayStyleDoElementoID('sectionAjustes') !== "none") {
    const innerHTMLDoTituloNoHistorico = historicoDaPagina.getElementsByTagName('h3')[0].innerHTML;
    vaiParaPaginaAjustes(innerHTMLDoTituloNoHistorico);
  }
  else if(pegarDisplayStyleDoElementoID('sectionSenha') !== "none") {
    resetarConteudoSenha();
  }
}

// ################################################################### avancar

function avancar() {
  if(pegarDisplayStyleDoElementoID('sectionAlterarNome') !== "none") {
    esconderElementoComID('sectionAlterarNome');
    vaiParaPaginaSenha();
  }
  else if(pegarDisplayStyleDoElementoID('sectionAjustes') !== "none") {
    coletarDadosDaPaginaAjustes();
    esconderElementoComID('sectionAjustes');
    vaiParaPaginaSenha();
  }
  else if(pegarDisplayStyleDoElementoID('sectionSenha') !== "none") {
    checkSenha();
  }
  else if(pegarDisplayStyleDoElementoID('sectionDadosPerfil') !== "none") {
    esconderElementoComID('sectionDadosPerfil');
    vaiParaPaginaSenha();
  }
}