import { authenticateUser } from "../auth/authHandler";
import { useState,Suspense, useEffect, useTransition} from "react";
import {  useLoaderData,  defer, Await, Link} from "react-router-dom";
import { combinedAcademicResources, libraryResources } from "../data-utils/dataLoaders";
import TopSection from "../components/TopSection/TopSection";
import CatalogueTree from '../components/CatalogueTree/CatalogueTree';
import SectionLoader from '../components/SectionLoader/SectionLoader';
import MiniCardViewer from "../components/MiniCardViewer/MiniCardViewer";
import ZeroBooks from  "../components/ZeroBooks/ZeroBooks";
import SearchVisualViewer from "../components/SearchVisualViewer/SearchVisualViewer";
import StudyPlanManager from "../components/StudyPlanManager/StudyPlanManager";
import PreviouslyViewed from "../components/PreviouslyViewed/PreviouslyViewed";
import useWindowSize from "../window-size/WindowSize";


export const loader = async () => {

   await authenticateUser("/");    
    try {
        return defer({libraryData:libraryResources()});
    } catch (error) {
        return null;
    }
}
const Landing=()=>{

   
    const libraryResourcePromise=useLoaderData();
    const[showCatalogue,setShowCatalogue]=useState(false);
    const [firstInstanceRender, setFirstInstanceRender] = useState(true);
    const [combinedResources,setCombinedResources]=useState(null);
    const [libraryResources,setLibraryResources]=useState();
    const [searchTerm,setSearchTerm]=useState("");
    const [isPending,startTransition]=useTransition();
    const [searchedResources,setSearchedResources]=useState([]);
    const [matches,setMatches]=useState(0);
    const [showSearch,setShowSearch]=useState(false)
    const windowSize=useWindowSize();       
    
    useEffect(() => {

      if (firstInstanceRender) {
        combinedAcademicResources()
        .then(response=>{
          setCombinedResources(response.combined);
          setSearchedResources(response.combined);  
          console.log(response);        
        }).catch(err=>console.log(err) )
        .finally(()=>setFirstInstanceRender(false))
       } 
      
    }, []);

  const handleSearch=(event)=>{
      const {value}=event.target;
      setSearchTerm(value); 
      if(value.length==0){
        setShowSearch(false);
        setSearchedResources(combinedResources);
        return;
      }
      else
       setShowSearch(true);
      startTransition(()=>{
        return setSearchedResources(()=>{
         return combinedResources.filter(resource=>resource.title.toLocaleLowerCase()
           .includes(value.toLocaleLowerCase()));
         })});
  
       if(!isPending) 
          setMatches(searchedResources.length);
          
  } 

    const toggleViewCatalogue=(event)=>{
       event.preventDefault();
       setShowCatalogue(prevValue=>!prevValue);
     }
   return(
   <div className="landingpg">
       <TopSection  searchHandler={handleSearch} textOnSearchBox={searchTerm} />   
           
      {  <Suspense fallback={<SectionLoader sectionName={"landing page"}/>}>
          <Await resolve={libraryResourcePromise.libraryData} >
           {
             (libraryResources)=> {
            
                 const {catalogue}=libraryResources;
                 const {books}=libraryResources;
                 const {videos}=libraryResources;
                                               
              return ( 
                   books?.length >0 ?(
                    <div className="lndngmain">
                      <div className="lndngrght">
                        <div className=""> 
                           <Link className="lnkviewcatlog" onClick={toggleViewCatalogue}> 
                              {  showCatalogue? <>Hide catalogue <i className="bi bi-chevron-up"></i></> :
                                <> View catalogue <i className="bi bi-chevron-down"></i> </>
                               }
                            </Link>
                        </div>
                        { (showCatalogue || windowSize.width >=980) &&
                       ( <> 
                          <h2 className="hdrcatlog">Library Catalogue</h2>
                         <CatalogueTree  data={catalogue} pageLimit={windowSize.width < 981 ? 7:15} />
                         </>
                         )} 
                      </div> 
                      <div className="lndng-cntr">
                        <div className="newadds">
                         { !showSearch &&  <MiniCardViewer resourceCollection={books} />}
                         { !showSearch &&   <MiniCardViewer resourceCollection={videos} />}
                        </div>
                        <div className="searchResults">
                             <div className="viewswitch"></div>
                             {/* showSearch && <p className="searchmatches">{`${matches} matches` } </p> */}
                             <div className="visual">                             
                             {showSearch && <SearchVisualViewer searchResource={searchedResources} loading={isPending}  />}
                             </div>
                        </div>
                      </div>
                     <div className="lndnglft ">
                         <div className="stdyenclose ">
                           <StudyPlanManager />
                           <PreviouslyViewed />
                         </div>
                      </div>
                   </div>
                   )
                   :
                     (
                        <div className="zerobooks">
                            <h3>Welcome buddy</h3>
                            <h3>Oops!</h3>
                            <ZeroBooks/>
                        </div>
                      )
                      )
               }
            }
         </Await>
       </Suspense>}
   </div>);
}
export default Landing;