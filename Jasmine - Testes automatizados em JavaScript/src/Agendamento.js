class Agendamento {
  constructor() {
    this._umDiaEmMillisegundo = 1000 * 60 * 60 * 24;
    this._vinteDiasEmMillisegundo = this._umDiaEmMillisegundo * 20;
  }

  para(consulta){
    var novaData = new Date(consulta.getData().getTime() + this._vinteDiasEmMillisegundo);

    while(novaData.getDay() == 0 || novaData.getDay() == 6) {
      novaData = new Date(novaData.getTime() + this._umDiaEmMillisegundo);
    }

    var novaConsulta = new Consulta(consulta.getPaciente(), consulta.getProcedimentos()
                                  , consulta.isParticular(), consulta.isRetorno(), novaData);
    return novaConsulta;
  }
}
