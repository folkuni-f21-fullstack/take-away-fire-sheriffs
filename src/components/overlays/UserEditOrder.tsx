import "./UserEditOrder.scss";
import { useState } from "react";
import OrderMsg from "../../components/overlays/PlacedOrderMsg";
import closeBtn from "../../assets/close-overlay-button.svg";

interface Prop {
  closeOverlay: (close: boolean) => void;
}

function EditOrder({ closeOverlay }: Prop) {
  const UserCloseBtn = () => {
    closeOverlay(false);
  };
  const [placeOrder, setPlaceOrder] = useState<boolean>(false);
  function placeOrderBtn() {
    setPlaceOrder(true);
  }

  return (
    <div className="dark-bg">
      <section className="edit-popup">
        <img
          className="user-close-btn"
          src={closeBtn}
          onClick={UserCloseBtn}
          alt=""
        />

        <h1 className="cart-title">Cart</h1>

        <section className="edit-card-info">

          <section className="edit-element"> 
          <div className="edit-details">
            <p className="card-text">Ratatouille</p>
            <p className="card-text">90:-</p>
          </div>
            <button className="card-btn-delete">Delete</button>
          </section>
          

          <section className="edit-element"> 
          <div className="edit-details">
            <p className="card-text">Ratatouille Veg.</p>
            <p className="card-text">75:-</p>
          </div>
            <button className="card-btn-delete">Delete</button>
            </section>
          

          <section className="edit-element"> 
          <div className="edit-details">
            <p className="card-text">Coca Cola</p>
            <p className="card-text">25:-</p>
          </div>
          <button className="card-btn-delete">Delete</button>
          </section>
        </section>

        <section className="edit-card-footer">
          <p className="card-cost">Totalt: 190:-</p>
          <input className="cart-comment" type="textfield" />
          <button className="popup-btn-placeorder" onClick={placeOrderBtn}>
            Place an order
          </button>
        </section>
      </section>
      {placeOrder && <OrderMsg />};
    </div>
  );
}

export default EditOrder;