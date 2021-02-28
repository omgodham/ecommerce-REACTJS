import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import UserDashBoard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashboard';
import CreateProduct from './admin/CreateProduct';
import CreateCategory from "./admin/CreateCategory";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from './admin/UpdateCategory';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct  from './admin/UpdateProduct';
import CategoryProducts from './core/CategoryProducts';
import Cart from './core/Cart';
export default function Routes() {
    return (
        <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/collections/:category' component={CategoryProducts} />
            <Route exact path='/cart' component={Cart} />
            <PrivateRoute exact path='/user/dashboard' component={UserDashBoard} />
            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <AdminRoute exact path='/admin/create/product' component={CreateProduct} />
            <AdminRoute exact path='/admin/create/category' component={CreateCategory} />
            <AdminRoute exact path='/admin/manage/categories' component={ManageCategories} />
            <AdminRoute exact path='/admin/manage/products' component={ManageProducts} />
            <AdminRoute  path='/admin/update/category/:categoryId' component={UpdateCategory} />
            <AdminRoute  path='/admin/update/product/:productId' component={UpdateProduct} />
        </Switch>
        </Router>
    )
}
