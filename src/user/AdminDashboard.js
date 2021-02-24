import React from 'react';
import "./AdminDashboard.css";
import Base from '../core/Base';
import {Link} from 'react-router-dom';
export default function AdminDashboard() {
    return (
        <Base title='ADMIN DASHBOARD'>
        <div className='admin-dashboard'>
            <div className='admin-actions'>
                <ul className="list-group">
                    <li>
                        <Link  className="list-group-item disabled bg-danger text-white">Admin Actions</Link>
                    </li>
                    <li>
                        <Link to='/admin/create/product' className="list-group-item">Create Product</Link>
                    </li>
                    <li>
                        <Link to='/admin/create/category' className="list-group-item">Create Category</Link>
                    </li>
                    <li>
                        <Link to='/admin/manage/products' className="list-group-item">Manage Product</Link>
                    </li>
                    <li>
                        <Link to='/admin/manage/categories' className="list-group-item">Manage Category</Link>
                    </li>
                    <li>
                        <Link to='/admin/manage/orders' className="list-group-item">Manage Orders</Link>
                    </li>
                </ul>
            </div> 
            <div className='admin-info'>
            <h3 style={{position:'absolute',top:'10px'}}>Admin Info</h3>
            <span className="badge badge-primary">Name : </span><h5>Admin Name</h5>
            <span className="badge badge-primary">Email : </span> <p>omkargodham9@gmai.com</p>
            <span className="badge badge-success">You are Admin</span>
            </div>            
        </div>
        </Base>
    )
}
