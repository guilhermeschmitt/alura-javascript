class View{
  constructor(elemento){
    this._elemento = elemento;
  }

  template(model){
    throw new Error("Este método deve ser instaciado na classe herdeira!");
  }

  update(model){
    this._elemento.innerHTML = this.template(model);
  }
}
