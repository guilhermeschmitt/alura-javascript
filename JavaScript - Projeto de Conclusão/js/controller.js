const criaController = (jogo) => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
      $lacunas.empty();
      jogo.getLacunas().forEach(function (lacuna) {
          $('<li>')
              .addClass('lacuna')
              .text(lacuna)
              .appendTo($lacunas);
      });
    };

    const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);

    const guardaPalavraSecreta = () =>{
      try{
        jogo.setPalavraSecreta($entrada.val());
        $entrada.val('');
        mudaPlaceHolder('Coloque aqui o seu chute');
        exibeLacunas();
      }catch(err){
        alert(err);
      }
    };

    const leChute = () => {
      try{
        jogo.processaChute($entrada.val().trim().substr(0,1));
        $entrada.val('');
        exibeLacunas();
        if(jogo.ganhouOuPerdeu()){
          setTimeout(function(){
            if(jogo.ganhou()) alert("Parabéns! Você ganhou!");
            else alert('Que pena! Você perdeu, tente novamente!');
            reinicia();
          }, 200)
        }
      }catch(err){
        alert(err);
      }
    }

    const reinicia = () => {
      mudaPlaceHolder("Palavra Secreta");
      $lacunas.empty();
      jogo.reinicia();
    }

    const inicia = () => {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    return { inicia };
};
