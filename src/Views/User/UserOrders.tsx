import React from "react";
import OrderItem from "../../components/UserOrderItem";
import EditOrder from "../../components/overlays/UserEditOrder";
import OrderMsg from "../../components/overlays/PlacedOrderMsg";
import "./UserOrders.scss";
import Header from "../../components/Header";

type Props = {};

const UserOrders = (props: Props) => {
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
