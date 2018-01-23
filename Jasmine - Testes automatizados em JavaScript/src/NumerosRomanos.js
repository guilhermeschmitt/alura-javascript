class NumerosRomanos {

  conversorNumeroRomanos(val){
    var val = "YYYI";
    const REGEX_NUMERO_ROMANO = new RegExp(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i);
    if(val.search(REGEX_NUMERO_ROMANO) >= 0){
      this.getVal(val);
    }
    else{
      return "Ocorreu um erro";
    }
  }


  getVal(numero){
    let i = 0;
    let retorno = 0;
    let roman = {"M":1000, "D":500, "C": 100, "L":50, "X":10, "V":5, "I":1};
    //console.log(roman["C"]) =====> 100
    numero.split('');
    while(i < numero.length){
      if(numero[i] == "I" && i+1 < numero.length){
        if(numero[i+1] == "V" || numero[i+1] == "X"){
          retorno += (roman[numero[i+1]] - roman[numero[i]]);
          i += 2;
        }
        else{
          retorno += roman[numero[i]];
          i++;
        }
      }

      else if(numero[i] == "X" && i+1 < numero.length){
        if(numero[i+1] == "L" || numero[i+1] == "C"){
          retorno += (roman[numero[i+1]] - roman[numero[i]]);
          i += 2;
        }
        else{
          retorno += roman[numero[i]];
          i++;
        }
      }

      else if(numero[i] == "C" && i+1 < numero.length){
        if(numero[i+1] == "D" || numero[i+1] == "M"){
          retorno += (roman[numero[i+1]] - roman[numero[i]]);
          i += 2;
        }
        else{
          retorno += roman[numero[i]];
          i++;
        }
      }

      else{
        retorno += roman[numero[i]];
        i++;
      }
    }
    return retorno;
  }
}
