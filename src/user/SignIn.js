import React,{useState} from 'react';
import Base from '../core/Base';
import {authinticate,getUser, isAuthenticated} from '../auth/helper/index';
import {Redirect} from 'react-router-dom';
import ReactLoading from 'react-loading';
export default function SignIn() {
    
    //TODO:Add loading page
    const [user,setUser] = useState({
        email:'',
        password:'',
        error:false,
        success:false,
        isLoading:false
    });
    // const [auth,setAuth] = useState({});
    // const {user,token} = isAuthenticated();
const {email,password,error,success,isLoading} = user;


const handleChange = (event) => {
    const {name,value}=event.target;
    setUser({...user,[name]:value});
}

const handleSubmit = (event) =>{
    // console.log(user);
    event.preventDefault();
    getUser({email,password}).then(data => {
        // console.log(data);
        if(data.error){
            setUser({...user,error:data.error,success:false});
        }
        else{
            // setAuth(data);
            authinticate(data,()=>{
                setUser({email:"",password:"",error:false,success:true,isLoading:true});
            });
        }
    });
}


const handleError = (error) =>{
    return ( error && <div className="alert alert-danger" role="alert">
    {error}
  </div> );
}

const doRedirect = (success) =>{
    // console.log(success);
    console.log(isAuthenticated());
    if(success){
        if(isAuthenticated().user.role === 0){
            return <Redirect to='/user/dashboard' />
        }else if(isAuthenticated().user.role === 1){
            return <Redirect to='/admin/dashboard' />
        }
    }
    if(isAuthenticated()){
        return <Redirect to='/' />
    }
    
}
    return (
        <Base title='SIGN IN'>
            <form className='text-left' style={{width:"50%",margin:"0 auto"}}>
            {handleError(error)}
            {/* {isLoading && <ReactLoading  type={"bars"} color={"grey"}/>} */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={handleChange} className="form-control" name='email' value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={handleChange} name='password' value={password} className="form-control" id="exampleInputPassword1"/>
                </div>
               
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Signin</button>
            </form> 
            {doRedirect(success)}
        </Base>
    )
}
