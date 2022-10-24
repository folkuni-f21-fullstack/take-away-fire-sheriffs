import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";
import Header from "../../components/Header";
import { User, Order } from "../../models/models";
import { useState, useEffect } from "react";

interface Props {
  activeUser: User | null;
}

const UserOrders = ({activeUser}: Props) => {
  console.log("UserOrders - activeUser: ", activeUser);

  const [users, setUsers] = useState<User[] | null>(null);
  const username: string = 'glenn';

  const getUsers = async () => {
    const response = await fetch('/api/users', { mode: 'cors' });
    const data = await response.json();
    setUsers(data);
}

useEffect(() => {
  getUsers()
}, []);

  console.log(users);

  const loggedInUser = users?.find(user => user.username === username);

  console.log(loggedInUser);
  
  return (
    <>
      <Header />
      <section className="order-title content-wrapper">
        <img src="../src/assets/orders-title.svg" alt="My Order" />
  
        <section className="wrapper">
          { loggedInUser ? (
              loggedInUser.orders.map(item => (
                  <OrderItem key={item.id} orderItem={item} />
              ))) : 'Couldnt find any orders' }        
        </section>
      </section>
    </>
    );
};

export default UserOrders;