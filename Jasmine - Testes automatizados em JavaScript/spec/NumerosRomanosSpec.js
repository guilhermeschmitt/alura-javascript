describe("Números Romanos", function(){

  var numero;
  beforeEach(function(){
    numero = new NumerosRomanos();
  })

  describe("Testes com numerais simples", function(){
    it("Teste com I", function(){
      expect(numero.getVal("III")).toEqual(3);
    });

    it("Teste com V", function(){
      expect(numero.getVal("V")).toEqual(5);
    });

    it("Teste com X", function(){
      expect(numero.getVal("X")).toEqual(10);
    });

    it("Teste com L", function(){
      expect(numero.getVal("L")).toEqual(50);
    });

    it("Teste com C", function(){
      expect(numero.getVal("C")).toEqual(100);
    });

    it("Teste com D", function(){
      expect(numero.getVal("D")).toEqual(500);
    });

    it("Teste com M", function(){
      expect(numero.getVal("M")).toEqual(1000);
    });
  })

  describe("Testes com números compostos", function(){
    it("Teste do IV", function(){
      expect(numero.getVal("IV")).toEqual(4);
    })

    it("Teste do IX", function(){
      expect(numero.getVal("IX")).toEqual(9);
    })

    it("Teste com XL", function(){
      expect(numero.getVal("XL")).toEqual(40);
    })

    it("Teste com XC", function(){
      expect(numero.getVal("XC")).toEqual(90);
    })

    it("Teste com CD", function(){
      expect(numero.getVal("CD")).toEqual(400);
    })

    it("Teste com CM", function(){
      expect(numero.getVal("CM")).toEqual(900);
    })
  })

  describe("Testes com maior quantidade de números", function(){
    it("Teste do DCCXCIX (799)", function(){
      expect(numero.getVal("DCCXCIX")).toEqual(799);
    })

    it("Teste do LXXVII (77)", function(){
      expect(numero.getVal("LXXVII")).toEqual(77);
    })
    it("Teste do XCIV (94)", function(){
      expect(numero.getVal("XCIV")).toEqual(94);
    })
    it("Teste do DLI (551)", function(){
      expect(numero.getVal("DLI")).toEqual(551);
    })
    it("Teste do MCMXLIX (1949)", function(){
      expect(numero.getVal("MCMXLIX")).toEqual(1949);
    })
  })

  describe("Testes com erro na REGEX", function(){
    it("Teste do YYYI", function(){
      expect(numero.conversorNumeroRomanos("YYYI")).toEqual("Ocorreu um erro");
    })
  })


})
