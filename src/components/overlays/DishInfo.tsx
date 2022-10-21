import './DishInfo.scss';

import closeBtn from '../../assets/close-overlay-button.svg';

import { Menu } from '../../models/models';

interface Props {
    menuItem: Menu;
    setOpenInfo: (openInfo: boolean) => void; 
};

function DishInfo({menuItem, setOpenInfo}: Props) {

    function handleClick() {
        setOpenInfo(false);
    }

    return (
        <div className="dishInfoMainWrapper">
            <div className="dishInfoOverlay">
                <figure className="dishInfo-img-container">
                    <img className='dishInfo-closeBtn' src={ closeBtn } onClick={ handleClick } alt="" />
                    <img className='dishInfo-img' src={menuItem.imgUrl} alt="background-image" />
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
        </div>
    )
}

export default DishInfo;