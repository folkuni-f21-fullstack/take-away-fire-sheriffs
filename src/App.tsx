import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Landing from './Views/Landing';
import About from './Views/User/About';
import UserHome from './Views/User/UserHome';
import UserOrders from './Views/User/UserOrders';
import AdminHome from './Views/Admin/AdminHome';
import { useState } from 'react';
import { User } from './models/models';
import data from '../backend/dist/data.json';
import { ShoppingCartProvider } from "./components/MenuItem" 

function App() {
  const [activeUser, setActiveUser] = useState<string>("");

  return (
    <div className="App">
      <ShoppingCartProvider>
        <Routes>
          <Route element={ <Landing activeUser={activeUser} setActiveUser={setActiveUser} /> } path='/' />
          <Route element={ <About /> } path='/about' />
          <Route element={ <UserHome activeUser={activeUser} /> } path='/menu' />
          <Route element={ <UserOrders activeUser={activeUser} /> } path='/orders' />
          <Route element={ <AdminHome activeUser={activeUser} /> } path='/admin' />
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App;
