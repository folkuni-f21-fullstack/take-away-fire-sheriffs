import { useState, useEffect } from "react";
import "./UserOrderItem.scss";
import EditOrder from "./overlays/UserEditOrder";
import { Menu, Orders } from "../models/models";


interface Props {
  orderItem: Orders;
  activeUser: string;
  getUsers: () => void;
};

function UserOrderItem({orderItem, activeUser, getUsers}: Props) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState(orderItem.status);

  
  function showOverlay() {
    setOpenEdit(true);
  }

  const orderItems = orderItem.items.map((item, index) => {
    return (
      <section key={index} className="card-order">
        <p className="card-text">{item.title}</p>
        <p className="card-text">{item.price}:-</p>
      </section>
    );
  });

  let totalPrice = 0;
  for (let item of orderItem.items) {
    totalPrice = totalPrice + item.price;
  } 

  const changeOrderStatus = () => {
    if (orderItem.status == 'started') {
      setOrderStatus('started')
    } else if (orderItem.status == 'finished') {
      setOrderStatus('finished')
    }
  }
  
  async function deleteOrder() {
    console.log(orderItem.orderId);

    const query = {
      username: activeUser, 
      id: orderItem.id
    }

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    const response = await fetch('api/orders/deleteorder', requestOptions);

    const data: Orders[] = await response.json();

    console.log(data);

    getUsers(); 
  }
  
  
  return (
    <section className="card">
      <section className="card-header">
        <section className="card-status">
          <div className={'status-color-'+ orderStatus}></div>
          <p className="status-text">{orderItem.status}</p>
        </section>
        <p className="order-number">Ordernr: {orderItem.orderId}</p>
      </section>
      <p className="card-date">{orderItem.date}</p>

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
      {openEdit && <EditOrder closeOverlay={setOpenEdit} orderItem={orderItem} activeUser={activeUser} getUsers={getUsers} deleteOrder={deleteOrder}/>}
    </section>
  );
}

export default UserOrderItem;