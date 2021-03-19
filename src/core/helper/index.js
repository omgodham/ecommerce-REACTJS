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


export const createOrder = (userId,orderData,token) => {
    console.log(orderData);
    return fetch(`${API}/create/order/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(orderData)
    }).then(response => response.json())
}