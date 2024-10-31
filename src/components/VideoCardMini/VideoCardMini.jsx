import { Link } from 'react-router-dom';
import defaultThumbs from '../../assets/generic-videoThumbs.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import './stylevideocard.css';

const VideoCardMini=({videoinfo})=>{
     const lnktextStyle={textDecoration:'none', color:'#53565e', 
             font:'normal 0.84em Verdana,Cambria,Helvetica' }
    return(
       
      <div>
        <div className='card-cntr'>
          <div className='vidthumbs'>
           <img src={videoinfo?.thumbNailName!=""?videoinfo.thumbnailUrl:defaultThumbs}
           alt={videoinfo.title}/>            
          </div>
           <p className='videotitle' title={videoinfo.title}>{videoinfo.title}</p>          
         </div>
         <p className='wtchlnk'>
           <Link  style={lnktextStyle}>Watch <FontAwesomeIcon icon={faPlay} /></Link> 
         </p> 
       </div>
    );

}
export default VideoCardMini;