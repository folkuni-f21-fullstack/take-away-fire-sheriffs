import './Cart.scss'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../components/CartItem';
import { Menu } from '../../models/models';
import MenuItem from '../MenuItem';



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
                <div className='cart-upper-container'>
                    <h1 className='cart-title'>Cart</h1>
                    <img src="src\assets\close-overlay-button.svg" alt="" onClick={closeBtn} className='close-overlay-btn'/>
                </div>
                
                <CartItem menuItem={{
                    title: '',
                    price: 0,
                    ingredients: '',
                    allergies: '',
                    imgUrl: '',
                    id: 0
                }} />

                
                <h2 className='cart-total'>Total: 180:-</h2>

                <div className='cart-inputs'>
                    <input className='user-comment-input' type="text" placeholder='comment' />
                </div>

                <div className='cart-buttons'>
                    <button className='cart-porder-btn'>Place Order</button>
                </div>
                
            </div>
            
        </section>
    )
}

export default Cart;