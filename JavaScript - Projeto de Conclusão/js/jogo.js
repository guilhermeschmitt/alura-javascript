const criaJogo = sprite => {

  let etapa = 1;
  let palavraSecreta = "";
  let lacunas = [];

    const setPalavraSecreta = palavra => {
      if(!palavra.trim()) throw Error("Palavra Secreta inválida!");

        palavraSecreta = palavra;
        etapa = 2;
        lacunas = Array(palavraSecreta.length).fill('');
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    const processaChute = letra => {
      if(!letra.trim()) throw Error('Chute inválido!');

      const exp = new RegExp(letra, 'gi');
      let resultado, acertou = false;

      while (resultado = exp.exec(palavraSecreta)) {
          acertou = true;
          lacunas[resultado.index] = letra;
      }

      if (!acertou) sprite.nextFrame();
    };

    const ganhou = () => {
      return lacunas.length
          ? !lacunas.some(function(lacuna) {
              return lacuna == '';
          })
          : false;
    };

    const perdeu =  () => sprite.isFinished();

    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {
        sprite.reset();
        etapa = 1;
        palavraSecreta = "";
        lacunas = [];
    };

    return {

        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
};
