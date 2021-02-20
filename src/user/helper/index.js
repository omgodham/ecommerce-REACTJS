import {API} from '../../Backend';

export const createUser = (user) =>{
    console.log(process.env.REACT_APP_BACKEND);
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).then(response =>{ return response.json()})
    .catch(err => console.log(err));
}