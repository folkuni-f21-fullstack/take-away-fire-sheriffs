import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import MenuItem from '../../components/MenuItem';

import data from '../../../data.json';

interface Menu {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    imgUrl: string;
    id: number;
};

function UserHome() {

    const menu: Menu[] = data.menu;

    const menuItems = menu.map((menuItem, index) => {
        return <MenuItem menuItem={menuItem} key={index}/>
    });

    return (
        <div className='userHomeWrapper'>
            <img className='menuTitle' src={ MenuTitle } alt="title-logo" />
            { menuItems }
        </div>
    )
}

export default UserHome;