import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Landing from './Views/Landing';
import About from './Views/User/About';
import UserHome from './Views/User/UserHome';
import UserOrders from './Views/User/UserOrders';
import AdminHome from './Views/Admin/AdminHome';
import { useState } from 'react';
import { Users } from './models/models';

function App() {
  const [activeUser, setActiveUser] = useState<Users[] | null>(null);

  return (
    <div className="App">
      <Routes>
        <Route element={ <Landing setActiveUser={setActiveUser} /> } path='/' />
        <Route element={ <About /> } path='/about' />
        <Route element={ <UserHome activeUser={activeUser} /> } path='/menu' />
        <Route element={ <UserOrders activeUser={activeUser} /> } path='/orders' />
        <Route element={ <AdminHome activeUser={activeUser} /> } path='/admin' />
      </Routes>
    </div>
  )
}

export default App;
