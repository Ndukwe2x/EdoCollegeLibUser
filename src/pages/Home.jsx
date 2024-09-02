import TopBar from "../components/TopBar/TopBar";
import Login from "../components/Login/Login";
import Footer from "../components/Footer/Footer";


export default function Home(){
  
  
  return (
      <div className="homepage page-enclose" >
         <TopBar showSideMenu={false} showAvatar={false}/>  
         <section className="section-login">       
           <Login  />
         </section>
         <Footer/>      
       </div> 
       ) 

}