import React from "react";
import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";

type Props = {};

const UserOrders = (props: Props) => {
  return (
    <section className="order__title">
      <img src="../src/assets/user-orders-title.svg" alt="My Order" />

      <section className="wrapper">
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </section>
    </section>
  );
};

export default UserOrders;
