class Bind {
    // '...' representa o REST operator, isso significa que a partir dele, a propriedade receberá diversos
    //parâmetros e agrupará em um array
    constructor(model, view, ...props) {

       let proxy = ProxyFactory.create(model, props, model => {
           view.update(model)
       });

       view.update(model);
       return proxy;
    }
}
