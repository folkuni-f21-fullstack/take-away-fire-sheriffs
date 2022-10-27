import './Cart.scss'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../components/CartItem';
import { useShoppingCart } from "../MenuItem"
import { Menu } from '../../models/models';
import MenuItem from '../MenuItem';

interface Props {
    menuItem: Menu;
};
interface Props {
    closeOverlay: (close: boolean) => void;
}

export function Cart( {closeOverlay}: Props) {
    const {cartItems } = useShoppingCart()
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
                    {cartItems.map(item => (
                        <CartItem key={item.id} menuItem={item} />
                    ))}
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