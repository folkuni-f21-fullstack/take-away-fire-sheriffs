import { useState } from "react";
import "./UserOrderItem.scss";
import EditOrder from "./overlays/UserEditOrder";
import { Menu, Order } from "../models/models";


interface Props {
  orderItem: Order;
};

function UserOrderItem({orderItem}: Props) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
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

  // const totalPrice: any = orderItem.items.reduce((accumulator, value) => {
  //   accumulator.price + value;
  // }, 0)
  let totalPrice = 0;
  for (let item of orderItem.items) {
    totalPrice = totalPrice + item.price;
  }  

  return (
    <section className="card">
      <section className="card-header">
        <section className="card-status">
          <div className="status-color"></div>
          <p className="status-text">{orderItem.status}</p>
        </section>
        <p className="order-number">Ordernr: {orderItem.orderId}</p>
      </section>
      <p className="card-date">{orderItem.date}</p>

      <section className="card-info">
        { orderItems }
      </section>

      <p className="card-cost">Totalt: { totalPrice }:-</p>
      <section className="card-btns">
        <button className="card-btn-edit" onClick={showOverlay}>
          Edit
        </button>
        <button className="card-btn-delete">Delete</button>
      </section>
      {openEdit && <EditOrder closeOverlay={setOpenEdit} />}
    </section>
  );
}

export default UserOrderItem;