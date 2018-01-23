class Consulta {
  constructor(paciente, procedimentos, particular, retorno, data) {
    this._paciente = paciente;
    this._procedimentos = procedimentos;
    this._particular = particular;
    this._retorno = retorno;
    this._data = data;
  }

  preco(){

      if(this._retorno) return 0;

      let precoFinal = 0;

      this._procedimentos.forEach( procedimento => {
          if("raio-x" == procedimento) precoFinal += 55;
          else if("gesso" == procedimento) precoFinal += 32;
          else precoFinal += 25;
      });

      if(this._particular) precoFinal *= 2;

      return precoFinal;
  };

  getPaciente(){
    return this._paciente;
  };

  getProcedimentos(){
    return this._procedimentos;
  };

  isParticular(){
    return this._particular;
  };

  isRetorno(){
    return this._retorno;
  };

  getData(){
    return this._data;
  };
}
