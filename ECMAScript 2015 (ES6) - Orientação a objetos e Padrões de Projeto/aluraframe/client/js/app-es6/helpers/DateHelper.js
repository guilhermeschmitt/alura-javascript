class DateHelper {

  constructor(){
    throw new Error('Esta classe não pode ser instanciada');
  }

  static textoParaData(texto){
    if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)){
      throw new Error('Data deve ter o formato yyyy-mm-dd');
    }
    return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
    /*- O spread operator (...), cada item da lista será passado como um parâmetro
    - Arrow function, tira a necessidade de colocarmos o function em uma função anonima,
      além disso, quando o retorno é em uma unica linha, não há necessidade de colocarmos {}
    - Eu coloco +1 no mês, pois o Date guarda o mês de 0 a 11
    - FA inversão dos itens do array é importante, porque a função map
      espera encontrar um array com ano, mês e dia e não dia, mês e ano.
    */
  }

  //Template Strings começam com `` e quando quero apontar para uma variavel coloco ela entre {} com um $ na frente
  static dataParaTexto(data){
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }
}
