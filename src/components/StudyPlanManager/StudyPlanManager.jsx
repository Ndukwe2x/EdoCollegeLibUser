import { studyPlanList } from '../../data-utils/dataLoaders';
import { deleteTitleFromStudyPlan } from '../../data-utils/server';
import {  useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGlasses, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


import './style-studyplan.css';



const StudyPlanManager=({updateList,showTitleListing})=>{
    
     const [studyplan,setStudyplan]=useState([]);
     const [startListUpdate,setStartListUpdate]=useState(false);
     const [startDelete,setStartDelete]=useState(false);
     const [titleToDelete,setTitleToDelete]=useState();
    
     useEffect(()=>{  

      const fetchStudyPlan=async()=>{ 
       try {
           const response= await studyPlanList();
           const  {data:{data:studylist}}=response;
           setStudyplan(studylist);
           setStartListUpdate(false);
          }
         catch (error) {
           console.log(error)
          }
        }  
       fetchStudyPlan();

      },[startListUpdate,updateList]);  

    

     useEffect(()=>{
      if(startDelete){
         const deleteTitleFromList=async()=>{
            try {
                 await deleteTitleFromStudyPlan(titleToDelete);
                 setStartListUpdate(true);
            } catch (error) {
              console.log("error: ", error);
            }
        }
       deleteTitleFromList();
      }
      setStartDelete(false);
     },[startDelete]);

     const tooltipStyle={backgroundColor:'#343658'} ;
     
     const handleDelete=(title_Id)=>{
       setStartDelete(true);
       setTitleToDelete(title_Id)
     }
     const handleAddBooks=()=>{
        showTitleListing(true);
     }

   return ( 
        <div className='studyplancntr'>
             <h3 className='hdrstdypln'>
             <FontAwesomeIcon icon={faGlasses} /> <FontAwesomeIcon icon={faBook} /> My Study Plan</h3>
             <hr/>
             <div className='titlelist'>
               { 
                startListUpdate ?
                  <p className='update-indicator'>Updating....</p>
             
                :  
                 (studyplan.length > 0 ?  studyplan.map((book)=>{
                  return(
                      <p key={book.id}>
                      <Link className='bktitle' title={book.title}>{book.title}</Link> 
                      <span className='dropdown'>
                          <span  data-tooltip-id="tooltipvellipsis" className='ellipsis-button'
                              id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >    
                              <a href='' className='delelipsis'> 
                                  <i className='bi bi-three-dots-vertical'></i> 
                              </a>      
                           </span>
                           <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li className='pointer'>
                                  <a className="dropdown-item align-center"  onClick={()=>handleDelete(book.id)} >
                                    <span> <FontAwesomeIcon icon={faTrashCan} className='delcolor'  />  Delete</span>
                                  </a>
                              </li>                    
                          </ul>    
                     </span>
                   </p>)
                }):
                  <div className='emptyplan'>
                      <h2>No Entries for study plan</h2>
                      <p>Add titles for later visit.</p>
                  </div>)
                }                
         
            </div>
             <div >
                <button data-tooltip-id='tooltipstudyplan' onClick={handleAddBooks}
                 className='btn btnstdyplan'>+Add Book</button>
             </div>
         <Tooltip id='tooltipstudyplan' style={tooltipStyle} place='bottom' content='Add book to your study list' />
        </div>
    );

}
export default StudyPlanManager;