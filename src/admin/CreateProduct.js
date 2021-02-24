import React from 'react'
import Base from '../core/Base'

export default function CreateProduct() {
   
    const productForm = () => {
        return <form className='container text-left'>
        <div class="form-group row">
          <label for="inputPhoto" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="inputPhoto" placeholder=""/>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputName" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputName" placeholder="Enter Name"/>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDes" class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <textarea type="text" class="form-control" id="inputDes" placeholder="Enter Description"/>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="inputPrice" placeholder="Enter Price"/>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputCategory" class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-10">
            {/* <input type="text" class="form-control" id="inputPassword" placeholder="Password"/> */}
            <select class="form-control" id="inputCategory">
                <option>summer</option>
                <option>winter</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputStock" class="col-sm-2 col-form-label">Stock</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="inputSold" placeholder="Enter Stock"/>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>Create Product</button>
      </form>
    }

    return (
        <Base title='CREATE PRODUCT' description='Here you can create new products for your customers'>
          <div>
            {productForm()}
        </div>
        </Base>
    )
}
