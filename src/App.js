import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import ResourceList from './components/ResourceList';
import MapView from './components/MapView';
import { foodResources, searchResources } from './data/foodResources';
import './styles/App.css';

function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'map'

  // Initialize with all resources
  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API loading delay
      setTimeout(() => {
        setResources(foodResources);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load food resources');
      setLoading(false);
    }
  }, []);

  const handleSearch = (searchTerm, resourceType) => {
    try {
      setLoading(true);
      // Simulate search delay
      setTimeout(() => {
        const results = searchResources(searchTerm, resourceType);
        setResources(results);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Search failed');
      setLoading(false);
    }
  };

  const handleFilterChange = (resourceType) => {
    handleSearch('', resourceType);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <SearchFilter 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        
        <div className="results-header">
          <div className="results-count">
            {!loading && !error && (
              <>Found {resources.length} food resource{resources.length !== 1 ? 's' : ''}</>
            )}
          </div>
          
          <div className="view-toggle">
            <button
              className={`view-button ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => setCurrentView('list')}
              aria-label="List view"
            >
              📋 List
            </button>
            <button
              className={`view-button ${currentView === 'map' ? 'active' : ''}`}
              onClick={() => setCurrentView('map')}
              aria-label="Map view"
            >
              🗺️ Map
            </button>
          </div>
        </div>

        {currentView === 'list' ? (
          <ResourceList 
            resources={resources}
            loading={loading}
            error={error}
          />
        ) : (
          <MapView resources={resources} />
        )}

        {!loading && !error && resources.length > 0 && (
          <div style={{ 
            marginTop: '3rem', 
            padding: '2rem', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#2e7d32' }}>
              📞 Need Immediate Help?
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              If you need emergency food assistance right now, call:
            </p>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2e7d32' }}>
              Greater Cleveland Food Bank: (216) 738-2265
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
              Available Monday-Friday, 8:00 AM - 4:30 PM
            </div>
          </div>
        )}
      </div>

      <footer style={{ 
        marginTop: '4rem', 
        padding: '2rem', 
        background: '#2e7d32', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h4 style={{ marginBottom: '1rem' }}>Cleveland Food Resources</h4>
          <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
            Connecting our community with food assistance programs across Greater Cleveland
          </p>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Data compiled from public sources • Last updated: January 2025
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
            ⚠️ Please call ahead to confirm hours and availability
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
