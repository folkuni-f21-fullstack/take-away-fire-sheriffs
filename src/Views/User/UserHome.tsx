import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import MenuItem from '../../components/MenuItem';
import Header from '../../components/Header';

import { Menu, User } from '../../models/models';

import { useState, useEffect } from 'react';

interface Props {
    // activeUser: string;
    menuItem: Menu;
}


function UserHome({menuItem}: Props) {
    // console.log("UserHome - activeUser: ", activeUser);

    ////////////////////////////////////////////////////////////
//   const [activeUser, setActiveUser] = useState<string>(""); 
  ////////////////////////////////////////////////////////////

    const [menu, setMenu] = useState<Menu[] | null>(null);

    const fetchMenu = async () => {
        const response = await fetch('/api/menu', { mode: 'cors' });
        const data: Menu[] = await response.json();
        
        setMenu(data);
    }

    useEffect(() => {
        fetchMenu()
    }, []);

    return (
        <>
            <Header menuItem={menuItem} />
            <div className='userHomeWrapper content-wrapper'>
                <img className='menuTitle' src={ MenuTitle } alt="title-logo" />
                    <div className="menu-items-wrapper">
                    { menu ? (
                        menu.map(item => (
                            <MenuItem key={item.id} menuItem={item} />
                        ))) : 'Couldnt find any menu' }   
                    </div>     
            </div>
        </>
    )
}

export default UserHome;