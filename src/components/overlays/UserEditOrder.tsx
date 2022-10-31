import "./UserEditOrder.scss";
import { useState, useEffect, Key } from "react";
import closeBtn from "../../assets/close-overlay-button.svg";
import { Orders, User, Menu } from '../../models/models';

interface Props {
  closeOverlay: (close: boolean) => void;
  orderItem: Orders;
  activeUser: string;
  getUsers: () => void;
  deleteOrder: () => void;
}

type Query = {
  username: string;
  order: Orders;
  comment: string;
  from: string;
}

function EditOrder({ closeOverlay, orderItem, activeUser, getUsers, deleteOrder }: Props) {
  const [feedback, setFeedback] = useState<string>('');
  const [items, setItems] = useState<Menu[] | null>(null);
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
      username: activeUser,
      order: orderItem,
      comment: userComment,
      from: "user"
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    const response = await fetch('api/orders/comment', requestOptions);

    console.log('userCommentResponse:', response);
    console.log(userComment);

    getUsers();
    
  }


  const mappedOrderItems = orderItem.items.map((item: { title: string; price: number; quantity: number; }, index: Key) => {
    return (
      <div key={index} className="edit-element ">
        <section className="edit-details">
          <p className="card-text">{item.title}</p>
          <p className="item-quantity">x{item.quantity}</p>
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
  
      if (response.status == 200) {
        const data: Menu[] | null = await response.json();

        if (data && data.length == 0) {
          deleteOrder();
        } else {
          setItems(data);
          getUsers();
          console.log(data);
        }
        
      } else {
        return 404;
      }  
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

        <h2 className="cart-title">Ordernr: {orderItem.orderId}</h2>
        <section className="edit-card-info">
          { mappedOrderItems }
        </section>
        <section className="edit-card-footer">
          <h2 className="card-cost">Totalt: {totalPrice}:-</h2>
          <p className="comment-title">Any extra info about the order?</p>
          <input className="cart-comment" type="text" defaultValue={orderItem.userComment} onChange={(event) => setUserComment(event.target.value)} />
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
