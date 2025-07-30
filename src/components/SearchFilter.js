import React, { useState } from 'react';
import { resourceTypes } from '../data/foodResources';

const SearchFilter = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedType);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    onFilterChange(newType);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Real-time search as user types
    onSearch(newSearchTerm, selectedType);
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, location, or services..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search food resources"
          />
          <select
            className="filter-select"
            value={selectedType}
            onChange={handleTypeChange}
            aria-label="Filter by resource type"
          >
            {resourceTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      
      {(searchTerm || selectedType !== 'All Types') && (
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          {searchTerm && (
            <span>Searching for: <strong>"{searchTerm}"</strong></span>
          )}
          {searchTerm && selectedType !== 'All Types' && <span> • </span>}
          {selectedType !== 'All Types' && (
            <span>Type: <strong>{selectedType}</strong></span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;