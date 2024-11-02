import { Link, useNavigate,redirect } from 'react-router-dom';
import defaultThumbs from '../../assets/generic-videoThumbs.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import './stylevideocard.css';
import { useEffect, useState } from 'react';

const VideoCardMini=({videoinfo})=>{
     const lnktextStyle={textDecoration:'none', color:'#53565e', 
             font:'normal 0.84em Verdana,Cambria,Helvetica' };
    const [watchVideo,setWatchVideo]=useState(false);

    const navigate= useNavigate();
    
    useEffect(()=>{
     if(watchVideo){
         navigate("../videoWatch",{state:{'vidUrl':videoinfo.videoUrl}});
       }
       setWatchVideo(false);
    },[watchVideo])
    
    const handleWatchClick=()=>{       
         setWatchVideo(true);
    }
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
           <Link onClick={handleWatchClick} style={lnktextStyle}>Watch <FontAwesomeIcon icon={faPlay} /></Link> 
         </p> 
       </div>
    );

}
export default VideoCardMini;