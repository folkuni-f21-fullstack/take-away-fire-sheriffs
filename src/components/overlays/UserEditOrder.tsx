import "./UserEditOrder.scss";
import { useState, useEffect, Key } from "react";
import closeBtn from "../../assets/close-overlay-button.svg";
import { Orders } from '../../models/models';

interface Props {
  closeOverlay: (close: boolean) => void;
  order: Orders;
  getUsers: () => void;
  deleteOrder: () => void;
}

type Query = {
  username: string | null;
  order: Orders;
  comment: string;
  from: string;
}

function EditOrder({ closeOverlay, order, getUsers, deleteOrder }: Props) {
  const [feedback, setFeedback] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');

  const UserCloseBtn = () => {
    closeOverlay(false);
  };

  async function saveComment() {
    setFeedback('');
    setTimeout(() => {
      setFeedback('displayFeedback');
    }, 500);
    
    const query: Query = {
      username: localStorage.getItem('activeUser'),
      order: order,
      comment: userComment,
      from: "user"
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    const response = await fetch('/api/orders/comment', requestOptions);

    console.log('userCommentResponse:', response);
    console.log(userComment);

    getUsers();
    
  }


  const mappedOrderItems = order.items.map((item: { title: string; price: number; quantity: number; id: number}, index: Key) => {
    return (
      <div key={index} className="edit-order-item-element">
        <p className="item-title">{item.title}</p>
        <section className="edit-details">
          <p>{item.price}:-</p>
          <p>x{item.quantity}</p>
          <section className="card-add-remove-btns">
            <button className="card-btn-decrease" onClick={decreaseItem}> - </button>
            <button className="card-btn-increase" onClick={increaseItem}> + </button>
          </section>
        </section>
      </div>
    );

    async function decreaseItem() {
      
      if (!order.items) {
        return;
      }
      console.log(order);
      
      const query = {
        username: localStorage.getItem('activeUser'),
        orderId: order.id,
        itemId: item.id
      }
      
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      }
      
      const response = await fetch('/api/orders/decreaseitem', requestOptions);
  
      if (response.status == 200) {
      
        const newItems = order.items.filter(item => item.id !== query.itemId);
        console.log('newItems:', newItems);
        
        if (newItems.length == 0 && order.items[0].quantity == 1) {
          deleteOrder();
        } else {
          getUsers();
          console.log(newItems);
        }
        
      } else {
        return 404;
      }  
    }

    async function increaseItem() {
      
      if (!order.items) {
        return;
      }
      console.log(order);
      
      const query = {
        username: localStorage.getItem('activeUser'),
        orderId: order.id,
        itemId: item.id
      }
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      }
      
      const response = await fetch('/api/orders/increaseitem', requestOptions);
  
      if (response.status == 200) {
        getUsers();

      } else {
        return 404;
      }  
    }

  });

  let totalPrice = 0;
  for (let item of order.items) {
      totalPrice = totalPrice + (item.price * item.quantity);
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

        <h2 className="cart-title">Ordernr: {order.orderId}</h2>
        <section className="edit-card-info">
          { mappedOrderItems }
        </section>
        <section className="edit-card-footer">
          <h2 className="card-cost">Totalt: {totalPrice}:-</h2>
          <p className="comment-title">Any extra info about the order?</p>
          <input className="cart-comment" type="text" defaultValue={order.userComment} onChange={(event) => setUserComment(event.target.value)} />
          <p className={"feedback " + feedback}>Your comment is saved.</p>
          <button className="popup-btn-save" onClick={saveComment}>
            Save comment
          </button>
        </section>
      </section>
    </div>
  );
}

export default EditOrder;
