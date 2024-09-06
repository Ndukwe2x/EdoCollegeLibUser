import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './LibraryCatalogue.css';
import { useSelector } from 'react-redux';
import { combineResources } from '../../utils/combineResources';

// Combine books and videos with a 'type' property to differentiate them
 

const LibraryCatalogue = () => {
  const { books, videos, loading, error } = useSelector((state) => state.catalogue);

  // Combine books and videos into one catalogue
  const catalogueData = combineResources(books, videos); 
  
  // Pagination state
  const ITEMS_PER_PAGE = 20;
  const [activeItem, setActiveItem] = useState(null); // Track active item
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE); // Items to show initially

  // Toggle the active item in the catalogue
  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // Load more items when user clicks "Load More"
  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_PER_PAGE);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="catalogue-sidebar">
      <h4>Library Catalogue</h4>
      <div className="sidebar-nav">
        {/* Show only visible items */}
        {catalogueData.slice(0, visibleItems).map((item) => (
          <div className="nav-item" key={item._id}>
            <Link
              className="nav-link collapsed"
              onClick={() => toggleItem(item._id)} // Toggle content visibility
              to="#"
            >
              <FontAwesomeIcon icon={faBook} />
              <span className="ms-3">{item.title}</span>
              <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
            </Link>

            {/* Conditionally render the content if the item is active */}
            {activeItem === item._id && (
              <div className="nav-content">
                {/* Render book details if the item is a book */}
                {item.type === 'book' && (
                  <Link to={`/read/${item._id}`}>
                    <p style={{ marginInline: '10px', textDecoration: 'unset' }}>
                      {item.title}
                    </p>
                  </Link>
                )}

                {/* For videos, we can handle differently if needed */}
                {item.type === 'video' && (
                  <Link to={`/watch/${item._id}`}>
                    <p style={{ marginInline: '10px', textDecoration: 'unset' }}>
                      {item.title} (Video)
                    </p>
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Load More Button */}
        {visibleItems < catalogueData.length && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={loadMoreItems}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryCatalogue;
