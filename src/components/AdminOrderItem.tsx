import './AdminOrderItem.scss';
import AdminEditOverlay from './overlays/AdminEditOrder'
import { Key, useState } from 'react'
import {  Orders } from "../models/models";


interface Props {
    fetchOrders: () => void;
    orderItem: Orders;
}
function AdminOrderItem({orderItem, fetchOrders}: Props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [orderStatus, setOrderStatus] = useState(orderItem.status);
    const [orderBtn, setOrderBtn] = useState('Start Order');

    const orderItems = orderItem.items.map((item: { title: string; price: number; }, index: Key) => {
        return (
          <section key={index} className="card-order">
            <p className="card-text">{item.title}</p>
            <p className="card-text">{item.price}:-</p>
          </section>
        );
    });

    let totalPrice = 0;
    for (let item of orderItem.items) {
        totalPrice = totalPrice + item.price;
    } 

    const editPressed = () => {
        {setOpenEdit(true)}
    }

    const StartOrderBtn = () => {
        if (orderStatus == 'ordered') {
            setOrderBtn('Finish Order')
            setOrderStatus('started')
            changeDbStatus('started')
        } else if (orderStatus == 'started') {
            setOrderStatus('finished')
            changeDbStatus('finished')
        }
    }

    async function changeDbStatus(status: string) {
        const query = {
            id: orderItem.orderId,
            status: status
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query)
        }

        const response = await fetch('api/orders/changestatus', requestOptions);
        console.log(response);
    }
    
    async function findOrderOwner(orderItem: Orders) {
        console.log(orderItem);
        
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderItem)
        }
    
        const response = await fetch('api/orders/finduser', requestOptions);
        const data: string = await response.json();
        console.log("data from api/orders/finduser", data);
        return data;
    }

    async function deleteOrder() {
        const username = await findOrderOwner(orderItem);
        console.log("username", username);
        const query = {
          username: username, 
          id: orderItem.id
        }
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query)
        }
    
        const response = await fetch('api/orders/deleteorder', requestOptions);
        // const data: Orders[] = await response.json();
        fetchOrders();
    }


    return (
        <div className="admin-order-item">
            <div className='admin-order-card'>
                <div className='card-upper-section'>
                    <div className={orderStatus}></div>
                    <h4 className='status-text'>{orderStatus}</h4>
                    <h4 className='orderNr'>{orderItem.orderId}</h4>
                </div>
                <p className='order-date'>{orderItem.date}</p>
                <div className='card-info'>
                    {orderItems}
                </div>
                
                
                <h4 className='admin-card-total-price'>{'Total: ' +totalPrice + ':-'}</h4>
                <p className="orderComment">{orderItem.userComment}</p>
                <div className='card-buttons'>
                    <button className='edit-btn' onClick={editPressed}>Edit</button>
                    <button className='status-btn' onClick={StartOrderBtn}>{orderBtn}</button>
                    <button className='delete-btn' onClick={deleteOrder}>Delete</button>
                </div>
                {openEdit && <AdminEditOverlay closeOverlay={setOpenEdit}  orderItem={orderItem}/>}
            </div>
        </div>
        
    )
}

export default AdminOrderItem;