import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Nav } from 'react-bootstrap';
import DashboardSharedLayout from '../pagelayout/DashboardSharedLayout';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import { fetchSelectedBook } from '../redux/catalogueSlice';
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  justifycontent: "center",
  alignItems: "center",
};

export default function ReadBook() {
  const { id } = useParams(); // Get the book id from the URL params
  const dispatch = useDispatch();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  const { selectedBook, loading, error } = useSelector((state) => state.catalogue);

  // Fetch the selected book based on the id from the URL
  useEffect(() => {
    dispatch(fetchSelectedBook(id));
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
    return <p>Error loading book: {error}</p>;
  }

  if (!selectedBook) {
    return <p>No book found.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="page-content" style={{ marginLeft: 30, width: '80%' }}>
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={selectedBook.coverUrl} height="300px" width="50%" />
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          
                <Viewer
          fileUrl={selectedBook.bookUrl}
          plugins={[
              
              defaultLayoutPluginInstance,

          ]}
      />
          </Worker>
          <Card.Body>
            <Card.Text>{selectedBook.title}</Card.Text>
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
                <Nav.Link href="#link">Viewers Also Read</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>{selectedBook.title}</Card.Title>
            <Card.Text>
              {selectedBook.description || 'No description available.'}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <RightSidebar book={selectedBook} />
    </div>
  );
}
