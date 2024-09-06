import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, fetchVideos } from '../redux/catalogueSlice';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import "../styles/Dashboard.css";

// Component for rendering each book item
const BookItem = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div key={book._id} className="resource-item book-item">
      <img src={book.coverUrl || 'default-book-cover.png'} alt={book.title} />
      <div>
        <h4>{book.title}</h4>
        <p><strong>Author:</strong> {book.author?.join(', ') || 'Unknown'}</p>
        <p><strong>Year Published:</strong> {book.yearOfPublication || 'N/A'}</p>
        <button onClick={() => navigate(`/read/${book._id}`)}>Read</button>
      </div>
    </div>
  );
};

// Component for rendering each video item
const VideoItem = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div key={video._id} className="resource-item video-item">
      <img src={video.thumbNailName || 'default-thumbnail.png'} alt={video.title} />
      <div>
        <h4>{video.title}</h4>
        <p><strong>Creator Origin:</strong> {video.creators_origin?.join(', ') || 'Unknown'}</p>
        <p><strong>Description:</strong> {video.videoDescription || 'No description available'}</p>
        <button onClick={() => navigate(`/watch/${video._id}`)}>Watch</button>
      </div>
    </div>
  );
};


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  justifycontent: "center",
  alignItems: "center",
};

// Main Dashboard component
export default function Dashboard() {
  const { books, videos, loading, error, searchQuery } = useSelector((state) => state.catalogue);
  const [filteredResources, setFilteredResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page
  const [selectedLetter, setSelectedLetter] = useState(""); // State for selected A-Z letter
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchVideos());
  }, [dispatch]);

  // Combine books and videos and filter based on search query and selected letter
  useEffect(() => {
    const allResources = [...books, ...videos]; // Combine books and videos

    let filtered = allResources;

    // Apply search query filter
    if (searchQuery !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource?.title?.toLowerCase().includes(lowerCaseQuery) ||
          resource?.author?.[0]?.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Apply A-Z letter filter
    if (selectedLetter !== "") {
      filtered = filtered.filter(
        (resource) => resource?.title?.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }

    setFilteredResources(filtered);
    setCurrentPage(1); // Reset to the first page when filters are applied
  }, [books, videos, searchQuery, selectedLetter]);

  // Get the current resources for pagination
  const indexOfLastResource = currentPage * itemsPerPage;
  const indexOfFirstResource = indexOfLastResource - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

  // Calculate total pages
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle A-Z letter click
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

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
  if (error) return <p>Error loading resources: {error}</p>;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="resource-list">
          {currentResources.length > 0 ? (
            currentResources.map((resource) =>
              resource.format && resource.format.startsWith('video/') ? (
                <VideoItem key={resource._id} video={resource} />
              ) : resource.docType === 'application/pdf' ? (
                <BookItem key={resource._id} book={resource} />
              ) : null
            )
          ) : (
            <p>No resources found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredResources.length > itemsPerPage && (
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>

      <RightSidebar />

      <div className="alphabet-index">
        <h6>Title A-Z</h6>
        <ul>
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <li
                key={i}
                onClick={() => handleLetterClick(letter)}
                className={selectedLetter === letter ? 'active' : ''}
              >
                {letter}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
