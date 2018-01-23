describe('Agendamento', function(){
  var paciente;
  beforeEach(function(){
    agenda = new Agendamento();
    paciente = new PacienteBuilder().constroi();
  });

  it("Teste para retorno de consulta 20 dias no futuro", function(){
    var consulta = new Consulta(paciente, [], false, false, new Date(2014, 7, 1));
    var novaConsulta = agenda.para(consulta);
    expect(novaConsulta.getData().toString()).toEqual(new Date(2014, 7, 21).toString());
  });

  it("Deve pular os fins de semana", function(){
    var consulta = new Consulta(paciente, [], false, false, new Date(2014, 5, 30));
    var novaConsulta = agenda.para(consulta);
    expect(novaConsulta.getData().toString()).toEqual(new Date(2014, 6, 21).toString());
  })
})
