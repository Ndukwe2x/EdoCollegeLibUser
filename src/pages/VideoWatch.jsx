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
import VideoPlayIcon from "../components/VideoPlayIcon/VideoPlayIcon";
import AddBookModal from "../components/ModalDialogs/AddBookModal";
import VideoListing from "../components/VideoListing/VideoListing";
import useWindowSize from "../window-size/WindowSize";
import { Tooltip } from "react-tooltip";



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
    const [showModal,setShowModal]=useState(false);
    const [navigateToHome,setNavigateToHome]=useState(false);
    const [firstInstanceRender, setFirstInstanceRender] = useState(true);
    const [showRecentVideos,setShowRecentVideos]=useState(false);
    const location=useLocation();
    const [videoResources,setVideoResources]=useState([]);
    const [itemsCount, setItemsCount]=useState(5); 
    const pageLimit=2;
    const viewPort= useWindowSize();

    const navigate= useNavigate();
    const [videoLink,setVideoLink]=useState(location?.state?.vidUrl||null);
    const [videoThumbs,setVideoThumbs]=useState(location?.state?.thumbNail||"");
    const [videoPlaying, setVideoPlaying]=useState(false)
    const tooltipStyle={backgroundColor:'#343658'} ;

    const VIDEO_ASPECT_RATIO= 2.2;
    const videoPlayerHeight= viewPort.width/VIDEO_ASPECT_RATIO // size video player responsiblely accross viewports

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
           setVideoResources(videos)}
       ).catch(err=>console.log(err))
       .finally(()=>setFirstInstanceRender(false))     
     } 
    
  }, []);

   function toggleRecentVideos(){
      setShowRecentVideos(prevShowStatus=>!prevShowStatus);
    }
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
      setVideoThumbs(videoToPlay[0].thumbnailUrl);
      setVideoPlaying(true);
    }

    return(<div className="vidviewpg">
          <TopSection  searchHandler={handleSearch} textOnSearchBox={searchTerm} homeIconClick={hanldeHomeClick} /> 
            <div className="vidmain">
                
                    <Suspense fallback={<SectionLoader sectionName={"Video listing"} />}>
                       <Await resolve={libraryResourcePromise.vidData}>
                          {
                            (libraryvideos)=>{
                            const {videos}=libraryvideos;
                               
                           return(
                            <>
                           <div className="vidpglft">
                            <h4 className="rcnt-vids">
                             Most recently added  <Link className="lnkvidzrcnt" onClick={toggleRecentVideos}>
                              {showRecentVideos ? <i className="bi bi-chevron-up"></i>:
                               <i className="bi bi-chevron-down"></i>}</Link>
                            </h4>
                           {              
                            (showRecentVideos || viewPort.width >=980 ) &&
                             videos.slice(0,pageLimit).map(videoData=>{
                            return  <div className="videowatchmini" key={videoData._id}>
                                      <Link className="vidlnktitle" onClick={()=>playVideo(videoData._id)}>
                                        <img src={videoData?.thumbNailName!=""? videoData.thumbnailUrl:defaultThumbs}
                                          alt={videoData.title} />
                                        <p className="ptitle">{videoData.title}</p>
                                     </Link>
                                     
                                    </div>
                                        
                                    }) 
                                  }
                                  {(showRecentVideos || viewPort.width >=980) && <div className="btnstcn-rcntvids">
                                    <button data-tooltip-id="tooltipmorevids" 
                                    className="btn btn-primary btn-rcntvidsmore">Load more...</button>
                                  </div>}
                              </div>
                                <div className="vidpgcentr shadow">
                   
                                <div className="vidwatchcntr">
                                <ReactPlayer url={videoLink} light={videoThumbs} controls={true}
                                playIcon={<VideoPlayIcon />} width={"100%"} playing={videoPlaying}
                                 height={viewPort.width <=580 ? videoPlayerHeight: "360px"} />
                                </div>
                                <VideoListing videoList={videos}  handleVideoPlay={playVideo} />
                            </div>
                            </>
                                );
                            }

                          }
                       </Await>

                    </Suspense>              
              
                <div className="vidpgrght lndnglft">
                        <div className="stdyenclose ">                         
                            <StudyPlanManager /> 
                             <PreviouslyViewed />                             
                         </div>
                </div>
            </div>
            <Tooltip id="tooltipmorevids" style={tooltipStyle} content="load more recent videos" place="bottom" />
       {/* <AddBookModal  onHide={()=>setShowModal(false)}/>  */}
    </div>);
}
export default VideoWatch;