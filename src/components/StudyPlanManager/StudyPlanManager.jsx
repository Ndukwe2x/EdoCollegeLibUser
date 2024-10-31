
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGlasses, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


import './style-studyplan.css';

const StudyPlanManager=({studentId,resourceId,type})=>{
     const [studyplan,setStudyplan]=useState([]);
     
     const tooltipStyle={backgroundColor:'#343658'} ;
     
     const handleDelete=()=>{

     }
   return ( 
        <div className='studyplancntr'>
             <h3 className='hdrstdypln'>
             <FontAwesomeIcon icon={faGlasses} /> <FontAwesomeIcon icon={faBook} /> My Study Plan</h3>
             <hr/>
             <div className='titlelist'>

                 { studyplan.length > 0 ?  studyplan.map((book)=>{
                    <p><Link className='bktitle'>{book.title}</Link> 
                 <span className='dropdown'>
                     <span  data-tooltip-id="tooltipvellipsis" className='ellipsis-button'
                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >    
                        <a href='' className='delelipsis'> 
                            <i className='bi bi-three-dots-vertical'></i> 
                        </a>      
                    </span>
                   <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                     <li>
                        <a className="dropdown-item align-center"  onClick={handleDelete} >
                          <span> <FontAwesomeIcon icon={faTrashCan}  />  Delete</span>
                         </a>
                     </li>                    
                   </ul>    
                  </span>
                </p>}):
                  <div className='emptyplan'>
                      <h2>No Entries for study plan</h2>
                      <p>Add titles for later visit.</p>
                  </div>
                }                

            </div>
             <div >
                <button data-tooltip-id='tooltipstudyplan' className='btn btnstdyplan'>+Add Book</button>
             </div>
         <Tooltip id='tooltipstudyplan' style={tooltipStyle} place='bottom' content='Add book to your study list' />
        </div>
    );

}
export default StudyPlanManager;