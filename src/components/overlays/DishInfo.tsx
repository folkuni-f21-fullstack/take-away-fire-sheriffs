import './DishInfo.scss';

import closeBtn from '../../assets/close-overlay-button.svg';

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

function DishInfo({menuItem}: Props) {
    return (
        <div className="dishInfoWrapper">
            <figure className="dishInfo-img">
                <img src={ closeBtn } alt="" />
            </figure>
            <section className='dishInfo-title-container'>
                <h2>{menuItem.title}</h2>
                <h2>{menuItem.price}:-</h2>
            </section>
            <section className="dishInfo-info-container">
                <p>Ingredients: {menuItem.ingredients}</p>
                <p>May contain: {menuItem.allergies}</p>
                <button>Add to cart</button>
            </section>
        </div>
    )
}

export default DishInfo;