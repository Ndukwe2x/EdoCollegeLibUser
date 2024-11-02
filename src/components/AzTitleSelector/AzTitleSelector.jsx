import { Tooltip } from 'react-tooltip';
import './style-aztitles.css';
import { useState } from 'react';

const AZTitleSelector=({selectorClick})=>{
   const ALPHABETS=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
    "S", "T", "U", "V", "W", "X", "Y", "Z"]; 
    const ALPHA_INITIAL_COUNT=14;
    const TOTAL_ALPHABET_COUNT=26;
    const [alphabtShowCount, setAlphaShowCount]=useState(ALPHA_INITIAL_COUNT); 
    const tooltipStyle={backgroundColor:'#343658'}; 

    const showMoreLess=()=>{
    
       if(alphabtShowCount < 26)
        setAlphaShowCount(prevCount=>prevCount + ALPHA_INITIAL_COUNT);
       else
         setAlphaShowCount(ALPHA_INITIAL_COUNT);
    }
    return (
    <div className='titleselectorcntr'>
        <h5>A-Z</h5>
        <h5>Title</h5>
        {
          ALPHABETS.slice(0,alphabtShowCount).map(alpha=>{
          return <div className='btnenclose' key={alpha}>
             <button className='btn btnalphatilte' data-tooltip-id={`tooltipalpha-${alpha}`}
              onClick={()=>selectorClick(alpha)}>{alpha}</button>
             <Tooltip id={`tooltipalpha-${alpha}`} style={tooltipStyle}
              content={`show titles starting with ${alpha} `} />     
            </div>  
          })
        }
        <p data-tooltip-id='chvronmore' className='hideshowalphabts' onClick={showMoreLess}>
            {alphabtShowCount < TOTAL_ALPHABET_COUNT ? 
            <i className="bi bi-chevron-down" title='show more'></i>: 
            <i  title="show less" className="bi bi-chevron-up"></i>}
        </p>
        <Tooltip  style={tooltipStyle} id='chvronmore'
         content={alphabtShowCount < TOTAL_ALPHABET_COUNT?"show more..":"show less"} />
    </div>);

}
export default AZTitleSelector;