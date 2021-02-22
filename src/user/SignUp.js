import React,{useState} from 'react';
import Base from '../core/Base';
import {createUser} from '../auth/helper/index';
export default function SignUp() {
    
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirm_password:'',
        error:false,
        success:false
    });

const {name,email,password,confirm_password,error,success} = user;


const handleChange = (event) => {
    const {name,value}=event.target;
    setUser({...user,[name]:value});
}

const handleSubmit = (event) =>{
    console.log(user);
    event.preventDefault();
    createUser({name,email,password,confirm_password}).then(data => {
        console.log(data);
        if(data.error){
            setUser({...user,error:data.error,success:false});
        }
        else{
            setUser({name:"",email:"",password:"",confirm_password:"",error:false,success:true});
        }
    });
}

const handleError = (error) =>{
    return ( error && <div className="alert alert-danger" role="alert">
    {error}
  </div> );
}

const handleSuccess = (success) =>{
    return (success && <div className="alert alert-success" role="alert">
    User Create Successfully
  </div> );
}

    
    return (
        <Base title='CREATE AN ACCOUNT'>
            <form className='text-left' style={{width:"50%",margin:"0 auto"}}>
            {handleError(error)}
            {handleSuccess(success)}
            <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">Your Name</label>
                    <input type="text" onChange={handleChange} className="form-control" value={name} name='name' id="exampleInputEmail2"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={handleChange} className="form-control" name='email' value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={handleChange} name='password' value={password} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirmed Password</label>
                        <input type="password" onChange={handleChange} className="form-control" value={confirm_password} name='confirm_password' id="exampleInputPassword1" />
                </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
            </form> 
        </Base>
    )
}
