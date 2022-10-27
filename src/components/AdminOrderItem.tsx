import './AdminOrderItem.scss';
import AdminEditOverlay from './overlays/AdminEditOrder'
import { useState } from 'react'
import {  Order } from "../models/models";


interface Props {
    orderItem: Order;
}
function AdminOrderItem({orderItem}: Props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [orderStatus, setOrderStatus] = useState(orderItem.status);

    const orderItems = orderItem.items.map((item, index) => {
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
            setOrderStatus('started')
        } else if (orderStatus == 'started') {
            setOrderStatus('finished')
        }

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
                <input className='admin-card-input' type="text" placeholder='user comment field' />
                <div className='card-buttons'>
                    <button className='edit-btn' onClick={editPressed}>Edit</button>
                    <button className='status-btn' onClick={StartOrderBtn}>Start Order</button>
                </div>
                {openEdit && <AdminEditOverlay closeOverlay={setOpenEdit}  orderItem={orderItem}/>}
            </div>
        </div>
        
    )
}

export default AdminOrderItem;