import { useState, useEffect, Key } from "react";
import "./UserOrderItem.scss";
import EditOrder from "./overlays/UserEditOrder";
import { Menu, Orders } from "../models/models";


interface Props {
  order: Orders;
  activeUser: string;
  getUsers: () => void;
};

function UserOrderItem({order, activeUser, getUsers}: Props) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState(order.status);

  
  function showOverlay() {
    setOpenEdit(true);
  }

  const orderItems = order.items.map((item: { title: string; price: number; quantity: number; }, index: Key) => {
    return (
      <section key={index} className="card-order">
        <p className="card-text">{item.title}</p><p>{'x' + item.quantity}</p>
        <p className="card-text">{item.price}:-</p>
      </section>
    );
  });

  let totalPrice = 0;
  for (let item of order.items) {
      totalPrice = totalPrice + (item.price * item.quantity);
  } 

  // const changeOrderStatus = () => {
  //   if (order.status == 'started') {
  //     setOrderStatus('started')
  //   } else if (order.status == 'finished') {
  //     setOrderStatus('finished')
  //   }
  // }
  
  async function deleteOrder() {
    console.log('deleteOrder 1', order.orderId);

    const query = {
      username: activeUser, 
      // itemId: order.id,
      order: order
    }
    console.log('deleteOrder 2', order.orderId);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }
    console.log('deleteOrder 3', order.orderId);
    const response = await fetch('/api/orders/deleteorder', requestOptions);
    console.log('deleteOrder 4', order.orderId);
    if (response.status == 200) {
      console.log('deleteOrder, status 200, success!');
      
    } else {
      console.log('deleteOrder', response.status);
      
    }
    // console.log(data);

    getUsers(); 
  }
  
  
  return (
    <section className="card">
      <section className="card-header">
        <section className="card-status">
          <div className={'status-color-'+ orderStatus}></div>
          <p className="status-text">{order.status}</p>
        </section>
        <p className="order-number">Ordernr: {order.orderId}</p>
      </section>
      <p className="card-date">{order.date}</p>

      <section className="card-info">
        { orderItems }
      </section>

      <p className="card-cost">Totalt: { totalPrice }:-</p>
      <section className={"card-btns-" + orderStatus}>

        <button className="card-btn-edit"  onClick={showOverlay}>
          Edit
        </button>
        <button className="card-btn-delete" onClick={ deleteOrder }>Delete</button>
      </section>
      {openEdit && <EditOrder closeOverlay={setOpenEdit} order={order} activeUser={activeUser} getUsers={getUsers} deleteOrder={deleteOrder}/>}
    </section>
  );
}

export default UserOrderItem;