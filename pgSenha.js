// ################################################################### vaiParaPaginaSenha

function vaiParaPaginaSenha() {
  resetarConteudoSenha();
  mostrarElementoComID('btReset');
  mostrarElementoComID('sectionSenha');
}

// ################################################################### resetarConteudoSenha

function resetarConteudoSenha() {
  document.getElementById('inSenha').value = "";
  innerHTML('senhaIncorreta', "");
}

// ################################################################### checkSenha

function checkSenha() {
  const senha = document.getElementById('inSenha').value;

  if(senha === chaveDeAcesso) {
    if(historicoDaPagina.id === 'sectionAlterarNome') {
      nomePerfisSalvos[perfilAtivo] = document.getElementById('inAlterarNome').value;
    }
    else if(historicoDaPagina.id === "sectionAjustes") {
      salvaDadosColetadosNoDB();
    }
    else if(historicoDaPagina.id === "sectionDadosPerfil") {
      nomePerfisSalvos.forEach((nome, i)=>{
        if(nome === document.getElementById('tituloDadosPerfil').innerHTML) perfilAtivo = i;
      });
    }
    
    inicio();
  }
  else if(senha === "") {
    innerHTML('senhaIncorreta', "Insira uma Senha");
  }
  else {
    innerHTML('senhaIncorreta', "Senha Incorreta");
    mostrarElementoComID('senhaIncorreta');
  }
}

// ################################################################### salvaDadosColetadosNoDB

function salvaDadosColetadosNoDB() {
  dbMaquina.forEach((item)=>{
    if(item.nomeBotao === dadosColetadosDaPaginaAjustes.nomeDoItem) {
      item.valores[perfilAtivo] = dadosColetadosDaPaginaAjustes.valoresDosInput;
    }
  });

  dbOutros.forEach((item)=>{
    if(item.nomeBotao === dadosColetadosDaPaginaAjustes.nomeDoItem) {
      item.valores[perfilAtivo] = dadosColetadosDaPaginaAjustes.valoresDosInput;
    }
  });
}