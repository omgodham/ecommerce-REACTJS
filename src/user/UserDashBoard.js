import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import {getOrdersByUserId, getProduct ,updateOrderStatus} from '../admin/helper';
import {isAuthenticated} from '../auth/helper';

export default function UserDashBoard() {
   const {user , token} = isAuthenticated();
    const [orders ,setOrders] = useState([]);
    const [reload ,setReload] = useState(false);
    
    useEffect(() => {
        getOrdersByUserId(user._id,token).then(data => {
            if(data.error) console.log(data.error);
            else
            setOrders(data);
        })
    }, [reload]);

    const SeparateOrder = ({order,products,index,reload,setReload}) => {

        const [productNames,setProductNames] = useState([]);

            useEffect(()=>{
                console.log(products);
                products.map((product,index) => {
                    getProdcutNames(product.product);     
                });
            },[]);

             const getProdcutNames = async (productId) => {
                const data = await getProduct(productId);
                setProductNames(productNames => [...productNames,data.name]);
             }

             const handleDelete = () => {
                updateOrderStatus(order._id,user._id,{status:"Cancelled"},token).then(data => {
                   console.log(data);
                    if(data.error) console.log(data.error);
                    else setReload(!reload);
                });
             }

        return <div className='d-flex border-bottom mb-3 p-2' key={index}>
        <h3>{index+1}. Order On : {(order.createdAt).split("T")[0]} </h3>
        <div>
            <ul className='list-group pl-2 pr-2'>
        {productNames && productNames.map((productName,index)=>{
            return <li className='list-group-item' key={index}>{productName}</li>
        })}
            </ul>
        </div>
        <h4>Amount:{order.amount}</h4>
        {order.status !== 'Cancelled' && <h4 className='text-primary p-2'>{order.status}</h4>}
        {order.status == 'Cancelled' ? <h4 className='text-danger ml-2'>Order Cancelled </h4> : <button className='btn btn-outline-warning m-2' onClick={handleDelete} style={{height:'40px'}}>Cancel Order</button>}
       
        
        </div>
    }

    return (
        <Base title='User Dashboard'>
        <div className='container text-center'>
         {orders && orders.map((order,index) => {
            return <SeparateOrder key={index} order={order} products={order.products} index={index} reload={reload} setReload={setReload}/>    
         })}
            
        </div>
        </Base>
    )
}
