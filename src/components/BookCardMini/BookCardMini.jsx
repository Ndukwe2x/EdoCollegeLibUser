import { useNavigate } from 'react-router-dom';
import defaultCover from '../../assets/noBookCover_small.gif';

import './style-bookcard-mini.css';

export default function BookCardMini({bookInfo,bookReadClick }){
   
   const navigate= useNavigate();   

   return(
       <div className='bookmincard'>
          <div className='bookcvrcontnr'>
             <img src={bookInfo?.coverUrl && bookInfo.coverUrl!=""? bookInfo.coverUrl:defaultCover} alt=''/>   
          </div>
           <p className='booktitle' title={bookInfo.title}>{bookInfo.title}</p>
           <div className='btn-sctn' > 
              <button className='btn btn-mini center' onClick={()=>bookReadClick(bookInfo)}>
                 Read
               </button>
               
           </div>
       </div>
   )

}