class MaiorEMenor {

  constructor(){
    this._menor = Number.MAX_VALUE;
    this._maior = Number.MIN_VALUE;
  }

  encontra(nums){

    this._menor = Number.MAX_VALUE;
    this._maior = Number.MIN_VALUE;

    nums.forEach(num => {
      if(num < this._menor) this._menor = num;
      if(num > this._maior) this._maior = num;
    });
  };

  pegaMenor(){
    return this._menor;
  };

  pegaMaior(){
    return this._maior;
  };
};
