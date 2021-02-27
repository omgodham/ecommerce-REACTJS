import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { updateProduct, getAllCategories, getProduct } from './helper/index';


export default function UpdateProduct({ match }) {
//TODO:1.Read Article about why useState dosen't return current state values on console log
//2.Load previous category and subcategory of product
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
        stock: "",
        category: "",
        subcategory: "",
        categories: [],
        error: false,
        success: false,
        formData: ""
    });

    const { name, description, price, stock, photo, category, categories, subcategory, error, success, formData } = values;

    useEffect(() => {
        getProductById();
    }, []);


    const getProductById = () => {
        // console.log(values);
        getProduct(match.params.productId).then(data => {
            if (data.error) setValues({ ...values, error: data.error });
            else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                    subcategory: data.subcategory,
                    formData:new FormData()
                });
                // console.log(values);
                getCategories();
            }
        });
    }


    const getCategories = () => {
        getAllCategories().then(data => {
            console.log(data);
            if (data.error)
                setValues({ ...values, error: data.error, success: true});
            else
                setValues({categories: data , formData: new FormData() });//this statement means values will
                //be only {categories:[] , formData:()} no other properties
        }).catch(err => console.log(err));
//    console.log(values);
    }


    const handleChange = name => event => {
        console.log(values);
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, success: false });
        console.log(values);

    }

    const handleClick = event => {
        event.preventDefault();
        // console.log("clicked");

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            console.log(data);
            if (data.error)
                setValues({ ...values, error: data.error, success: false });
            else
                setValues({
                    ...values,
                    error: false,
                    success: true
                });
        }).catch(err => console.log(err));
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
    const productForm = () => {
        return <form className='container text-left border p-3'>
            <Link to='/admin/dashboard' className='btn btn-dark mb-4'>Admin Dashboard</Link>
            <div className="form-group row">
                <label htmlFor="inputPhoto" className="col-sm-2 col-form-label">Image</label>
                <div className="col-sm-10">
                    <input type="file" className="form-control" id="inputPhoto" onChange={handleChange('photo')} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputName" onChange={handleChange('name')} placeholder="Enter Name" value={name} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputDes" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <textarea type="text" className="form-control" id="inputDes" onChange={handleChange('description')} placeholder="Enter Description" value={description} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Price</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputPrice" onChange={handleChange('price')} placeholder="Enter Price" value={price} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputCategory" className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-10">
                    {/* <input type="text" className="form-control" id="inputPassword" onChange={()=> handleChange(')} placeholder="Password"/> */}
                    <select className="form-control" id="inputCategory" onChange={handleChange('category')} value={category}>
                        <option value="">Select</option>
                        {
                            categories.map((category, index) => {
                                if (category.main)
                                    return <option key={index} value={category._id}>{category.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputSubCategory" className="col-sm-2 col-form-label">Subcategory</label>
                <div className="col-sm-10">
                    {/* <input type="text" className="form-control" id="inputPassword" onChange={()=> handleChange(')} placeholder="Password"/> */}
                    <select className="form-control" id="inputSubCategory" onChange={handleChange('subcategory')} value={subcategory}>
                        <option value="">Select</option>
                        {
                            categories.map((subcategory, index) => {
                                if (!subcategory.main)
                                    return <option key={index} value={subcategory._id}>{subcategory.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputStock" className="col-sm-2 col-form-label">Stock</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputSold" onChange={handleChange('stock')} placeholder="Enter Stock" value={stock} />
                </div>
            </div>
            <button type='submit' className='btn btn-primary mt-4' onClick={handleClick}>Update Product</button>
        </form>
    }


    return (
        <Base title='UPDATE PRODUCT' description='Here you can update products for your customers'>
            <div>
                {showErrorMessage()}
                {showSuccessMessage()}
                {productForm()}
            </div>
        </Base>
    )
}
