import './CartItem.scss'
import { Menu } from '../models/models';
import { useShoppingCart } from './MenuItem';

interface Props {
    menuItem: Menu;
};

export function CartItem({menuItem}: Props) {
    const { removeFromCart } = useShoppingCart()
    
    return (
        <section >
                
                <div className='card-dish'>
                    <p> {menuItem.title} </p>
                    <p> {menuItem.price} </p>

                    <section className='cart-btns'>
                    <button className='delete-dish-btn'onClick={() => removeFromCart(menuItem.id)}>Delete</button>
                    </section>
                </div>
            
        </section>
    )
}

export default CartItem;