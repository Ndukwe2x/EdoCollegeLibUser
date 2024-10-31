import logo from '../../assets/edocollegelogo.png';
import appcaption from '../../assets/appcaption.png'
import AvatarProfile from '../AvatarProfile/AvatarProfile';

import './topbar.css';

function TopBar({showAvatar}){

return (
    <div className='topbar fixed-top'>
         <div className='logo'>
            <img src={logo} alt='logo'/>                     
           </div>
            <h2 className='caption'>Edo College Library</h2>                    
            { showAvatar && <AvatarProfile />}
    </div>
)

}

export default TopBar;