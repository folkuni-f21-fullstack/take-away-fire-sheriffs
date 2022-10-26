import './AdminOrderItem.scss';
import AdminEditOverlay from './overlays/AdminEditOrder'
import { useState } from 'react'
import {  Order } from "../models/models";


interface Props {
    orderItem: Order;
}
function AdminOrderItem({orderItem}: Props) {
    const [openEdit, setOpenEdit] = useState(false);

    let totalPrice = 0;
    for (let item of orderItem.items) {
        totalPrice = totalPrice + item.price;
    } 

    const editPressed = () => {
        {setOpenEdit(true)}
    }

    return (
        <div className="admin-order-item">
            <div className='admin-order-card'>
                <div className='card-upper-section'>
                    <div className='status'></div>
                    <h4 className='status-text'>{orderItem.status}</h4>
                    <h4 className='orderNr'>{orderItem.orderId}</h4>
                </div>
                <p className='order-date'>{orderItem.date}</p>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                </div>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                </div>
                
                <h4 className='admin-card-total-price'>{totalPrice}</h4>
                <input className='admin-card-input' type="text" placeholder='user comment field' />
                <div className='card-buttons'>
                    <button className='edit-btn' onClick={editPressed}>Edit</button>
                    <button className='status-btn'>Preparing</button>
                </div>
                {openEdit && <AdminEditOverlay closeOverlay={setOpenEdit} />}
            </div>
        </div>
        
    )
}

export default AdminOrderItem;