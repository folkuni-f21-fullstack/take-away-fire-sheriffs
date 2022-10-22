import "./UserEditOrder.scss";
import { useState } from "react";
import OrderMsg from "../../components/overlays/PlacedOrderMsg";
import closeBtn from "../../assets/close-overlay-button.svg";
import { Order } from '../../models/models';

interface Props {
  closeOverlay: (close: boolean) => void;
  orderItem: Order;
}

function EditOrder({ closeOverlay, orderItem }: Props) {
  const UserCloseBtn = () => {
    closeOverlay(false);
  };
  const [placeOrder, setPlaceOrder] = useState<boolean>(false);
  function placeOrderBtn() {
    setPlaceOrder(true);
  }

  const orderItems = orderItem.items.map((item, index) => {
    return (
      <div key={index} className="edit-element ">
        <section className="edit-details">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price}:-</p>
        </section>
        <button className="card-btn-delete">Delete</button>
      </div>
    );
  });

  let totalPrice = 0;
  for (let item of orderItem.items) {
    totalPrice = totalPrice + item.price;
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

        <h2 className="cart-title">Ordernr: </h2>
        <section className="edit-card-info">
          { orderItems }
        </section>
        <section className="edit-card-footer">
          <h2 className="card-cost">Totalt: {totalPrice}:-</h2>
          <p className="comment-title">Any extra info about the order?</p>
          <input className="cart-comment" type="textfield" />
          <button className="popup-btn-save" onClick={placeOrderBtn}>
            Save changes
          </button>
        </section>
      </section>
      {/* {placeOrder && <OrderMsg />}; */}
    </div>
  );
}

export default EditOrder;
