import './CartItem.scss'
import { Menu } from '../models/models';
import { useShoppingCart } from './MenuItem';

interface Props {
    menuItem: Menu;
};

type CartItem = {
    id: number
    quantity: number
    title: string
    price: number
}
export function CartItem({menuItem}: Props) {
    const { removeFromCart } = useShoppingCart()
    
    return (
        
                <section className='card-dish'>

                    <section className='card-dish-title'>
                    <p> {menuItem.title} </p>
                    <p> {menuItem.price}:-</p>
                    </section>
                    
                    <button className='delete-dish-btn'onClick={() => removeFromCart(menuItem.id)}>Delete</button>
                    
                </section>
            
        
    )
}

export default CartItem;