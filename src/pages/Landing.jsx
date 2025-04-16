import { authenticateUser } from "../auth/authHandler";
import { addToStudyPlan } from "../data-utils/server";
import { useState,Suspense, useEffect, useTransition} from "react";
import { useLoaderData,  defer, Await, Link,useOutletContext} from "react-router-dom";
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
import PdfViewer from "../components/PdfViewer/PdfViewer";
import AZTitleSelector from "../components/AzTitleSelector/AzTitleSelector";
import AddBookModal from "../components/ModalDialogs/AddBookModal";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";




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
    const [searchTerm,setSearchTerm]=useState("");
    const [isPending,startTransition]=useTransition();
    const [searchedResources,setSearchedResources]=useState([]);
    const [matches,setMatches]=useState(0);
    const [showModal,setShowModal]=useState(false);
    const [showSearch,setShowSearch]=useState(false)
    const windowSize=useWindowSize();  
    const [showBook, setBookShow]=useState(false)
    const [showMiniView,setMiniView]=useState(true);  
    const [bookDocs,setBookDocs]=useState(null);
    const [startStudyPlanUpdate,setStartStudyPlanUpdate]=useState(false);
    const [selectedTitles,setSelectedTitles]=useState([])
    const [refreshStudyPlans,setRefreshStudyPlan]=useState(false);
    
    const showBackDropFunction=useOutletContext();
      
    
    useEffect(() => {
      showBackDropFunction(false);
      if (firstInstanceRender) {
        combinedAcademicResources()
        .then(response=>{
          setCombinedResources(response.combined);
          setSearchedResources(response.combined);  
              
        }).catch(err=>console.log(err) )
        .finally(()=>setFirstInstanceRender(false))
       } 
      
    }, []);

  useEffect(()=>{
    if(startStudyPlanUpdate){
       const studyPlanUpdate= async()=>{
        try{
          const result=await addToStudyPlan(selectedTitles);
          setSelectedTitles([]);
          console.log("add status: ",result);  
          setStartStudyPlanUpdate(false);        
          setShowModal(false); //hide dialog box
          setRefreshStudyPlan(refreshStatus=>!refreshStatus)
          
         } 
         catch(addError){
          console.log(addError);
         }
       }
      studyPlanUpdate();
  
    }

  },[startStudyPlanUpdate]);

  const handleSearch=(event)=>{
      const {value}=event.target;
      setSearchTerm(value); 
      if(value.length==0){
        setShowSearch(false);
        setMiniView(true);
        setBookShow(false);
        setSearchedResources(combinedResources);
        return;
      }
      else
      setShowSearch(true);
      setMiniView(false);
      setBookShow(false);
      startTransition(()=>{
        return setSearchedResources(()=>{
         return combinedResources.filter(resource=>resource.title.toLocaleLowerCase()
           .includes(value.toLocaleLowerCase()));
         })});
  
       if(!isPending) 
          setMatches(searchedResources.length);
          
  } 
  const handleCatalogueItemClick=(catlogId)=>{
  
     setShowSearch(true);
     setMiniView(false);
     setBookShow(false);
      startTransition(()=>{
        return setSearchedResources(()=>{
          return combinedResources.filter(resource=>resource.catalogueRef==catlogId);
        });
      });  

  }
  const addBooksToStudyPlan= async(selectedTitles)=>{     
     setSelectedTitles(selectedTitles);
     setStartStudyPlanUpdate(true);
     
  }
  const handleBookRead=(bookData)=>{
    const docs = [
      { uri:bookData.bookUrl,
       fileName: bookData.title,
       fileType:bookData.docType  }
    ];

      setShowSearch(false);
      setMiniView(false);
      setBookShow(true);
      setBookDocs(docs);
               
   }
  const hanldeHomeClick=()=>{
     setShowSearch(false);
     setMiniView(true);
     setBookShow(false);
   }
    const toggleViewCatalogue=(event)=>{
       event.preventDefault();
       setShowCatalogue(prevValue=>!prevValue);
     }
    const handleAlphaTitleClick=(alphabet)=>{
      setShowSearch(true);
      setMiniView(false);
      setBookShow(false);
      startTransition(()=>{
        return setSearchedResources(()=>{
          return combinedResources.filter(resource=>resource.title.startsWith(alphabet));
        });
      }); 
      
    }
   return(
   <div className="landingpg">
       <TopSection  searchHandler={handleSearch} textOnSearchBox={searchTerm} homeIconClick={hanldeHomeClick} />   
           
      {  <Suspense fallback={<SectionLoader sectionName={"landing page"}/>} >
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
                         <CatalogueTree  data={catalogue} pageLimit={windowSize.width < 981 ? 7:15}
                          itemClick={handleCatalogueItemClick} />
                         </>
                         )} 
                      </div> 
                      <div className="lndng-cntr">
                        <div className="newadds">
                         {  showMiniView  &&  <MiniCardViewer resourceCollection={books} 
                                                bookReadClick={handleBookRead}   />}
                         { showMiniView  &&  <MiniCardViewer resourceCollection={videos}  />}
                        </div>
                        {
                          showSearch &&  (<div className="searchResults">
                             <div className="viewswitch"></div>
                             {/* showSearch && <p className="searchmatches">{`${matches} matches` } </p> */}
                             <div className="visual">                             
                              <SearchVisualViewer searchResource={searchedResources} 
                              loading={isPending} bookReadClick={handleBookRead} />
                             </div>
                           </div>)
                        }
                        {showBook && ( 
                          <div className="pdfshow">
                              <DocViewer prefetchMethod="GET" documents={bookDocs} 
                              pluginRenderers={DocViewerRenderers} style={{ width:"100%"}} />
                         </div>)
                         }

                      </div>
                     <div className="lndnglft">
                         <div className="stdyenclose "> 
                             <StudyPlanManager showTitleListing={setShowModal} updateList={refreshStudyPlans}   />                           
                             <PreviouslyViewed />                             
                         </div>
                         <AZTitleSelector selectorClick={handleAlphaTitleClick} />
                      </div>
                      <AddBookModal  show={showModal}  bookList={books}  onHide={()=>setShowModal(false)}
                      submitHandler={addBooksToStudyPlan} />                    
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