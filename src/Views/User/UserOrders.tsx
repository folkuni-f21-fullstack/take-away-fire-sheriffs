import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";
import Header from "../../components/Header";
import { User, Menu } from "../../models/models";
import { useState, useEffect } from "react";

interface Props {
  activeUser: string;
  menuItem: Menu;
}

const UserOrders = ({activeUser, menuItem}: Props) => {
  console.log("UserOrders - activeUser: ", activeUser);

  const [users, setUsers] = useState<User[] | null>(null);

  const getUsers = async () => {
    const response = await fetch('/api/users', { mode: 'cors' });
    const data = await response.json();
    console.log(data);
    
    setUsers(data);
  }

  useEffect(() => {
    getUsers()
  }, []);

  console.log(users);

  const loggedInUser = users?.find(user => user.username === activeUser);

  if (loggedInUser) {
    loggedInUser.orders.sort((a, b) => {
      if (a.date < b.date) {
          return 1;
      } else if (a.date > b.date) {
          return -1;
      } else {
          return 0;
      }
    });
  }

  if (loggedInUser) {
    console.log(loggedInUser.orders);
  }
  
  return (
    <>
      <Header activeUser={activeUser} menuItem={menuItem} />
      <section className="order-title content-wrapper">
        <img src="../src/assets/orders-title.svg" alt="My Order" />
  
        <section className="user-orders-wrapper">
          { loggedInUser ? (
              loggedInUser.orders.map((item) => (
                  <OrderItem key={item.id} orderItem={item} activeUser={activeUser} getUsers={getUsers}/>
              ))) : 'Couldnt find any orders' }       
        </section>
      </section>
    </>
    );
};

export default UserOrders;