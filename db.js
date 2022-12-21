// ################################################################### Variáveis

let perfilAtivo = 0;
let nomePerfisSalvos = ["MOLDE PAVER 8", "MOLDE LAJOTA 6"];
let historicoDaPagina;
let dadosColetadosDaPaginaAjustes;
const chaveDeAcesso = "Daniel";

let dbMaquina = [
  {
    nomeBotao: "AVANÇA TÁBUA",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Delay Leitura Sensor Ótico"],
    mini: ["teMaAv", "teMaRe", "deLeSeOt"],
    valores: [
      [1111, 1111, 11],
      [2222, 2222, 22]
    ]
  },
  {
    nomeBotao: "BOMBA",
    inputs: ["Tempo de Partida"],
    mini: ["tePa"],
    valores: [
      [1111],
      [2222]
    ]
  },
  {
    nomeBotao: "CHAVE MOLDE",
    inputs: ["Tempo Molde 1", "Tempo Molde 2", "Tempo Molde 3"],
    mini: ["tePo1", "tePo2", "tePo3"],
    valores: [
      [1111, 1111, 1111],
      [2222, 2222, 2222]
    ]
  },
  {
    nomeBotao: "COCHO",
    inputs: ["Tempo Máximo Avança", "Tempo Máximo Recua", "Tempo para Começar Vibra", "Tempo Vibrando Parado", "Tempo Recuando sem Vibrar", "Tempo Avançanda sem Vibrar"],
    mini: ["teMaAv", "teMaRe", "teCoVi", "teViPa", "teReSeVi", "teAvSeVi"],
    valores: [
      [1111, 1111, 1111, 1111, 1111, 1111],
      [2222, 2222, 2222, 2222, 2222, 2222]
    ]
  },
  {
    nomeBotao: "ESTOQUE",
    inputs: ["Quantidade"],
    mini: ["qtd"],
    valores: [
      [1],
      [2]
    ]
  },
  {
    nomeBotao: "FÊMEA",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida", "Tempo Alívio", "Tempo Afasta", "Tempo Vibra", "Tempo Inércia dos Vibra"],
    mini: ["teMaSu", "teMaDe", "teAl", "teAf", "teVi", "teInVi"],
    valores: [
      [1111, 1111, 111, 1111, 1111, 1111],
      [2222, 2222, 222, 2222, 2222, 2222]
    ]
  },
  {
    nomeBotao: "MACHO",
    inputs: ["Tempo Máximo Subida", "Tempo Máximo Descida"],
    mini: ["teMaSu", "teMaDe"],
    valores: [
      [1111, 11111],
      [2222, 22222]
    ]
  }
];

let dbOutros = [
  {
    nomeBotao: "ALARME",
    inputs: ["Lista de Erros"],
    mini: ["liEr"],
    valores: [
      ["Erro-1", "Erro-12", "Erro-13", "Erro-14", "Erro-15", "Erro-16", "Erro-17", "Erro-18", "Erro-19", "Erro-110"],
      ["Erro-2", "Erro-22", "Erro-23", "Erro-24", "Erro-25", "Erro-26", "Erro-27", "Erro-28", "Erro-29", "Erro-210"]
    ]
  },
  {
    nomeBotao: "MEMÓRIA",
    inputs: ["Contagem"],
    mini: ["ctg"],
    valores: [
      [111],
      [222]
    ]
  }
];