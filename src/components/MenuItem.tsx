import './MenuItem.scss';

import DishInfo from './overlays/DishInfo';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    id: number;
};

interface Props {
    menuItem: Menu;
};

function MenuItem({menuItem}: Props) {

    function handleClick() {
        console.log(menuItem.title);
    }
    
    return (
        <>
            <div className="menuItemWrapper">
                <section className="menuItem-title-container">
                    <h2>{menuItem.title}</h2>
                    <h2>{menuItem.price}:-</h2>
                </section>
                <section className="menuItem-ingredients-container">
                    <p>{menuItem.ingredients}</p>
                </section>
                <section className="menuItem-buttons-container">
                    <button className='menuItem-btn-info' onClick={ handleClick }>More info</button>
                    <button className='menuItem-btn-add'>Add to cart</button>
                </section>
            </div>
            <DishInfo menuItem={menuItem}/>
        </>
    )
}

export default MenuItem;