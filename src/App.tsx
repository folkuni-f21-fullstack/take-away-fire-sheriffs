import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Landing from './Views/Landing';
import About from './Views/User/About';
import UserHome from './Views/User/UserHome';
import UserOrders from './Views/User/UserOrders';
import AdminHome from './Views/Admin/AdminHome';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={ <Landing /> } path='/' />
        <Route element={ <About /> } path='/about' />
        <Route element={ <UserHome /> } path='/menu' />
        <Route element={ <UserOrders /> } path='/orders' />
        <Route element={ <AdminHome /> } path='/admin' />
      </Routes>
    </div>
  )
}

export default App;
