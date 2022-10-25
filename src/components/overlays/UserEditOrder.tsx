import "./UserEditOrder.scss";
import { useState } from "react";
import closeBtn from "../../assets/close-overlay-button.svg";
import { Order, User } from '../../models/models';

interface Props {
  closeOverlay: (close: boolean) => void;
  orderItem: Order;
  activeUser: string;
  getUsers: () => void;
}

function EditOrder({ closeOverlay, orderItem, activeUser, getUsers }: Props) {

  const [placeOrder, setPlaceOrder] = useState<boolean>(false);
  const [test, setTest] = useState();

  const UserCloseBtn = () => {
    closeOverlay(false);
    getUsers();
  };

  function placeOrderBtn() {
    setPlaceOrder(true);
  }

  function testState() {

  }
  
  const orderItems = orderItem.items.map((item, index) => {
    return (
      <div key={index} className="edit-element ">
        <section className="edit-details">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price}:-</p>
        </section>
        <button className="card-btn-delete" onClick={deleteItem}>Delete</button>
      </div>
    );
      
    async function deleteItem() {
      console.log(orderItem);
      
      const query = {
        username: activeUser,
        order: orderItem,
        orderItemIndex: index
      }

      console.log(query);
      
  
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      }
  
      const response = await fetch('api/orders/deleteitem', requestOptions);
  
      const data: User = await response.json();
      
      console.log(data);
      
      getUsers();
    }
  
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
    </div>
  );
}

export default EditOrder;
