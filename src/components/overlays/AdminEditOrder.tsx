import './AdminEditOrder.scss'
import { useNavigate } from 'react-router-dom'
import { Order } from '../../models/models';

interface Prop {
    closeOverlay: (close: boolean) => void;
    orderItem: Order;
}

function AdminEditOrder( {closeOverlay, orderItem}: Prop) {
    const navigate = useNavigate();
    const closeBtn = () => {
        closeOverlay(false)
        navigate('/admin')
    }
    return (
        <section className="admin-edit-overlay-container">
            <div className='admin-edit-overlay'>
                <div className='edit-upper-container'>
                    <h1 className='admin-edit-title'>Edit Order</h1>
                    <img src="src\assets\close-overlay-button.svg" alt="" onClick={closeBtn} className='admin-close-edit-overlay-btn'/>
                </div>
                
                <div className='card-dish'>
                    <h2>Dish 1</h2>
                    <h2>90:-</h2>
                    <button className='delete-dish-btn'>Delete</button>
                </div>

                <div className='card-dish'>
                    <h2>Dish 1</h2>
                    <h2>90:-</h2>
                    <button className='delete-dish-btn'>Delete</button>
                </div>
                <div className='card-dish'>
                    <h2>Dish 1</h2>
                    <h2>90:-</h2>
                    <button className='delete-dish-btn'>Delete</button>
                </div>
                
                <h2 className='admin-edit-total'>Total: 180:-</h2>

                <div className='admin-edit-inputs'>
                    <input className='user-comment-input' type="text" placeholder='user comment field' />
                    <input className='admin-comment-input' type="text" placeholder='admin comment field' />
                </div>
                
                <div className='admin-edit-buttons'>
                   <button className='admin-change-order-btn'>Change Order</button>
                </div>
                
                
            </div>
            

        </section>
    )
}

export default AdminEditOrder;