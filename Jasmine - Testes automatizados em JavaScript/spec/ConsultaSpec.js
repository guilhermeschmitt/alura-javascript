describe("Consulta", function(){

  var paciente;
  beforeEach(function(){
    paciente = new PacienteBuilder().constroi();
  })

  describe("Testes relacionados ao retorno", function(){
    it("Teste para retorno", function(){
      var consulta = new Consulta(paciente, ['proced'], false, true);
      expect(consulta.preco()).toEqual(0);
    })
  })

  describe("Testes relacionados a procedimentos", function(){
    it("Teste para procedimentos comuns", function(){
      var consulta = new Consulta(paciente, ['comum1', 'comum2'], false, false);
      expect(consulta.preco()).toEqual(50);
    })

    it("Teste procedimentos comuns em uma consulta particular", function(){
      var consulta = new Consulta(paciente, ['comum1', 'comum2'], true, false);
      expect(consulta.preco()).toEqual(100);
    })

    it("Teste procedimentos especiais em uma consulta particular", function(){
      var consulta = new Consulta(paciente, ['raio-x', 'gesso'], true, false);
      expect(consulta.preco()).toEqual((55+32)*2);
    })
  })
})
