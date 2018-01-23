class HttpService {

  _handleErrors(res){
    if(!res.ok) throw new Error(res.statusTexto);
    return res;
  }

    get(url) {
      /* No ES 2016, foi incluída uma API com o objetivo de simplificar a
      criação de requisições Ajax: Fetch API, uma API de busca do JS. */
      return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());

/*        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
              //Existem 4 estados nesse readyState
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }

            xhr.send();
        });
*/
    }

    post(url, dado){
      // Como parâmetros usaremos a url e uma configuração da requisição que será recebida.
        return fetch(url, {
          headers: {'Content-type': 'application/json'},
          method: 'post',
          body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));

/*      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        //Aqui eu digo o tipo de dado enviado para o servidor
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(chr.responseText))
            }else{
              reject(xhr.responseText);
            }
          }
        }
        xhr.send(JSON.stringfy(dado));
      })
      */
    }
}
