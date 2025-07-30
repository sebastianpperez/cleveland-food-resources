import React from 'react';

const MapView = ({ resources }) => {
  return (
    <div className="map-placeholder">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
      <h3>Interactive Map Coming Soon</h3>
      <p>
        Map view will display {resources.length} food resource{resources.length !== 1 ? 's' : ''} 
        {' '}with location markers across Cleveland
      </p>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
        📍 Features will include:
        <ul style={{ textAlign: 'left', marginTop: '0.5rem', display: 'inline-block' }}>
          <li>Location markers for each resource</li>
          <li>Distance calculation from your location</li>
          <li>Driving directions</li>
          <li>Clustering for nearby resources</li>
        </ul>
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
        <strong>💡 For now:</strong> Use the address information in each resource card to find locations using your preferred map application
      </div>
    </div>
  );
};

export default MapView;