
import React, { useEffect } from 'react';
import DashboardSharedLayout from '../pagelayout/DashboardSharedLayout';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import "../styles/Dashboard.css"; 
import { useDispatch, useSelector } from 'react-redux';
import 'video-react/dist/video-react.css';
import { useParams } from 'react-router-dom';
import { Card, Nav } from 'react-bootstrap';
import { fetchSelectedVideo } from '../redux/catalogueSlice';
import { Player } from 'video-react';
import ClipLoader from 'react-spinners/ClipLoader';



const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  justifycontent: "center",
  alignItems: "center",
};

export default function WatchVideo() {

  const { id } = useParams(); // Get the book id from the URL params
  const dispatch = useDispatch();
  
  const { selectedVideo, loading, error } = useSelector((state) => state.catalogue);

  // Fetch the selected book based on the id from the URL
  useEffect(() => {
    dispatch(fetchSelectedVideo(id));
  }, [dispatch, id]);

  if (loading) return(
    <p>
    <ClipLoader
         color="blue"
         loading={loading}
         cssOverride={override}
         size={150}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
 
   </p>);

  if (error) {
    return <p>Error loading Video: {error}</p>;
  }

  if (!selectedVideo) {
    return <p>No Video found.</p>;
  }
 

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="page-content" style={{ marginLeft: 30, width: '80%' }}>
        <Card style={{ width: '100%' }}>
          {/* <Card.Img variant="top" src={selectedVideo.coverUrl} height="400px" /> */}

          
          <Card.Body>
            <Card.Text>{selectedVideo.title}</Card.Text>
            <Player>
      <source src={selectedVideo.videoUrl} />
    </Player>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Reviews</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Viewers Also Viewed</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>{selectedVideo.title}</Card.Title>
            <Card.Text>
              {selectedVideo.videoDescription || 'No description available.'}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <RightSidebar video={selectedVideo} />
    </div>
  );
}
