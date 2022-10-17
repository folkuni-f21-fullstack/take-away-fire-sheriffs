import './Cart.scss'
import { useNavigate } from 'react-router-dom'
interface Prop {
    closeOverlay: (close: boolean) => void;

}
function Cart( {closeOverlay}: Prop) {
    const navigate = useNavigate();
    const closeBtn = () => {
        closeOverlay(false)
    }
    return (
        <section className='cart-overlay-container'>

            <div className='cart-container'>
                <h1 className='cart-title'>Cart</h1>

                <div className='card-dish'>
                    <p>Dish 1</p>
                    <p>90:-</p>
                    <button className='delete-dish-btn'>Delete</button>
                </div>

                <h2 className='cart-total'>Total: 180:-</h2>

                <div className='cart-inputs'>
                    <input className='user-comment-input' type="text" placeholder='comment' />
                </div>

                <div className='cart-buttons'>
                    <button className='cart-porder-btn'>Place Order</button>
                    <button className='cart-edit-overlay-btn' onClick={closeBtn}>Close</button> 
                </div>
            </div>
            
        </section>
    )
}

export default Cart;