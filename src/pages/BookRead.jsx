import { authenticateUser } from "../auth/authHandler";
import PdfViewer from "../components/PdfViewer/PdfViewer";


export const loader = async () => {

    await  authenticateUser("/");//authenticateUser("/"); 
    return null;   
     try {
         return defer({libraryData:libraryResources()});
     } catch (error) {
         return null;
     }
 }

const BookRead =()=>{
   return (
        <h2>Read book</h2>
        );
   }

export default BookRead;