 
 import './pager-style.css';
const Pager =({pager})=>{

 return(    
      <div className="pager-section">
       {pager.getPageCount() > 1 && 
       <>
       <span className='page-counter'>{ `${pager.pageIndex + 1}  of  ${pager.getPageCount()}`}</span>
       <button className="pager-btn" title='previous' onClick={()=>pager.previousPage()}>{`< `}</button>
       <button className="pager-btn " title='next' onClick={()=>pager.nextPage()}>{`>`}</button> 
       </>  }    
      </div>
   
  );

}
export default Pager;