import {  faMagnifyingGlass, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import './style-topsection.css';


const TopSection=({searchHandler, textOnSearchBox,homeIconClick})=>{
   const tooltipStyle={backgroundColor:'#343658'} ;
   const activeStyle={fontWeight:'bold',color:'#18acac',textDecoration:'none'}
  
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
               <div className='app-menu'>
                   <nav>
                      <ul>
                        <li><NavLink to="/landing" style={({isActive})=>isActive?activeStyle:null}
                         onClick={homeIconClick}>Home</NavLink></li>
                        <li><NavLink to="/bookread" data-tooltip-id='tooltipbooks' 
                        style={({isActive})=>isActive?activeStyle:null} >Books</NavLink></li>
                        <li><NavLink to="/videowatch" style={({isActive})=>isActive?activeStyle:null}
                         data-tooltip-id='tooltipvideo'>Videos</NavLink></li>
                        <li><NavLink  data-tooltip-id='tooltip-ai' className='chtlnk'
                        target="_blank" to="https://ecoba.com.ng/files/">
                        <FontAwesomeIcon icon={faMicrochip} /> AI chat agent</NavLink>
                        </li>
                      </ul>
                   </nav>

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
         <Tooltip  id="tooltipbooks" style={tooltipStyle} content="read books from libary" place="bottom" />
          <Tooltip  id="tooltipvideo" style={tooltipStyle} content="watch videos from libary" place="bottom" />
      </div>
  )


}
export default TopSection;