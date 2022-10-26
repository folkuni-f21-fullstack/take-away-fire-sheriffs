import './CartItem.scss'
import { Menu } from '../models/models';

interface Props {
    menuItem: Menu;
};

function CartItem({menuItem}: Props) {

    
    return (
        <section >
                
                <div className='card-dish'>
                    <p> {menuItem.title} </p>
                    <p> {menuItem.price} </p>

                    <section className='cart-btns'>
                    <button className='remove-dish-btn'>-</button>
                    <button className='delete-dish-btn'>Delete</button>
                    <button className='add-dish-btn'>+</button>
                    </section>
                </div>
            
        </section>
    )
}

export default CartItem;