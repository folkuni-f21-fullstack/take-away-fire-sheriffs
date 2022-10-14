import './MenuItem.scss';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    id: number;
}

function MenuItem() {
    return (
        <div className="menuItemWrapper">
            <section className="menuItem-title-container">
                <h2>Ratatouille</h2>
                <h2>90:-</h2>
            </section>
            <section className="menuItem-ingredients-container">
                <p>aubergine, zucchini, tomatoe, red peppers, garlic, beef</p>
            </section>
            <section className="menuItem-buttons-container">
                <button className='menuItem-btn-info'>More info</button>
                <button className='menuItem-btn-add'>Add to cart</button>
            </section>
        </div>
    )
}

export default MenuItem;