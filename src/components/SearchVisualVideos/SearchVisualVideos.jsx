import nothumbs from '../../assets/generic-videoThumbs.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import './stylesearchvideo-visual.css';
import { useEffect, useState } from 'react';

const SearchVisualVideos=({videoData})=>{
    const linkstyle={textDecoration:'none',color:'#4b4b4b',
        font:'normal 0.8em Verdana, Cambria, sans-serif',margin:'0 0 0 0' }

        const [videoWatch,setVideoWatch]=useState(false);
        const navigate= useNavigate();

        useEffect(()=>{
        if(videoWatch)
           navigate("../videowatch",{state:{'vidUrl':videoData.videoUrl}});
        setVideoWatch(false);
        },[videoWatch])

      const handleVideoClick=()=>{
         
       setVideoWatch(true);
      }  
    return(<div className='visualcntr'>
        <div className='vid-thumbs'>
            <div className='thumbborder'>
                <Link style={linkstyle} onClick={handleVideoClick}>   
                    <img src={videoData?.thumbNailName==""?nothumbs:videoData.thumbnailUrl} alt={videoData.title} />
                </Link>
            </div>
            <Link style={linkstyle}  className='playlink'>
                 Watch <FontAwesomeIcon icon={faPlay} />
            </Link>
        </div>
        <div className='vidinfo'>
            <p className='vidtitle'>{videoData.title}</p>
            <p><span className='vdcaption'>Creator/Origin: </span>
             <span className='vidinfovalue'>{videoData.creators_origin.join(", ")}</span></p>
            <p><span className='vdcaption'>Descripition: </span>
                <span className='vidinfovalue'>
                    {videoData.videoDescription==""?"None Available":videoData.videoDescription}
                </span>
             </p>           
        </div>
    </div>) 

}
export default SearchVisualVideos;