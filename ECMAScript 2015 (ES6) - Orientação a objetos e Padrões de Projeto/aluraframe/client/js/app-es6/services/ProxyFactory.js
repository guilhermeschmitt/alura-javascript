  class ProxyFactory {

    static create(objeto, props, acao){
      return new Proxy(objeto, {
        //Foi usado o get aqui pq quando chamamos uma função, o JavaScript fará um getter e após a leitura, será enviada um apply
        get(target, prop, receiver){
          if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
            /* essa função retornada irá substituir o método no proxy!!! Ou seja,
            estamos usando o handler do proxy para modificar o próprio proxy */
            return function(){
              /*Quando usarmos Reflect.apply, Reflect.get e Reflect.set
              precisamos retornar o resultado da operação com return*/
              let retorno = Reflect.apply(target[prop], target, arguments);
              acao(target);
              return retorno;
            }
          }
          return Reflect.get(target, prop, receiver);

      },

    set(target, prop, value, receiver){
      let retorno = Reflect.set(target, prop, value, receiver);
      if(props.includes(prop)){
        acao(target);
      }
      return retorno;
    }
  })
  }

  static _ehFuncao(func){
    return typeof(func) === typeof(Function);
  }
  }
