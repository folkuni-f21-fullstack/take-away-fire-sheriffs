import './MenuItem.scss';

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