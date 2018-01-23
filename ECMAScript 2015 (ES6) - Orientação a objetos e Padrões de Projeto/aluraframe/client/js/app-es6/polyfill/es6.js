//Usado para dar suporte ao includes em versões do Edge, 13 ou inferior.

if(!Array.prototype.includes) {

  // Se não existir, adiciona

  console.log('Polyfill para Array.includes aplicado.');

  Array.prototype.includes = function(elemento) {
    return this.indexOf(elemento) != -1;
  };
}
