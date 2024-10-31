
import { Tooltip } from 'react-tooltip';
import './stylesearchvisual-books.css';

const SearchVisualBooks=({bookData})=>{
    const tooltipStyle={backgroundColor:'#343658'} ;
     return (
        <div className='viewercntr'>
             <div className='coversctn'> 
               <img src={bookData.coverUrl} alt='' />
             </div>
              <div className='minifo-readbtn'>
                  <p className='bktitle'>{bookData.title}</p>                
                  <p><span className='bkcaption'>{`Author(s):`} </span>
                  <span className='bkinfovalue'>{bookData.author.join(", ")}</span></p>
                  <p><span className='bkcaption'>Year Published: </span>
                    <span className='bkinfovalue'>
                        {bookData.yearOfPublication}
                    </span>
                  </p>
                  <div className='btnsctn'>
                    <button data-tooltip-id='tooltipbookread' className='btn btn-secondary'>Read</button>
                  </div>
              </div>
              <Tooltip id="tooltipbookread"  style={tooltipStyle}  content={`Read ${bookData.title}`} place='bottom' />
             
        </div>
     );

}
export default SearchVisualBooks;