import  './stylevideocard.css';
import videoThumbs from '../../assets/generic-videoThumbs.jpg';
import { Tooltip } from 'react-tooltip';


const VideoCard=({videoData,hanldlePlay})=>{
    const tooltipStyle={backgroundColor:'#343658'} ;
    const idx=Math.ceil( Math.random()* 10000) ;
    const uniquetooltipid=videoData.title.substring()+`-${idx}`;
    return (<div className='videocardcntnr' onClick={()=>hanldlePlay(videoData._id)}>
              {
                videoData?.thumbnailUrl?<img src={videoData.thumbnailUrl} alt={videoData.title}  />:
                 <img alt={videoData.title} src={videoThumbs}/>
              }
              <p className='video-title' data-tooltip-id={uniquetooltipid}>{videoData.title}</p>
              <Tooltip id={uniquetooltipid} style={tooltipStyle} content={videoData?.title} />
           </div>);
}
export default VideoCard;