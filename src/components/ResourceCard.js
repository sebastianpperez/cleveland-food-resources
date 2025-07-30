import React from 'react';

const ResourceCard = ({ resource }) => {
  const formatPhoneNumber = (phone) => {
    // Simple phone number formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const formatWebsite = (url) => {
    if (!url) return null;
    return url.replace(/^https?:\/\//, '');
  };

  const getCurrentDayHours = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return resource.hours[today] || 'Closed';
  };

  const isOpenNow = () => {
    const currentHours = getCurrentDayHours();
    if (currentHours === 'Closed' || currentHours.includes('Varies')) {
      return false;
    }
    
    // Simple open check - could be enhanced with actual time parsing
    const now = new Date();
    const currentHour = now.getHours();
    
    // Basic logic: if it has hours listed and it's between 8 AM and 6 PM, likely open
    if (currentHours !== 'Closed' && currentHour >= 8 && currentHour <= 18) {
      return true;
    }
    return false;
  };

  return (
    <div className="resource-card">
      <div className="resource-header">
        <h3 className="resource-name">{resource.name}</h3>
        <span className="resource-type">{resource.type}</span>
        {isOpenNow() && (
          <div style={{ marginTop: '0.5rem', color: '#2e7d32', fontSize: '0.85rem', fontWeight: '500' }}>
            🟢 Likely open now
          </div>
        )}
      </div>
      
      <div className="resource-body">
        <div className="resource-address">
          <span style={{ marginRight: '0.5rem' }}>📍</span>
          <div>
            <div>{resource.address}</div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>
              Today: {getCurrentDayHours()}
            </div>
          </div>
        </div>

        <div className="resource-contact">
          <div className="contact-item">
            <span>📞</span>
            <a href={`tel:${resource.phone}`} className="contact-link">
              {formatPhoneNumber(resource.phone)}
            </a>
          </div>
          {resource.website && (
            <div className="contact-item">
              <span>🌐</span>
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
              >
                {formatWebsite(resource.website)}
              </a>
            </div>
          )}
        </div>

        {resource.description && (
          <div className="resource-description">
            {resource.description}
          </div>
        )}

        <div className="resource-services">
          <div className="services-title">Services Offered:</div>
          <div className="services-list">
            {resource.services.map((service, index) => (
              <span key={index} className="service-tag">
                {service}
              </span>
            ))}
          </div>
        </div>

        {resource.eligibility && (
          <div className="resource-eligibility">
            <div className="eligibility-title">Eligibility Requirements:</div>
            <div>{resource.eligibility}</div>
          </div>
        )}

        <div className="resource-hours">
          <div className="hours-title">Hours of Operation:</div>
          <div className="hours-list">
            {Object.entries(resource.hours).map(([day, hours]) => (
              <div key={day} className="hours-item">
                <span className="hours-day">{day}:</span>
                <span className="hours-time">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;