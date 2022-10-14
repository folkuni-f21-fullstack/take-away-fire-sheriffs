import './AdminEditOrder.scss'
import { useNavigate } from 'react-router-dom'

interface Prop {
    closeOverlay: (close: boolean) => void;

}

function AdminEditOrder( {closeOverlay}: Prop) {
    const navigate = useNavigate();
    const closeBtn = () => {
        closeOverlay(false)
        navigate('/admin')
    }
    return (
        <section className="admin-edit-overlay-container">
            <div className='admin-edit-overlay'>
                <h1 className='admin-edit-title'>Edit Order</h1>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                    <button className='delete-dish-btn'>Delete</button>
                </div>
                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                    <button className='delete-dish-btn'>Delete</button>
                </div>
                <h2 className='admin-edit-total'>Total: 180:-</h2>
                <input type="text" />
                <input type="text" />
                <button>Change Order</button>
                <button onClick={closeBtn}>Close</button>
            </div>
            

        </section>
    )
}

export default AdminEditOrder;