import {API} from '../../Backend';

export const createProduct = (userId,formData) =>{
    return (`${API}/create/product/${userId}`,{
        method:'POST',
        headers:{
            Accept:'applicaation/json',
            Authorization:'Bearer ${token}'
        },
        body:formData
    }).then(response => response.json())
    .catch(err => console.log(err))
}


export const createCategory = (userId,category) =>{
    return (`${API}/create/category/${userId}`,{
        method:'POST',
        headers:{
            Accept:'applicaation/json',
            Authorization:'Bearer ${token}'
        },
        body:json.stringify(category)
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const updateProduct = (userId,formData) =>{
    return (`${API}/update/product/${userId}`,{
        method:'POST',
        headers:{
            Accept:'applicaation/json',
            Authorization:'Bearer ${token}'
        },
        body:formData
    }).then(response => response.json())
    .catch(err => console.log(err))
}


export const updateCategory = (userId,category) =>{
    return (`${API}/update/category/${userId}`,{
        method:'POST',
        headers:{
            Accept:'applicaation/json',
            Authorization:'Bearer ${token}'
        },
        body:JSON.stringify(category)
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getProduct = (productId) =>{
    return (`${API}/product/${productId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getCategory = (categoryId) =>{
    return (`${API}/category/${categoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getAllCategory = () =>{
    return (`${API}/categories`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getAllProducts = () =>{
    return (`${API}/products`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getProductsByCategory = (categoryId) => {
    return (`${API}/products/category/?category=${categoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getProductsBySubCategory = (subCategoryId) => {
    return (`${API}/products/subcategory/?subcategory=${subCategoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getProductsByCategoryAndSubCategory = (categoryId,subCategoryId) => {
    return (`${API}/products/category/subcategory/?category=${categoryId}&&subcategory=${subCategoryId}`,{
        method:'GET'
    }).then(response => response.json())
    .catch(err => console.log(err))
}