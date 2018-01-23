class Negociacao {
  constructor(data, quantidade, valor) {
    /*Eu to fazendo um new Date, para caso a referência do objeto seja mudado, o valor que está aqui nesse objeto
    não seja alterado também*/
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  get data(){
    //To usando let para deixar essa variável no escopo de bloco, caso usasse var ela teria o escopo global
    let novaData = new Date(this._data.getTime());
    return novaData;
  }

  get quantidade(){
    return this._quantidade;
  }

  get valor(){
    return this._valor;
  }

  get volume(){
    return this._quantidade * this._valor;
  }

  isEquals(outraNegociacao) {
       return JSON.stringify(this) == JSON.stringify(outraNegociacao)
   }

}
