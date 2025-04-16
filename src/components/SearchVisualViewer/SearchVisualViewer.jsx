import { useEffect, useState } from 'react';
import SearchVisualBooks from '../SearchVisualBooks/SearchVisualBooks';
import SearchVisualVideos from '../SearchVisualVideos/SearchVisualVideos';
import looper from "../../assets/progressloop.gif";

import './stylesearch-viewer.css';

const SearchVisualViewer=({searchResource=[],loading, bookReadClick})=>{

   const [pageLimit ,setPageLimit]=useState(4)
   const [pageIndex,setPageIndex]=useState(0); 

      
   const getPageCount=()=>{
      return Math.ceil(searchResource.length/pageLimit);
   }
      
   const displaySearch=()=>{
      if(searchResource.length==0)
         return <h3>Zero Books/Videos Matches</h3>
     
      const start=pageIndex * pageLimit;
      const end = start + (pageLimit);
     
   return   searchResource.slice(start,end).map((resource)=>{
         const type= resource.type;                  
         if(type =="book")
            return <SearchVisualBooks bookData={resource} key={resource._id} bookReadClick={bookReadClick}  />
         else
           return <SearchVisualVideos videoData={resource} key={resource._id}  />
          }
      )      
   }

   const previousPage=()=>{
      if(pageIndex > 0)
      {
         setPageIndex(prevPageIndex=>prevPageIndex-1);
      }
      
    }
    const nextPage=()=>{
      if(pageIndex < (getPageCount()  -1)){
         setPageIndex(prevPage=>prevPage +1);
        }
    }

    return(
     <div className='searchregion'>
          <div className='view-switcher'></div>
          <div>
             {
               loading?
                (<div className='loadingvalue'>
                    <img src={looper} alt='loading...' />
                    <p>Loading ...</p>
                </div>):
                displaySearch()               
             }
             
          </div>
          <div className='pagersctn'>
            {
               getPageCount() > 1 &&(
                  <>
                   <span className='page-counter'>{ `${pageIndex + 1}  of  ${getPageCount()}`}</span>
                   <button className="pager-btn" title='previous' onClick={()=>previousPage()}>{`< `}</button>
                   <button className="pager-btn " title='next' onClick={()=>nextPage()}>{`>`}</button> 
                  </>
               )
            }
          </div>
    </div>);

}
export default SearchVisualViewer;