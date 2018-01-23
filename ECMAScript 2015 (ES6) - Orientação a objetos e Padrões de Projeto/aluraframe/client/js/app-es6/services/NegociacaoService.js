class NegociacaoService {

  constructor(){
    this._http = new HttpService();
  }

  importa(listaAtual){
    return this.obterTodasNegociacoes()
        .then(negociacoes =>
          negociacoes.filter(negociacao =>
              !listaAtual.some(negociacaoExistente =>
                  negociacao.isEquals(negociacaoExistente)))
      )
      .catch(erro => {
               console.log(erro);
               throw new Error("Não foi possível importar as negociações");
      });
  }

  obterTodasNegociacoes(){
          return Promise.all([
                       this.obterNegociacoes('negociacoes/semana'),
                       this.obterNegociacoes('negociacoes/anterior'),
                       this.obterNegociacoes('negociacoes/retrasada')
              ]).then(periodos => {
              let negociacoes = periodos
                  .reduce((dados, periodo) => dados.concat(periodo), [])
                  .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

              return negociacoes;
          }).catch(erro => {
              throw new Error(erro);
          });
  }


  //recebe uma função callback como parâmetro
  obterNegociacoes(url){
    return this._http
          .get(url)
          .then(negociacoes => negociacoes.map(objeto =>
            new Negociacao(new Date(objeto.data),
                           objeto.quantidade,
                           objeto.valor)))
          .catch(error => {
            console.log(error);
            throw new Error("Erro na importação da seguinte url: "+ url);
          });
  };

  adiciona(negociacao){
    return ConnectionFactory
           .getConnection()
           .then(conexao => new NegociacaoDao(conexao))
           .then(dao => dao.adiciona(negociacao))
           .then(() => 'Negociação cadastrada com sucesso!')
           .catch(erro => {
             throw new Error('Não foi possível cadastrar a negociação!');
            });

            /* Caso eu quisesse dar um rollback  (cancelar) uma transição, tratando o evento,
               o seguinte código deveria ser usado,:

               transaction.abort();
               transaction.onabort = e => {
                   console.log(e);
                   console.log('Transação abortada');
               };

               request.onsuccess = e => {

                   console.log('Negociação incluida com sucesso');
               };

               request.onerror = e => {

                   console.log('Não foi possível incluir a negociação');
               };
            */
  };

  lista(){
    return ConnectionFactory
           .getConnection()
           .then(conexao => new NegociacaoDao(conexao))
           .then(dao => dao.listaTodos())
           .catch(erro => {
             console.log(erro);
             throw new Error('Não foi possível pegar todas as negociações do sistema!');
           })
  }

  apaga(){
    return ConnectionFactory
          .getConnection()
          .then(connection => new NegociacaoDao(connection))
          .then(dao => dao.apagaTodos())
          .then(() => 'Todas as negociações foram apagadas com sucesso!')
          .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível apagar todos os dados do sistema!');
          })

  }
};
