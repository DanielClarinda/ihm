// ################################################################### vaiParaPaginaAlterarNome

function vaiParaPaginaAlterarNome() {
  esconderElementoComID('sectionNome');
  esconderElementoComID('sectionMaquina');
  esconderElementoComID('sectionOutros');
  esconderElementoComID('sectionSalvos');

  montarSectionAlterarNome();
  mostrarElementoComID('sectionAlterarNome');

  mostrarElementoComID('btVoltar');
  mostrarElementoComID('btReset');
  mostrarElementoComID('btAvancar');
  mostrarElementoComID('sectionNav');

  salvarHistoricoDaPagina('sectionAlterarNome');
}

// ################################################################### montarSectionAlterarNome

function montarSectionAlterarNome() {
  const nome = nomePerfisSalvos[perfilAtivo]; 
  innerHTML('tituloAlterarNome', nome);
  document.getElementById('inAlterarNome').value = nome;
}