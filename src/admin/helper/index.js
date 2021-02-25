import {API} from '../../Backend';

//create product
export const createProduct = (userId,token,product) =>{
    console.log(userId,token,product);
    return fetch(`${API}/create/product/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//create category
export const createCategory = (userId,token,category) =>{
    return fetch(`${API}/create/category/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(response =>{ return response.json()})
    .catch(err => console.log(err))
}

//update product
export const updateProduct = (productId,userId,token,formData) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:formData
    }).then(response => response.json())
    .catch(err => console.log(err))
}


//update category
export const updateCategory = (userId,token,categoryId,category) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get product by id
export const getProduct = (productId) =>{
    return fetch(`${API}/product/${productId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get category by id
export const getCategory = (categoryId) =>{
    return fetch(`${API}/category/${categoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}


//get all categories
export const getAllCategories = () =>{
    return fetch(`${API}/categories`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}


//get all products
export const getAllProducts = () =>{
    return fetch(`${API}/products`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}


//get products by category id
export const getProductsByCategory = (categoryId) => {
    return fetch(`${API}/products/category/?category=${categoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get product by subcategory id
export const getProductsBySubCategory = (subCategoryId) => {
    return fetch(`${API}/products/subcategory/?subcategory=${subCategoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}


//get product by category and subcategory id
export const getProductsByCategoryAndSubCategory = (categoryId,subCategoryId) => {
    return fetch(`${API}/products/category/subcategory/?category=${categoryId}&&subcategory=${subCategoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get product photo
export const getProductPhoto = (productId) => {
    return `${API}/product/photo/${productId}`;
}

//delete product
export const deleteProduct = (userId,token,productId) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//delete category
export const deleteCategory = (userId,token,categoryId) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
                        Authorization:`Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
}
