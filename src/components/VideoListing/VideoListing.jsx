
import { useState } from 'react';
import VideoCard from '../VideoCard/VideoCard';

import './stylevideolisting.css';

const VideoListing=({videoList,handleVideoPlay})=>{
    
    const [viewCount,setViewCount]=useState(12);

    return (<div className='listingcntnr'>
            {/*  <h3 className='listnghdr'>All Videos</h3> */}
               <div className='cardlayout'>
                {
                   videoList.map(libaryVideo=><VideoCard videoData={libaryVideo} hanldlePlay={handleVideoPlay} />)
                }                
               </div>
               <div>
                {
                  videoList.length > viewCount ?(<button className='btn btn-primary'>Load More</button>):null  
                 }
               </div>
           </div>)

}
export default VideoListing;