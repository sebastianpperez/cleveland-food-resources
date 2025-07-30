import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>Cleveland Food Resources</h1>
          <div className="header-subtitle">
            Find food banks, soup kitchens, and emergency food assistance in Greater Cleveland
          </div>
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          🍽️ Helping connect our community with food resources
        </div>
      </div>
    </header>
  );
};

export default Header;