import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import MenuItem from '../../components/MenuItem';

import data from '../../../data.json';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    id: number;
};

function UserHome() {

    const menu: Menu[] = data.menu;

    const menuItems = menu.map((menuItem, index) => {
        return <MenuItem menu={menuItem} key={index}/>
    });

    return (
        <div className='userHomeWrapper'>
            <img className='menuTitle' src={ MenuTitle } alt="" />
            { menuItems }
        </div>
    )
}

export default UserHome;