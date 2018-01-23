var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
  event.preventDefault();
  var form = document.querySelector("#form-adiciona");
  var paciente = obtemDadosDoPaciente(form);
  var erros = validaPaciente(paciente);
  var ul = document.querySelector("#mensagens-erro");
  if(erros.length > 0){
    exibeMensagensDeErro(erros, ul);
    return;
  }
  adicionaPacienteNaTabela(paciente);
  ul.innerHTML = "";
  form.reset();
});

function adicionaPacienteNaTabela(paciente){
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros, ul){
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";
  erros.forEach(function(err){
    var li = document.createElement("li");
    li.textContent = err;
    ul.appendChild(li);
  })
}

function validaPaciente(paciente){
  var erros = [];
  if(paciente.nome.length == 0){
    erros.push("Nome é um campo obrigatório!");
  }
  if(paciente.peso.length == 0){
    erros.push("Peso é um campo obrigatório!");
  }
  if(!validaPeso(paciente.peso)){
    erros.push("Peso Inválido!");
  }
  if(paciente.altura.length == 0){
    erros.push("Altura é um campo obrigatório!");
  }
  if(!validaAltura(paciente.altura)){
    erros.push("Altura Inválida!");
  }
  if(paciente.gordura.length == 0){
    erros.push("Gordura é um campo obrigatório!");
  }

  return erros;
}

function obtemDadosDoPaciente(form){
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
  return paciente;
}

function montaTr(paciente){
 var pacienteTr = document.createElement("tr");
 pacienteTr.classList.add("paciente");
 pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
 pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
 pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
 pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
 pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
 return pacienteTr;
}

function montaTd(dado, classe){
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = dado;
  return td;
}
