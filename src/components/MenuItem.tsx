import { useState } from 'react';
import './MenuItem.scss';

import DishInfo from './overlays/DishInfo';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    imgUrl: string;
    id: number;
};

interface Props {
    menuItem: Menu;
};

function MenuItem({menuItem}: Props) {

    const [openInfo, setOpenInfo] = useState<boolean>(false);

    function handleClick() {
        console.log(menuItem.title);
        setOpenInfo(true);
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
            { openInfo && <DishInfo menuItem={ menuItem } setOpenInfo={ setOpenInfo }/> }
        </>
    )
}

export default MenuItem;