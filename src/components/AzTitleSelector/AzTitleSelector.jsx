import { Tooltip } from 'react-tooltip';
import './style-aztitles.css';
import { useState } from 'react';

const AZTitleSelector=({selectorClick})=>{
   const ALPHABETS=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
    "S", "T", "U", "V", "W", "X", "Y", "Z"]; 
    const ALPHA_INITIAL_COUNT=14;
    const [alphabtShowCount, setAlphaShowCount]=useState(ALPHA_INITIAL_COUNT);
    const [startIndex,setStartIndex]=useState(0)
    const tooltipStyle={backgroundColor:'#343658'}; 

    const showMoreLess=()=>{
    
      
        if(startIndex==0)
           setStartIndex(13);
        else
           setStartIndex(0)
    }
    return (
    <div className='titleselectorcntr'>
        <h5>A-Z</h5>
        <h5>Title</h5>
        {
          ALPHABETS.slice(startIndex,(alphabtShowCount + startIndex)).map(alpha=>{
          return <div className='btnenclose' key={alpha}>
             <button className='btn btnalphatilte' data-tooltip-id={`tooltipalpha-${alpha}`}
              onClick={()=>selectorClick(alpha)}>{alpha}</button>
             <Tooltip id={`tooltipalpha-${alpha}`} style={tooltipStyle}
              content={`show titles starting with ${alpha} `} />     
            </div>  
          })
        }
        <p data-tooltip-id='chvronmore' className='hideshowalphabts' onClick={showMoreLess}>
            { startIndex ==0? 
            <i className="bi bi-chevron-down" title='move down'></i>: 
            <i  title="move up" className="bi bi-chevron-up"></i>}
        </p>
        <Tooltip  style={tooltipStyle} id='chvronmore'
         content={startIndex ==0?"move down..":"move up"} />
    </div>);

}
export default AZTitleSelector;