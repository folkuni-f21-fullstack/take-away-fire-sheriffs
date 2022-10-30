import './AdminHome.scss';
import AdminOrderItem from "../../components/AdminOrderItem";
import AdminHeader from '../../components/AdminHeader';
import { User, Orders } from '../../models/models';
import OrdersLogo from '../../assets/orders-title.svg';
import { useState, useEffect } from 'react';


interface Props {
    activeUser: string;
}

function AdminHome({activeUser}: Props) {
    console.log("AdminHome - activeUser: ", activeUser);
    const [allOrders, setAllOrders] = useState<Orders[] | null>(null);
    const [finished, setFinished] = useState<boolean>(false);
    const [ordered, setordered] = useState<boolean>(false);
    const [started, setstarted] = useState<boolean>(false);

    const fetchOrders = async () => {
        const response = await fetch('/api/orders', { mode: 'cors' });
        const data: Orders[] | null  = await response.json();
        
        if (data) {
            if (finished) {
                const finishedOrders = data.filter(data => data.status == 'finished');
                setAllOrders(finishedOrders);
            } else if (ordered) {
                const orderedOrders = data.filter(order => order.status == 'ordered');
                setAllOrders(orderedOrders);
            } else if (started) {
                const startedOrders = data.filter(order => order.status == 'started');
                setAllOrders(startedOrders);
            } else {
                setAllOrders(data);
            } 
        }
    }
    
    useEffect(() => {
        fetchOrders()
    }, [finished, ordered, started]);

    function showFinished() {
        setFinished(true);
        setordered(false);
        setstarted(false);
    }

    function showOrdered() {
        setordered(true);
        setFinished(false);
        setstarted(false);
    }

    function showStarted() {
        setstarted(true);
        setFinished(false);
        setordered(false);
    }

    function showAll() {
        setordered(false);
        setFinished(false);
        setstarted(false);
    }

    if (allOrders) {
        allOrders.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else if (a.date > b.date) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    

    return (
        <div className="admin-view">
            <AdminHeader />
            
            <section className="content-wrapper">
               <img src={OrdersLogo} className="admin-view-title"></img>
               <div className="button-wrapper">
                <button onClick={showFinished}>Show Finished</button>
                <button onClick={showOrdered}>Show Ordered</button>
                <button onClick={showStarted}>Show Started</button>
                <button onClick={showAll}>Show All</button>
               </div>
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