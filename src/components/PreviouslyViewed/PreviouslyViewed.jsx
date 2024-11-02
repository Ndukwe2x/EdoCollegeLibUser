import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style-previousviewed.css';
import { faClock, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';



const PreviouslyViewed=()=>{

       return (
           <div className='prevsviewcntr'>
             <h2 className='compntHdr'><FontAwesomeIcon icon={faClockRotateLeft} />  Previously viewed</h2>
            <hr/>
            <div>
                 <h3>Previously viewed materials</h3>
            </div>
         </div>
          
       )
}
export default PreviouslyViewed;