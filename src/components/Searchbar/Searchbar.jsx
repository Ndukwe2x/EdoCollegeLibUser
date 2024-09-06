import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Searchbar.css';
import { setSearchQuery } from '../../redux/catalogueSlice';

const SearchBar = () => {
  const [searchQuery, setSearchQueryLocal] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQueryLocal(query); // Update local state for immediate feedback
    dispatch(setSearchQuery(query)); // Dispatch the search query to the Redux store
  };

  return (
    <div className="search-container">
        <Link to="/dashboard" className="home-icon-button">
          <FontAwesomeIcon icon={faHome} /><span>

          {/* <h6 className='home-text' >Home</h6> */}
          </span>
        </Link>
      <div className="search-bar">
        <div className="dropdown">
          <button className="dropdown-toggle">Dropdown</button>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Find books, documents, and media, other learning resources..."
          value={searchQuery}
          onChange={handleSearch} // Call handleSearch on every input change
        />
        <button className="search-icon-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <button className="past-qa-button">Past Q & A</button>
    </div>
  );
};

export default SearchBar;
