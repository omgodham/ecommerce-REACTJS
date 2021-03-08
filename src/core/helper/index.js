export const addToCart = (product,next) =>{
let cart = [] ;
if(typeof window !== "undefined"){  
    if(localStorage.getItem('cart'))
           cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(product);
         localStorage.setItem('cart',JSON.stringify(cart));
}
// console.log(cart);
next();
} 

export const getCartItems = () =>{
    let cart = [];
    if(typeof window !== "undefined"){
        cart = localStorage.getItem('cart');
    }
    return JSON.parse(cart);
}

export const removerProductFromCart = (id,next) =>{
let cart = [];
if(typeof window !== "undefined"){
    cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter((product,index) => {
      return product.id !== id;
  })
  localStorage.setItem('cart',JSON.stringify(cart));
  next();
}
}

export const removerAllProductFromCart = (next) =>{
    if(typeof window !== "undefined")
        localStorage.removeItem('cart');
    next();
    }
