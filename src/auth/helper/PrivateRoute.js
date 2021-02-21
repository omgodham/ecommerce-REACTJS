import React, { Component } from 'react'
import { Route , Redirect } from "react-router-dom";
import { isAuthenticated } from './index.js';
export default function PrivateRoute({component : Component,...rest}) {
    console.log("in private route ",isAuthenticated());
    return (
        <Route
        {...rest}
        render = { props =>
            isAuthenticated() ? (<Component {...props} />) :
            (<Redirect to={{
               pathname:'/signin',
               state:{from:props.location} 
            }}     
            />)
        }
        />
    )
}
