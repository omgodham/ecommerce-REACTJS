import {API} from '../../Backend';
export const makePayment = async (products) => {
// console.log(products);
    return fetch(`${API}/create-checkout-session`,{
    method:'POST',
    headers:{
        Accept:'application/json',     
        'Content-Type':'application/json',
    },
    body:JSON.stringify(products)
}).then(response => response.json()).catch(err => console.log(err));
}