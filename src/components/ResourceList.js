import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ resources, loading, error }) => {
  if (loading) {
    return (
      <div className="loading">
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
        <div>Loading food resources...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="no-results">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h3>No food resources found</h3>
        <p>Try adjusting your search terms or filters to find more results.</p>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
          💡 Tip: Try searching for "food bank", "pantry", or "soup kitchen"
        </div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <div className="results-count">
          Found {resources.length} food resource{resources.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="resources-grid">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;