import {API} from '../../Backend';

export const createUser = (user) =>{
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

export const getUser = (user) =>{
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).then(response =>{ return response.json()})
    .catch(err => console.log(err));
}

export const authinticate = (user,next) =>{ //always do middleware dont make a function only i.e. without next else controlled will not be transfered to 
    //the main program i.e. SignIn ever;
    //I made mistake by not doing it midlleware in first attempt
    if(typeof window !== "undefined")
        localStorage.setItem('auth',JSON.stringify(user));
        next();
    }

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        // console.log("window undefined");
        return false;
    }
         if(localStorage.getItem("auth")){
            // console.log("window defined");
             return JSON.parse(localStorage.getItem("auth"));
         }else {
            // console.log("window defined but");
             return false;
         }
}

export const signout = (token) =>{
    console.log(token);
    localStorage.removeItem('auth');
    return fetch(`${API}/signout`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response =>{ return response.json()})
    .catch(err => console.log(err));
    
}