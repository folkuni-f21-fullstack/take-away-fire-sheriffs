import './UserHome.scss';
import MenuTitle from '../../assets/menu-title.svg';
import MenuItem from '../../components/MenuItem';
import Header from '../../components/Header';
import { Menu } from '../../models/models';
import { useEffect } from 'react';

interface Props { 
    menu: Menu[] | null;
    setMenu: (menu: Menu[] | null) => void;
}


function UserHome({menu, setMenu}: Props) {
    
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
            <Header menuItem={menu} />
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