import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
import AdminHeader from '../../components/AdminHeader';
import { User, Order } from '../../models/models';

import { useState, useEffect } from 'react';


interface Props {
    activeUser: string;
}

function AdminHome({activeUser}: Props) {
    console.log("AdminHome - activeUser: ", activeUser);
    const [allOrders, setAllOrders] = useState<Order[] | null>(null);

    const fetchOrders = async () => {
        const response = await fetch('/api/orders', { mode: 'cors' });
        const data: Order[] | any  = await response.json();
        setAllOrders(data);    
    }
    
    
   
    
    
    
    useEffect(() => {
        fetchOrders()
    }, []);
    return (
        <div className="admin-view">
            <AdminHeader />
            
            <section className="content-wrapper">
               <h1 className="admin-view-title">Orders</h1>
               {allOrders ? (
                allOrders.map(order => (
                    <AdminOrderItem key={order.orderId} orderItem={order}/>            
                ))): 'Couldnt find any orders'}
                
               
            </section>
            
        </div>
    )
}

export default AdminHome;