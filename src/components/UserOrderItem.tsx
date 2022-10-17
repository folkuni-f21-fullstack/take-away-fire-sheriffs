import { useState } from "react";
import "./UserOrderItem.scss";
import EditOrder from "./overlays/UserEditOrder";

function UserOrderItem() {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  function showOverlay() {
    setOpenEdit(true);
  }

  return (
    <section className="card">
      <section className="card-header">
        <section className="card-status">
          <div className="status-color"></div>
          <p className="status-text">Status</p>
        </section>
        <p className="order-number">Ordernr 1001</p>
      </section>
      <p className="card-date">2022-10-07 kl 16:38</p>

      <section className="card-info">
        <section className="card-order">
          <p className="card-text">Ratatouille</p>
          <p className="card-text">90:-</p>
        </section>

        <section className="card-order">
          <p className="card-text">Ratatouille Veg.</p>
          <p className="card-text">75:-</p>
        </section>

        <section className="card-order">
          <p className="card-text">Coca Cola</p>
          <p className="card-text">25:-</p>
        </section>
      </section>

      <p className="card-cost">Totalt: 190:-</p>
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
