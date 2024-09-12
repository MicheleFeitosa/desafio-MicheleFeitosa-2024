class RecintosZoo {
  constructor() {
    // criando recintos com capacidade total, espaço livre e animais existentes
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        capacidadeTotal: 10,
        espacoLivre: 10,
        animais: { MACACO: 3 },
      },
      {
        numero: 2,
        bioma: "floresta",
        capacidadeTotal: 5,
        espacoLivre: 5,
        animais: {},
      },
      {
        numero: 3,
        bioma: "savana e rio",
        capacidadeTotal: 7,
        espacoLivre: 7,
        animais: { GAZELA: 1 },
      },
      {
        numero: 4,
        bioma: "rio",
        capacidadeTotal: 8,
        espacoLivre: 8,
        animais: {},
      },
      {
        numero: 5,
        bioma: "savana",
        capacidadeTotal: 9,
        espacoLivre: 9,
        animais: { LEAO: 1 },
      },
    ];

    // animais que podem ser atendidos no zoo 
    this.animais = {
      LEAO: { tamanho: 3, bioma: "savana" },
      LEOPARDO: { tamanho: 2, bioma: "savana" },
      CROCODILO: { tamanho: 3, bioma: "rio" },
      MACACO: { tamanho: 1, bioma: ["savana", "floresta"] },
      GAZELA: { tamanho: 2, bioma: "savana" },
      HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"] },
    };
  }

  analisaRecintos(animal, quantidade) {
    const recintosViaveis = [];

    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, bioma } = this.animais[animal];

    for (let recinto of this.recintos) {
      // Verifica se o bioma do recinto é compatível com o animal 
      const biomasCompatíveis = Array.isArray(bioma) ? bioma : [bioma];
      const recintoBiomaCompatível =
        biomasCompatíveis.includes(recinto.bioma) ||
        recinto.bioma === "savana e rio";

      if (
        recintoBiomaCompatível &&
        recinto.espacoLivre >= quantidade * tamanho
      ) {
        // Calcula o espaço livre depois de incluir
        const espacoLivreRestante = recinto.espacoLivre - quantidade * tamanho;

        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoLivreRestante} total: ${recinto.capacidadeTotal})`
        );

        recinto.espacoLivre = espacoLivreRestante;

        // Atualiza o número de animais no recinto
        if (!recinto.animais[animal]) {
          recinto.animais[animal] = 0;
        }
        recinto.animais[animal] += quantidade;
      }
    }

    return recintosViaveis.length > 0
      ? { recintosViaveis }
      : { erro: "Não há recinto viável" };
  }
}

export { RecintosZoo as RecintosZoo };
