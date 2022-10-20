import React from "react";
import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";
import Header from "../../components/Header";
import { Users } from "../../models/models";

interface Props {
  activeUser: Users[];
}

const UserOrders = ({activeUser}: Props) => {
  console.log("UserOrders - activeUser: ", activeUser);

  return (
  <>
    <Header />
    <section className="order-title content-wrapper">
      <img src="../src/assets/orders-title.svg" alt="My Order" />

      <section className="wrapper">
        <OrderItem />
      </section>
    </section>
  </>
  );
};

export default UserOrders;