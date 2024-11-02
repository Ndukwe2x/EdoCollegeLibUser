import { Suspense, useEffect, useState, useTransition } from "react";
import { Await, defer, Link, useLoaderData, useNavigate,useLocation } from "react-router-dom";
import { authenticateUser } from "../auth/authHandler";
import { libraryResources, libraryResourcesVideos } from "../data-utils/dataLoaders";
import TopSection from "../components/TopSection/TopSection";
import SectionLoader from "../components/SectionLoader/SectionLoader";
import StudyPlanManager from "../components/StudyPlanManager/StudyPlanManager";
import PreviouslyViewed from "../components/PreviouslyViewed/PreviouslyViewed";
import defaultThumbs from '../assets/generic-videoThumbs.jpg';
import ReactPlayer from 'react-player';



export  async function loader(){
  await authenticateUser("/");  
  try {
     return defer({vidData: libraryResources()})
  } catch (error) {
    console.log(err);
    return null;
  }

}
const VideoWatch=({videoUrl})=>{

     
    const libraryResourcePromise=useLoaderData();
    const [searchTerm, setSearchTerm]=useState();
    const [isPending,startTransition] =useTransition();
    const [navigateToHome,setNavigateToHome]=useState(false);
    const [firstInstanceRender, setFirstInstanceRender] = useState(true);
    const location=useLocation();
    const [videoResources,setVideoResources]=useState([]);
   
    const navigate= useNavigate();
    const [videoLink,setVideoLink]=useState(location?.state?.vidUrl||null);


   useEffect(()=>{
     if(navigateToHome)
       navigate('../landing');
       setNavigateToHome(false); 
    },[navigateToHome])

 
   useEffect(() => {

    if (firstInstanceRender) {
       libraryResourcesVideos().then(
        response=>{
            const { data: { data: { videos: videos } } } =response;
            console.log("videos", videos)
            setVideoResources(videos)}
       ).catch(err=>console.log(err))
       .finally(()=>setFirstInstanceRender(false))     
     } 
    
  }, []);

    const hanldeHomeClick=()=>{
        setNavigateToHome(true);
     }
     const handleSearch=(event)=>{
        const {value}=event.target;
        setSearchTerm(value); 
    }
    const playVideo=(videoId)=>{
        
      const videoToPlay= videoResources.filter((video)=>{
        return video._id==videoId
      })    
      setVideoLink(videoToPlay[0].videoUrl);
    }

    return(<div className="vidviewpg">
          <TopSection  searchHandler={handleSearch} textOnSearchBox={searchTerm} homeIconClick={hanldeHomeClick} /> 
            <div className="vidmain">
                <div className="vidpglft">
                    <Suspense fallback={<SectionLoader sectionName={"Video listing"} />}>
                       <Await resolve={libraryResourcePromise.vidData}>
                          {
                            (libraryvideos)=>{
                                const {videos}=libraryvideos;
                                
                         return(
                                    videos.map(videoData=>{
                            return  <div className="videowatchmini" key={videoData._id}>
                                      <Link className="vidlnktitle" onClick={()=>playVideo(videoData._id)}>
                                        <img src={videoData?.thumbNailName!=""? videoData.thumbnailUrl:defaultThumbs}
                                          alt={videoData.title} />
                                        <p className="ptitle">{videoData.title}</p>
                                     </Link>
                                    </div>
                                        
                                    })
                                );

                            }

                          }
                       </Await>

                    </Suspense>
                
                </div>
                <div className="vidpgcentr shadow">
                   
                    <div className="vidwatchcntr">
                    <ReactPlayer url={videoLink} playing={true} controls={true} width={"100%"}   />
                    </div>
                </div>
                <div className="vidpgrght lndnglft">
                        <div className="stdyenclose ">                         
                            <StudyPlanManager /> 
                             <PreviouslyViewed />                             
                         </div>
                </div>
            </div>
        
    </div>);
}
export default VideoWatch;