import './AdminOrderItem.scss';
import AdminEditOverlay from './overlays/AdminEditOrder'
import { useState } from 'react'

function AdminOrderItem() {
    const [openEdit, setOpenEdit] = useState(false);
    const editPressed = () => {
        {setOpenEdit(true)}
    }
    return (
        <div className="admin-order-item">
            <div className='admin-order-card'>
                <div className='card-upper-section'>
                    <div className='status'></div>
                    <h4 className='status-text'>Preparing</h4>
                    <h4 className='orderNr'>orderNr 1001</h4>
                </div>
                <p className='order-date'> 2022-10-07 kl 16:38</p>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                </div>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                </div>
                
                <h4 className='admin-card-total-price'>Totalt: 180:-</h4>
                <input className='admin-card-input' type="text" />
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