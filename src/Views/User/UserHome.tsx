import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import MenuItem from '../../components/MenuItem';
import Header from '../../components/Header';

import { Menu, User } from '../../models/models';

import { useState, useEffect } from 'react';

interface Props {
    activeUser: string;
}


function UserHome({activeUser}: Props) {
    console.log("UserHome - activeUser: ", activeUser);

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
            <Header />
            <div className='userHomeWrapper content-wrapper'>
                <img className='menuTitle' src={ MenuTitle } alt="title-logo" />
                { menu ? (
                    menu.map(item => (
                        <MenuItem key={item.id} menuItem={item} />
                    ))) : 'Couldnt find any menu' }        
            </div>
        </>
    )
}

export default UserHome;