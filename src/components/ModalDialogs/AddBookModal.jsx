import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBook, faCirclePlus, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect, useTransition } from 'react';
import { Tooltip } from 'react-tooltip';


const AddBookModal=({show,bookList,submitHandler,onHide,headerText})=>{
     
   const [selectedTitles,setSelectedTitles]=useState([]);
   const [pageNumber,setPageNumber]=useState(1);
   const [pageItems,setPageItems]=useState([]);
   const [pageItemsSource,setPageItemsSource]=useState(bookList);
   const [searchTerm,setSearchTerm]=useState("");
   const [isPending,startTransition]=useTransition();
   const PAGE_LIMIT=8;
   let tickedTitles=[];

   const headerStyle={fontSize:'0.8em',color:'#301d85'}; 
   const headerTextStyle={font:'bold 0.9em  Arial,"Arial Black", Times New Roman, sans-serif'};
   const titleStyle={font:'normal 0.85em Verdana, cambria, sans-serif',display:'flex', marginTop:'11px' }
   const labelStyle={whiteSpace:'nowrap', maxWidth:'210px',overflow: 'hidden',
                  textOverflow:'ellipsis',cursor: 'pointer'}
   const inputStyle={cursor: 'pointer',marginRight:'4px'};  
   const tooltipStyle={backgroundColor:'#343658'}; 
   
 
   const handleSelect=(event)=>{
    const {name,checked}=event.target;   
    
    if(selectedTitles.length > 0 )
      tickedTitles= [...selectedTitles] ;

    
    const libraryAsset= bookList.find(bookEntry=>bookEntry._id==name);//find corresponding title
    
    if(checked)        
        tickedTitles=[...tickedTitles,libraryAsset.title];        
    else 
    {  //remove deselected entry from list.
        const itemIndex=  tickedTitles.findIndex(title=>title===libraryAsset.title);
        tickedTitles.splice(itemIndex,1);
    }
     setSelectedTitles(tickedTitles);
     
   }
   
   const getPageCount=()=>{
     return Math.ceil(pageItemsSource.length/PAGE_LIMIT);
   }
   const previousPage=()=>{   
    setPageNumber(prevPageNumber=>prevPageNumber > 1? --prevPageNumber:1);
    
   }
   const moveToNextPage=()=>{
        setPageNumber(prevPageNumber=>prevPageNumber< getPageCount() ? ++prevPageNumber:prevPageNumber);
    
   }
   
   const  handlePagingProcess=()=>{
    if(pageItemsSource){
      const startPoint=(pageNumber -1) * PAGE_LIMIT; 
      const endPoint=pageNumber * PAGE_LIMIT;
      setPageItems(pageItemsSource.slice(startPoint,endPoint));
     }     
      
  }
  const handleFilter=(event)=>{
    const {value}=event.target;
    setSearchTerm(value); 
    if(value.trim().length==0){
      setPageItemsSource(bookList);
      handlePagingProcess();
      return;  
    }     
    startTransition(()=>{
      const filteredList= bookList.filter(item=>item.title.toLowerCase().includes(value.toLowerCase()));
      setPageItemsSource(filteredList)
      setPageItems(filteredList.slice(0,PAGE_LIMIT));   
      setPageNumber(1); //reset page number       
     })
   
  }
  const modalHide=()=>{
     setSearchTerm("");
     setSelectedTitles([]);
     setPageItemsSource(bookList);// reset title listing for fresh display.
     setPageNumber(1)
     handlePagingProcess();     
     onHide();//hide modal
  }
 
  useEffect(()=>{
    handlePagingProcess();
   },[pageNumber]);
   

 return <Modal  size="md" aria-labelledby="contained-modal-title-vcenter"
    centered  show={show}  onHide={modalHide}   >
 <Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
     <div><h4 style={headerStyle}><FontAwesomeIcon icon={faCirclePlus} /> <FontAwesomeIcon icon={faBook}/>
      <span style={headerTextStyle}> Add Selected Titles</span></h4></div>    
  </Modal.Title>
</Modal.Header>
<Modal.Body>
<div className='titlefilter'>
   <div className='input-group'>
      <input type='text' name='searchTitle' className='form-control srchcntrl' 
      onChange={handleFilter} placeholder='Filter..' value={searchTerm} />
    <button className='btn btn-modalsrch'>
      <FontAwesomeIcon icon={faMagnifyingGlass}/>
    </button>
  </div>
 </div>
    {
      isPending ?(<div> Searching... </div>):
      (
      <>
       <div>
            {
              pageItems.map((book,index)=>{
                return(
                  <div style={titleStyle} key={book._id} >
                    {
                      selectedTitles.includes(book.title) ?  (
                      <input style={inputStyle} id={`book${index}`} type="checkbox" 
                      name={`${book._id}`} onChange={handleSelect} checked={true} />):
                      (<input style={inputStyle} id={`book${index}`} type="checkbox" 
                        name={`${book._id}`} onChange={handleSelect}  />)
                    }
                    <label htmlFor={`book${index}`}
                      data-tooltip-id={`titleTooltip-${index}`}   style={labelStyle}>{book.title}</label>
                      <Tooltip id={`titleTooltip-${index}`}  style={tooltipStyle} content={book.title}/>
                  </div>                              
                )})
            }
            
          </div>
          <div className='pager-section'>
            {
                (getPageCount()) > 1 && 
                <>
                <span className='page-counter'>{ `${pageNumber} of  ${getPageCount()}`}</span>
                <button className="pager-btn" title='previous' onClick={previousPage}>{`< `}</button>
                <button className="pager-btn " title='next' onClick={moveToNextPage}>{`>`}</button> 
                </> 
                } 
        </div>
       </>
      )
    }

    
</Modal.Body>
<Modal.Footer>
   <Button variant="primary" onClick={()=>{submitHandler(selectedTitles);setSelectedTitles([])}}>
      Submit
    </Button>
  <Button onClick={modalHide} variant='secondary'>Cancel</Button>
</Modal.Footer>
</Modal>

}

export default AddBookModal;