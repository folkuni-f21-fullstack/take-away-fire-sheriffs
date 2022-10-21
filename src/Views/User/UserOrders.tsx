import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";
import Header from "../../components/Header";
import { User, Order } from "../../models/models";

interface Props {
  activeUser: User | null;
}

const UserOrders = ({activeUser}: Props) => {
  console.log("UserOrders - activeUser: ", activeUser);

  let orders: Order[] | null = [];

  if (activeUser) {
    orders = activeUser.orders;
  }

  console.log(orders);

  return (
  <>
    <Header />
    <section className="order-title content-wrapper">
      <img src="../src/assets/orders-title.svg" alt="My Order" />

      <section className="wrapper">
        { orders ? (
            orders.map(item => (
                <OrderItem key={item.id} orderItem={item} />
            ))) : 'Couldnt find any orders' }        
      </section>
    </section>
  </>
  );
};

export default UserOrders;