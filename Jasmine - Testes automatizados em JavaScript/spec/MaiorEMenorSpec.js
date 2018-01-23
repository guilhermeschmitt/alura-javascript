describe("Maior e Menor", function(){

  var algoritmo;
  beforeEach(function(){
    algoritmo = new MaiorEMenor();
  })

  it("Cenário de números em ordem não sequencial",function(){
    algoritmo.encontra([5,3,9,1,7]);
    expect(algoritmo.pegaMenor()).toEqual(1);
    expect(algoritmo.pegaMaior()).toEqual(9);
  })

  it("Teste para cenário com números em ordem decrescente", function(){
    algoritmo.encontra([9,8,7,6,5]);
    expect(algoritmo.pegaMenor()).toEqual(5);
    expect(algoritmo.pegaMaior()).toEqual(9);
  })

  it("Teste para cenário com números em ordem crescente", function(){
    algoritmo.encontra([5,6,7,8,9]);
    expect(algoritmo.pegaMenor()).toEqual(5);
    expect(algoritmo.pegaMaior()).toEqual(9);
  })

  it("Teste com um único elemento no array", function(){
    algoritmo.encontra([5]);
    expect(algoritmo.pegaMenor()).toEqual(5);
    expect(algoritmo.pegaMaior()).toEqual(5);
  })
})
