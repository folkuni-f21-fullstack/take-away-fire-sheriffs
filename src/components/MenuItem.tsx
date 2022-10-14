import './MenuItem.scss';

import data from '../../data.json';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    id: number;
};

interface Props {
    menu: Menu;
};

function MenuItem({menu}: Props) {

    // const { title, price, ingredients, allergies, id, key } = props

    // const menu: Menu[] = data.menu;
    // console.log(menu);
    
    return (
        <div className="menuItemWrapper">
            <section className="menuItem-title-container">
                <h2>{menu.title}</h2>
                <h2>{menu.price}:-</h2>
            </section>
            <section className="menuItem-ingredients-container">
                <p>{menu.ingredients}</p>
            </section>
            <section className="menuItem-buttons-container">
                <button className='menuItem-btn-info'>More info</button>
                <button className='menuItem-btn-add'>Add to cart</button>
            </section>
        </div>
    )
}

export default MenuItem;