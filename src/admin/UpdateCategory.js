import React,{useEffect, useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { getCategory, updateCategory } from './helper';
import { isAuthenticated } from '../auth/helper';
export default function UpdateCategory({match}) {
    const {user,token} = isAuthenticated();
    const [values,setValues] = useState({
        name:'',
        main:false,
        categoryType:"",
        error:false,
        success:false
    });

//TODO:load dropdown of category type
    useEffect(()=>{
        getCategory(match.params.categoryId).then(data => {
            // console.log(match.params.categoryId);
             console.log(data);
            if(data.error) setValues({...values,error:data.error});
            else  setValues({...values,name:data.name,main:data.main});
        })
    },[]);


    const {name,main,error,success,categoryType} = values;

    const handleChange = name => event => {

        name === "categoryType" && event.target.value === "category" ?
        setValues({...values,[name]:event.target.value,main: true}) :
        setValues({...values,[name]:event.target.value,main: false})
    }

    const handleClick = event =>{
        event.preventDefault();
        updateCategory(user._id,token,match.params.categoryId,{name,main}).then(data => {
            if(data.error) setValues({...values,error:data.error});
            else {
                getCategory(match.params.categoryId);
                setValues({...values,success:true});
            }
        });
    }

    
    const showSuccessMessage = () => {
        return success && <div className='alert alert-success container'>
            Successfully Updated
        </div>
    }

    const showErrorMessage = () => {
        return error && <div className='alert alert-danger container'>
            {error}
        </div>
    }

    return (
        <Base title='UPDATE CATEGORY'>
            <form className='container text-left border p-3'>
            <Link to='/admin/dashboard' className='btn btn-dark mb-4'>Admin Dashboard</Link>
            {showSuccessMessage()}
                {showErrorMessage()}
                <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName" onChange={handleChange('name')} placeholder="Enter Name" value={name} />
                    </div>
                </div>
                
                <div className="form-group row">
          <label htmlFor="inputCategory" className="col-sm-2 col-form-label">Type</label>
          <div className="col-sm-10">
            {/* <input type="text" className="form-control" id="inputPassword" onChange={()=> handleChange(')} placeholder="Password"/> */}
            <select className="form-control" id="inputCategory" onChange={handleChange('categoryType')} value={categoryType}>
            <option value="">Select Category Type</option>
            <option value="category">Category</option>
            <option value="subcategory">Subcategory</option>
            </select>
          </div>
        </div> 
                <button onClick={handleClick} className='btn btn-outline-primary mt-4'>Update Category</button>
            </form>
            </Base>
    )
}
