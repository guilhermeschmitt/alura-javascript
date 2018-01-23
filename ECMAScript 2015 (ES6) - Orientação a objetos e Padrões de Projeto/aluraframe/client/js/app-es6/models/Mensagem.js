class Mensagem {
  //Estou dizendo que se não tiver parametro, o valor default é ""
  constructor(texto="") {
    this._texto = texto;
    /*Para dar suporte a versões do Edge inferiores ao 14, eu teria que fazer o seguinte:
    this._texto = texto || ''
    Pois, versões antigas não suportam parâmetros opcionais*/
  }

  get texto(){
    return this._texto;
  }

  set texto(texto){
    this._texto = texto;
  }
}
