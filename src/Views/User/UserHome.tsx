import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import { Menu } from '../../models/models';
import MenuItem from '../../components/MenuItem';

// import data from '../../../data.json';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';

function UserHome() {

    const [menu, setMenu] = useState<Menu[] | null>(null);

    const fetchMenu = async () => {
        const response = await fetch('http://localhost:1337/api/menu', { mode: 'cors' });
        const data: Menu[] = await response.json();
        setMenu(data);
    }

    // const menu: Menu[] = data.menu;

    useEffect(() => { 
        menu ? (
            menu.map(item => (
            <MenuItem key={item.id} title={item.title} price={item.price} ingredients={item.ingredients} allergies={item.allergies} imgUrl={item.imgUrl} id={item.id} />
            ))
        ) : 'Couldnt find any menuItems' 
    , []}

    

    return (
        <>
            <Header />
            <button onClick={ fetchMenu }>click</button>
            <div className='userHomeWrapper content-wrapper'>
                <img className='menuTitle' src={ MenuTitle } alt="title-logo" />
                {/* { menuItems } */}
            </div>
        </>
    )
}

export default UserHome;