
import { faCircleDot, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import './tree-style.css';


const CatalogueTree = ({ data,pageLimit,itemClick}) => {
  
    
    const [pageNumber,setPageNumber]=useState(1);
    const [pageItems,setPageItems]=useState([]);
    
    const ITEMS_MORE_ADD_COUNT=5;
    const [itemsCount, setItemsCount]=useState(pageLimit); 
    
    const  handlePagingProcess=()=>{
      if(data){
        const startPoint=(pageNumber -1) * pageLimit; 
        const endPoint=pageNumber * pageLimit;
        const pageSelect=data.slice(startPoint,endPoint);
        setPageItems(pageSelect);
       }
    }
    const getPageCount=()=>{
        return Math.ceil(data.length/pageLimit);
      }
     const previousPage=()=>{
        setPageNumber(prevPageNumber=>prevPageNumber > 1? --prevPageNumber:1)
     }
     const moveToNextPage=()=>{
         setPageNumber(prevPageNumber=>prevPageNumber< getPageCount() ? ++prevPageNumber:prevPageNumber)
     }
     const handleLoadMore=()=>{
         if(itemsCount < data.length)
            setItemsCount(prevCount=>prevCount + ITEMS_MORE_ADD_COUNT);
        else
          setItemsCount(pageLimit);

     }
     const displayCatalouge=()=>{
    
      return  pageItems.slice(0,itemsCount).map((catalogeEntry,index,collection)=>{
              
            if(!catalogeEntry.parentTitle){
             const catlogId=catalogeEntry._id;                   
              return(                        
                  <div className={setRowStyle(index,collection.length)} key={catlogId} >                           
                     <Link className="treelnk" onClick={()=>itemClick(catlogId)}>
                     <span className="singleItem"> 
                         <FontAwesomeIcon icon={faCircleDot} />-<span>{catalogeEntry.title}</span>                          
                     </span> 
                   </Link>                         
                 </div>                      
              )}        
        });
        
     }
      
    
    useEffect(()=>{
     handlePagingProcess();
    },[pageNumber])
   
    function toggleShow(event){    
     
       const clickedNode= event.target;
       const  clickedNodeName=event.target.nodeName;
       let collaspableNode= null
       switch(clickedNodeName){
        case 'svg':
               collaspableNode= clickedNode.parentElement;
            break;
        case 'path':
              collaspableNode= clickedNode.parentElement.parentElement;
            break;
        case "SPAN":
            if(clickedNode.className=="")
                collaspableNode=clickedNode.parentElement;
             else
               collaspableNode= clickedNode;
            break;
       }
       const targetElement=collaspableNode.nextElementSibling;

       if(targetElement.classList.contains("hide-item"))
            targetElement.classList.remove("hide-item")
        else
            targetElement.classList.add("hide-item")
    }
    const setRowStyle=(index,length)=>{
       
       let itemClass="tree-item";
              
       if(index%2==1)
          itemClass= `${itemClass} alt-row`;
       
       if(index==0) //check for first row.
           itemClass=`${itemClass} topstyle`;
    
       if(index+1==length) //check for last row
           itemClass=`${itemClass} bttmstyle`;
    
       return itemClass;
    }
    return (     
            <>       
            <div className="tree-container shadow">
              {
               displayCatalouge()
              }
             
          </div>
          <div className="loadmore-section">
            {(pageLimit < data.length) &&
               <button className="btn btnloadmore" onClick={handleLoadMore}>
                 { itemsCount >= data.length ? 
                   <>Show Less <i  className="bi bi-chevron-up"></i> </>:"Load More.."}
              </button>
              
            }
          </div>
         {/*  <div className='pager-section'>
            {
              (getPageCount()) > 1 && 
                <>
                <span className='page-counter'>{ `${pageNumber} of  ${getPageCount()}`}</span>
                <button className="pager-btn" title='previous' onClick={previousPage}>{`< `}</button>
                <button className="pager-btn " title='next' onClick={moveToNextPage}>{`>`}</button> 
                </> 
             } 
          </div> */}

        </>
    
    );
}
export default CatalogueTree