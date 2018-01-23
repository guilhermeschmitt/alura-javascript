//IIFE é uma função anônima que se invoca automaticamente para criar um escopo de função.
//Aqui usamos o padrão da projeto "Module Pattern", pois uma IIFE só pode ter um retorno, por isso criamos um módulo que
//retornará as funções a serem utilizadas posteriormente.

var ConnectionFactory = (function(){
  const stores = ['negociacoes'];
  const versao = 2;
  const dbName = 'aluraframe';
  var connection = null;
  var close = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error('Não é impossível instanciar essa classe!');
    }

    static getConnection(){
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, versao);

        openRequest.onupgradeneeded = e =>{
          ConnectionFactory._createStores(e.target.result);
        }

        openRequest.onsuccess = e => {
          if(!connection){
            connection = e.target.result;
            close = connection.close.bind(connection);
            //Aqui foi usado o Monkey patch, que é quando modificamos uma função já existente do objeto
            connection.close = function(){
              throw new Error('Não é possível chamar essa classe');
            }
          };

          resolve(connection);
        }

        openRequest.onerror = e =>{
          console.log(e.target.error);
          reject(e.target.error.name);
        }

      });
    }

    static _createStores(connection){
      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store)){
          connection.deleteObjectStore(store);
        }

        connection.createObjectStore(store, {autoIncrement: true});
      })
    }

    static closeConnection(){
      close();
      console.log("FEITOOOO");
      connection = null;
    }
  }


})();
