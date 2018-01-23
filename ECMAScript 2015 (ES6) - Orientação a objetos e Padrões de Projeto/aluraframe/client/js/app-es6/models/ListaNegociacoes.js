class ListaNegociacoes {
  constructor(/*funcao*/) {
    this._negociacoes = [];
    //this._funcao = funcao;
  }

  adiciona(negociacao){
    this._negociacoes.push(negociacao);
    //Eu passo a Lista de negociacoes como o objeto parâmetro
    //this._funcao(this);
  }

  esvazia(){
    this._negociacoes = [];
    //this._funcao(this);
  }

  ordena(criterio){
    this._negociacoes.sort(criterio);
  }

  inverteOrdem(){
    this._negociacoes.reverse();
  }

  //No get negociacoes eu devolvo uma nova lista, para blindar o meu negociações, é a chamada programação defensiva
  get negociacoes(){
    return [].concat(this._negociacoes);
  }

  get volumeTotal(){
    return this._negociacoes.reduce((total, n) =>{ return total += n.volume;}, 0);
  }
}
