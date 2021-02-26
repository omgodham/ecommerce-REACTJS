import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';

import {getAllCategories,deleteCategory} from "./helper/index";
import { isAuthenticated } from '../auth/helper';


//TODO:delete all products having that category


export default function ManageCategories() {


    const [categories,setCategories] = useState([]);
    const {user,token} = isAuthenticated();


    useEffect(()=> {
        getCategories();        
    },[]);
    

    const getCategories = () =>{
        getAllCategories().then(data => {
            if(data.error)
                console.log(data.error);
                else
                setCategories(data);
        });
    }

    const handleDelete = (categoryId) =>{
        deleteCategory(user._id,token,categoryId).then(data => {
            if(data.error) console.log(data.error)
            else
            {
                getCategories();
                alert('Deleted Successfully');
            }
        });
    }


    return (
        <Base title='Manage Categories'>
        <div className='container text-left'>
        <Link to='/admin/dashboard' className='btn btn-dark mb-4 mt-4'>Admin Dashboard</Link>
            <h1 className='text-warning'>Main Categoires</h1>
            {categories.map((category,index) => {
                return category.main && <div className=' d-flex row p-3 ' key={index}>
                <h4 className='col-md-3' style={{textTransform:'capitalize'}}>{category.name}</h4>
                <Link to={`/admin/update/category/${category._id}`} className='btn btn-success col-md-3 mr-2'>Update</Link>
                <button onClick={()=>{handleDelete(category._id)}} className='btn btn-danger col-md-3'>Delete</button>
            </div>
            })
            } 
            <h1 className='text-warning mt-4'>Sub Categoires</h1>
            {categories.map((category,index) => {
                return !category.main && <div className=' d-flex row p-3' key={index}>
                <h4 className='col-md-3' style={{textTransform:'capitalize'}}>{category.name}</h4>
                <Link to={`/admin/update/category/${category._id}`} className='btn btn-success col-md-3 mr-2'>Update</Link>
                <button onClick={()=>{handleDelete(category._id)}} className='btn btn-danger col-md-3'>Delete</button>
            </div>
            })
            } 
            </div>
        </Base>
    )
}
