import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookCardMini from "../BookCardMini/BookCardMini";
import VideoCardMini from "../VideoCardMini/VideoCardMini";
import { faBook, faFilm } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

import './style-mincardviewer.css';
import useWindowSize from "../../window-size/WindowSize";


const MiniCardViewer=({resourceCollection,bookReadClick})=>{

 resourceCollection.sort((a,b)=>{
  return  new Date(b.createdAt) - new Date(a.createdAt)
 })//sort collection by date;
 const viewPort = useWindowSize();
 const recentlyAdded= resourceCollection.slice(0,9);//cut out the first nine items
 const resourceType= recentlyAdded[0].hasOwnProperty("videoDescription") ?"video":"book";

 const ITEMS_PER_VIEW= resourceType=="video" ? (viewPort.width <610 ?2:(viewPort.width >=1170?3:2)):3;
 const [visibleCards,setVisibleCards]=useState(ITEMS_PER_VIEW); //number of items for initial display  
 
 const loadMore=()=>{
    if(visibleCards < recentlyAdded.length)
    setVisibleCards(prevVisible=>prevVisible + ITEMS_PER_VIEW);
   else
    setVisibleCards(ITEMS_PER_VIEW);
 }
 const tooltipStyle={backgroundColor:'#343658'} ;
 return (
    <div className="content-cntr">
        <h3 className="hdr">New Additions! {resourceType=="video"?<FontAwesomeIcon icon={faFilm} /> :
         <FontAwesomeIcon icon={faBook}  />} </h3>
         <div className="miniitemwrap" >
            {
                recentlyAdded.slice(0,visibleCards).map((libraryMaterial)=>{

                    return (
                <div className="card-item" key={libraryMaterial._id}>
                        {resourceType=="book"? <BookCardMini bookInfo={libraryMaterial} bookReadClick={bookReadClick} />:
                        <VideoCardMini videoinfo={libraryMaterial}  />
                        }
                    </div>   
                    )
                })
            }
        </div>
        <section className="stcn-more">
            
            <button className="btn btn-primary" data-tooltip-id="tooltipmore" onClick={loadMore}>
                {visibleCards < recentlyAdded.length ? "More..":"Less"}
            </button>
       </section>
     <Tooltip  id="tooltipmore" style={tooltipStyle} 
         content={ resourceType=="book"? "more books":"more videos"} place="bottom"  />
    </div>
 )   

}
export default MiniCardViewer;