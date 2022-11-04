import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './Views/Landing';
import About from './Views/User/About';
import UserHome from './Views/User/UserHome';
import UserOrders from './Views/User/UserOrders';
import AdminHome from './Views/Admin/AdminHome';
import { Menu } from './models/models';
import { ShoppingCartProvider } from "./components/MenuItem" 
import { useState } from 'react';

function App() {

  const [menu, setMenu] = useState<Menu[] | null>(null);

  return (
    <div className="App">
      <ShoppingCartProvider>
        <Routes>
          <Route element={ <Landing /> } path='/' />
          <Route element={ <About menuItem={menu} /> } path='/about' />
          <Route element={ <UserHome menu={menu} setMenu={setMenu} /> } path='/menu' />
          <Route element={ <UserOrders menuItem={menu} /> } path='/orders' />
          <Route element={ <AdminHome /> } path='/admin' />
        </Routes>
      </ShoppingCartProvider>
    </div>
  )
}

export default App;
