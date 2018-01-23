describe("Paciente", function(){
  it("Teste de IMC", function(){
    var paciente = new Paciente('Guilherme', 23, 74, 1.88);
    expect(paciente.imc()).toEqual(74 / (1.88 * 1.88));
  })

  it("Teste dos batimentos", function(){
    var paciente = new Paciente('Guilherme', 23, 74, 1.88);
    expect(paciente.batimentos()).toEqual(23 * 365 * 24 * 60 * 80);
  })
})
