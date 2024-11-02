import { faBrain, faHouse, faMagnifyingGlass, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import './style-topsection.css';


const TopSection=({searchHandler, textOnSearchBox,homeIconClick})=>{
   const tooltipStyle={backgroundColor:'#343658'} ;
  
  return (
      <div className='sectioncntr'>
         <div className='topsctn'>
            <div className='homelnk'>
               <Link  data-tooltip-id='tooltiphome' onClick={homeIconClick}>
                <i className="bi bi-house-fill homeicon"></i>
               </Link>
            </div>
            <div className='searchbox'>
               <div className="input-group control-search"> 
                  <input type="text" className="form-control searchBox" data-tooltip-id='tooltipsrchbx'
                  placeholder="Find book, documents, media and other learning resources"
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
            <p><Link data-tooltip-id='tooltip-ai' className='chtlnk' target="_blank" to="https://ecoba.com.ng/files/" >
             <FontAwesomeIcon icon={faMicrochip} /> AI chat agent</Link>
            </p>
         </div>
         <Tooltip  id="tooltipsrchbx" style={tooltipStyle} 
         content="search book, documents, media and other learning resources" place="bottom" />
         <Tooltip  id="tooltip-ai" style={tooltipStyle} 
         content="learn with our A.I(Artificial intelligence)" place="bottom" />
          <Tooltip  id="tooltiphome" style={tooltipStyle} 
         content="Go to home/refresh home page" place="bottom" />
      </div>
  )


}
export default TopSection;