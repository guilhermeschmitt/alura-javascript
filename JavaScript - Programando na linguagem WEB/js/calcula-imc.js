var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");
for(var i = 0; i < pacientes.length; i++){
  var paciente = pacientes[i];
  var peso = paciente.querySelector(".info-peso").textContent;
  var altura = paciente.querySelector(".info-altura").textContent;
  var tdImc = paciente.querySelector(".info-imc");
  tdImc.textContent = calculaImc(peso, altura);
  if(!validaPeso(peso)){
    paciente.classList.add("paciente-invalido");
    tdImc.textContent = "Peso Inválido!";
  }
  else if(!validaAltura(altura)){
    paciente.classList.add("paciente-invalido");
    tdImc.textContent ="Altura Inválida!";
  }
  else{
    tdImc.textContent = calculaImc(peso, altura);
  }
}

function calculaImc(peso, altura){
    var imc = 0;
    imc = peso / (altura * altura);
    return imc.toFixed(1);
}

function validaPeso(peso){
  if(peso >= 0 && peso <= 1000){
    return true;
  }
  else{
    return false;
  }
}

function validaAltura(altura){
  if(altura >= 0 && altura <= 3){
    return true;
  }
  else{
    return false;
  }
}
