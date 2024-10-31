import defaultCover from '../../assets/noBookCover_small.gif';

import './style-bookcard-mini.css';

export default function BookCardMini({bookInfo}){
   return(
       <div className='bookmincard'>
          <div className='bookcvrcontnr'>
             <img src={bookInfo?.coverUrl && bookInfo.coverUrl!=""? bookInfo.coverUrl:defaultCover} alt=''/>   
          </div>
           <p className='booktitle' title={bookInfo.title}>{bookInfo.title}</p>
           <div className='btn-sctn' > 
              <button className='btn btn-mini center'>
                 Read
               </button>
               
           </div>
       </div>
   )

}