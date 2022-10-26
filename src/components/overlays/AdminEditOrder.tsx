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
    const orderItems = orderItem.items.map((item, index) => {
        return (
          <div key={index} className="edit-element ">
            <section className="edit-details">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{item.price}:-</p>
            </section>
            <button className="card-btn-delete">Delete</button>
          </div>
        );
    });

    let totalPrice = 0;
    for (let item of orderItem.items) {
        totalPrice = totalPrice + item.price;
    } 
    return (
        <section className="admin-edit-overlay-container">
            <div className='admin-edit-overlay'>
                <div className='edit-upper-container'>
                    <h1 className='admin-edit-title'>Edit Order</h1>
                    <img src="src\assets\close-overlay-button.svg" alt="" onClick={closeBtn} className='admin-close-edit-overlay-btn'/>
                </div>
                <section className='edit-order-title-container'>
                    <h2 className='edit-order-title'> {orderItem.orderId}</h2>
                </section>
                
                <section className='edit-card-info'>
                    {orderItems}
                </section>
                
                <h2 className='admin-edit-total'>{'Total: ' + totalPrice + ':-'}</h2>

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