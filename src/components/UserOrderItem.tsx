import React from "react";
import "./UserOrderItem.scss";

function UserOrderItem() {
  return (
    <section className="card">
      <section className="card__header">
        <section className="card__status">
          <div className="status__color"></div>
          <p className="status__text">Status</p>
        </section>
        <p className="order__number">Ordernr 1001</p>
      </section>
      <p className="card__date">2022-10-07 kl 16:38</p>

      <section className="card__info">
        <section className="card__order">
          <p className="card__text">Ratatouille</p>
          <p className="card__text">90:-</p>
        </section>

        <section className="card__order">
          <p className="card__text">Ratatouille Veg.</p>
          <p className="card__text">75:-</p>
        </section>

        <section className="card__order">
          <p className="card__text">Coca Cola</p>
          <p className="card__text">25:-</p>
        </section>
      </section>

      <p className="card__cost">Totalt: 190:-</p>
      <section className="card__btns">
        <button className="card__btn__edit">Edit</button>
        <button className="card__btn__delete">Delete</button>
      </section>
    </section>
  );
}

export default UserOrderItem;
