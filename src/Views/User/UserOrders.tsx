import OrderItem from "../../components/UserOrderItem";
import "./UserOrders.scss";
import Header from "../../components/Header";
import { User, Menu } from "../../models/models";
import { useState, useEffect } from "react";
import orderLogo from "../src/assets/orders-title.svg";

interface Props {
  // activeUser: string;
  menuItem: Menu;
}

const UserOrders = ({menuItem}: Props) => {
  // console.log("UserOrders - activeUser: ", activeUser);

////////////////////////////////////////////////////////////
  // const [activeUser, setActiveUser] = useState<string>(""); 
////////////////////////////////////////////////////////////
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

  const loggedInUser = users?.find(user => user.username === localStorage.getItem('activeUser'));

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
      <Header menuItem={menuItem} />
      <section className="order-title content-wrapper">
        <img src={orderLogo} alt="My Order" />
  
        <section className="user-orders-wrapper">
          { loggedInUser ? (
              loggedInUser.orders.map((order) => (
                  <OrderItem key={order.id} order={order} getUsers={getUsers} />
              ))) : 'Couldnt find any orders' }       
        </section>
      </section>
    </>
    );
};

export default UserOrders;