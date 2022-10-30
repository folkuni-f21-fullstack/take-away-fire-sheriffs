import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
import AdminHeader from '../../components/AdminHeader';
import { User, Orders } from '../../models/models';

import { useState, useEffect } from 'react';


interface Props {
    activeUser: string;
}

function AdminHome({activeUser}: Props) {
    console.log("AdminHome - activeUser: ", activeUser);
    const [allOrders, setAllOrders] = useState<Orders[] | null>(null);

    const fetchOrders = async () => {
        const response = await fetch('/api/orders', { mode: 'cors' });
        const data: Orders[] | any  = await response.json();
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
               <div className="admin-order-items-wrapper">
                {allOrders ? (
                    allOrders.map(order => (
                        <AdminOrderItem key={order.orderId} orderItem={order} fetchOrders={fetchOrders} />            
                    ))): 'Couldnt find any orders'}
                </div>
               
            </section>
            
        </div>
    )
}

export default AdminHome;