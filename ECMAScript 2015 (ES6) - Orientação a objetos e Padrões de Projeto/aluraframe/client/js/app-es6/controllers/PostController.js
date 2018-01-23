class PostController {

  constructor() {
  }

  sendPost(event){
    event.preventDefault();
    console.log("Enviando post");
    let $ = document.querySelector.bind(document);
    var inputData = $('#data');
    var inputQuantidade = $('#quantidade');
    var inputValor = $('#valor');

    let negociacao = {
        data: inputData.value,
        quantidade: inputQuantidade.value,
        valor: inputValor.value
    };
    // usando nosso serviço. Veja que nem guardei em uma variável
    new HttpService()
        .post('/negociacoes', negociacao)
        .then(() => {
            inputData.value = '';
            inputQuantidade.value = 1;
            inputValor.value = 0.0;
            inputData.focus();
            alert('Negociação enviada com sucesso');
        })
        .catch(erro => alert(`Não foi possível enviar a negociação: ${erro}`));
  }
}
