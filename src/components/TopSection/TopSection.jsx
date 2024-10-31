import { faBrain, faHouse, faMagnifyingGlass, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './style-topsection.css';


const TopSection=({searchHandler, textOnSearchBox})=>{
  return (
      <div className='sectioncntr'>
         <div className='topsctn'>
            <div className='homelnk'>
               <Link>
               <i className="bi bi-house-fill homeicon"></i>
               </Link>
            </div>
            <div className='searchbox'>
               <div className="input-group control-search"> 
                  <input type="text" className="form-control searchBox" 
                  placeholder="Find book, documents, media and other learning resources"
                  title='search book, documents, media and other learning resources'
                  onChange={(event)=>searchHandler(event)} value={textOnSearchBox} name="txtSearch" />
                  <button className="btn btn-secondary search-btn" onClick={searchHandler} 
                  type="button"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></button>
               </div>
            </div>
            <div className='pstqa'>
               <button className='btn'>Past Q&A</button>
            </div>        
         </div>
         <div className='ailink'>
            <p><Link className='chtlnk' target="_blank" to="https://ecoba.com.ng/files/" >
             <FontAwesomeIcon icon={faMicrochip} /> AI chat box</Link>
            </p>
         </div>
      </div>
  )


}
export default TopSection;