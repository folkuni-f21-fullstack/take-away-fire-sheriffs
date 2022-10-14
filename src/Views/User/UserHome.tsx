import './UserHome.scss';

import MenuTitle from '../../assets/menu-title.svg';

import MenuItem from '../../components/MenuItem';

function UserHome() {
    return (
        <div className='userHomeWrapper'>
            <img className='menuTitle' src={ MenuTitle } alt="" />
            <MenuItem />
            <MenuItem />
            <MenuItem />
        </div>
    )
}

export default UserHome;