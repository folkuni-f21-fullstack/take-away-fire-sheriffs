import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import { Menu } from '../../models/models';

// import data from '../../../data.json';
import Header from '../../components/Header';
import { useState } from 'react';

function UserHome() {

    const [menu, setMenu] = useState<Menu[] | null>(null);

    const fetchMenu = async () => {
        const response = await fetch('/api/menu');
        const data: Menu[] = await response.json();
        setMenu(data);
    }

    // const menu: Menu[] = data.menu;

    // const menuItems = menu.map((menuItem, index) => {
    //     return <MenuItem menuItem={menuItem} key={index}/>
    // });

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