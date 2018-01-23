
class NegociacaoController {
  constructor() {
    /*A função bind, indica qual será o valor de this quando ela for executada,
      para o querySelector funcionar, o objeto this precisa ser o document. */
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    //this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView,
                            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
    this._ordemAtual = '';
    this._service = new NegociacaoService();
    this._init();
    let self = this;
    Object.freeze(this);
  }

  _init(){
    this._service.lista()
       .then(negociacoes =>
           negociacoes.forEach(negociacao =>
               this._listaNegociacoes.adiciona(negociacao)))
        .catch(erro => this._mensagem.texto = erro);

    setInterval(() =>
      {  this._importaNegociacao()
      } ,3000);
  }

  _importaNegociacao(){
    //Foi utilizado o Padrão de projeto Promisse para fazer a importação.
    //Promise.all resolve as promises em paralelo, ou seja, uma promise não aguarda a outra terminar para ser executada.
    this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas'
        }))
        .catch(erro => this._mensagem.texto = erro);
  }



  /*Quando colocamos um _ na frente de um método, queremos dizer que ele
  "só pode ser chamado" dentro daquela classe, que nem os atributos */
  _criaNegociacao(){
    //Quando eu tenho métodos statics, eu não preciso de uma instancia do objeto para acessa-los
    let data = DateHelper.textoParaData(this._inputData.value);
    return new Negociacao(
      data,
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value));
    }

    _limpaFormulario(){
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0;
      this._inputData.focus();
    }

  adiciona(event){
    event.preventDefault();
    let negociacao = this._criaNegociacao();
    this._service.adiciona(negociacao)
        .then(mensagem => {
          this._listaNegociacoes.adiciona(negociacao); //¹
          this._mensagem.texto = mensagem;
          this._limpaFormulario();
        })
        .catch(erro => this._mensagem.texto = erro);
  }

  apaga(){
    event.preventDefault();
    this._service
      .apaga()
      .then(mensagem => {
          this._mensagem.texto = mensagem;
          this._listaNegociacoes.esvazia();
      })
      .catch(erro => this._mensagem.texto = erro);
  }


  //Tive que colocar esse 'self' aqui para ter acesso a ordem atual, aparentemente o escopo que é levado para
  //a execução é a do index
  ordena(coluna){
    if(self._ordemAtual == coluna){
      console.log(this._ordemAtual);
      this._listaNegociacoes.inverteOrdem();
    }else{
      this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
    }
    self._ordemAtual = coluna;
  }
}

/* ¹
Aqui eu poderia ter feito com essas soluções, mas foi decidido usar o padrão de projeto Proxy.
->Poderia ter feito com a API Reflection, mas teria que passar um contexto como parâmetro, ficaria assim:
      this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
              this._negociacoesView.update(model);
          });
  E na classe ListaNegociacoes chamaria isso nos métodos que usam update:
      Reflect.apply(this._funcao, this._contexto, [this]);

  O primeiro parâmetro é o método ou função que desejamos invocar.
  O segundo parâmetro é o contexto que o método ou função adotará, ou seja, o valor
  que será assumido pelo this. Por fim, o último parâmetro é um array que contém todos
  os parâmetros que o método passado como primeiro parâmetro receberá. Como ele não
  recebe parâmetro nenhum, passamos um array vazio.

->Poderia ter usado self também, que eu colocaria let self = this, daí quando executasse
  o escopo do método, pegaria o self que aponta pra esse objeto

->Arrow function: O this de uma função é dinâmico, isto é, seu valor é determinado
 no momento em que a função é chamada. Como o this é dinâmico, é possível usar artifícios da
 linguagem, como a API Reflect, para alterá-lo se assim desejarmos. O this de uma arrow function
 é léxico, isto é, seu valor é determinado no local onde a arrow function for definida, ela
 não cria um novo this. O this de uma arrow function não pode ser alterado, mesmo se usarmos
 recursos da linguagem, como a API Reflect.

 No controller a chamada seria a seguinte:
      this._listaNegociacoes.adiciona(this._criaNegociacao());
 E na lista de negociações:
     constructor(funcao) {
       this._negociacoes = [];
       this._funcao = funcao;
     }
 Eu passo a Lista de negociacoes como o objeto parâmetro
     this._funcao(this);
  */
