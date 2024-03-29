import {API} from '../../Backend';

//add particular product in cart
export const addProductInCart = (userId,token,product) =>{
return fetch(`${API}/user/cart/${userId}`,{
    method:'POST',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(product)
}).then(response => response.json())
.catch(err => console.log(err));
}

//get product from cart
export const getCartProduct = (userId,productId,token) =>{
    return fetch(`${API}/user/cart/${productId}/${userId}`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err));
}


//update product in cart
export const updateProductInCart = (userId,productId,token,product) => {
    // const {quantity} = product;
    // console.log(product);
    return fetch(`${API}/user/cart/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
    }).then(response => response.json())
    .catch(err => console.log(err));
}


//get user cart
export const getCart = (userId,token) =>{
    return fetch(`${API}/user/cart/${userId}`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err));
}

//delete product from cart 
export const deleteProductFromCart = (userId,productId,token) => {
return fetch(`${API}/user/cart/delete/${productId}/${userId}`,{
    method:'PUT',
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(response => response.json())
.catch(err => console.log(err));
}

//delete all products from cart
export const deleteAllProductsFormCart = (userId,token) => {
    return fetch(`${API}/user/cart/${userId}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err));
    }

  export const getOrdersByUserId = (userId,token) => {
      return fetch(`${API}/orders/user/${userId}`,{
          method:'GET',
          headers:{
              Authorization:`Bearer ${token}`
          }
      }).then(response => response.json())
      .catch(err => console.log(err))
  }  