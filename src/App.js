import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Clock, 
  Settings, 
  Map,
  List,
  ChevronDown,
  X,
  RefreshCw,
  Menu
} from 'lucide-react';
import './App.css';
import ResourceCard from './components/ResourceCard';
import { AdminProvider, AdminAuthGuard } from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import { allFoodResources, resourceTypes, counties, serviceTypes } from './data/foodResources';
import { 
  getLocationStatus, 
  filterByStatus, 
  getCurrentTime
} from './utils/timeUtils';

// Map Component (Placeholder for now - would integrate with Google Maps or Leaflet)
const MapView = ({ resources, selectedResource, onResourceSelect }) => {
  return (
    <div className="map-container bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Interactive Map</p>
        <p className="text-sm text-gray-500">
          Showing {resources.length} food resources across 6 counties
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Map integration with Google Maps or Leaflet would be implemented here
        </p>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ onAdminClick, onMenuToggle, isMobileMenuOpen }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 md:ml-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Cleveland Food Resources
              </h1>
              <p className="text-sm text-gray-600">
                Greater Cleveland Food Bank Network
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-xs text-gray-500">Real-time status updates</p>
            </div>
            
            <button
              onClick={onAdminClick}
              className="flex items-center px-3 py-2 text-sm bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Filters Component
const Filters = ({ 
  searchTerm, 
  onSearchChange, 
  typeFilter, 
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  countyFilter,
  onCountyFilterChange,
  serviceFilter,
  onServiceFilterChange,
  onClearFilters,
  isOpen,
  onToggle 
}) => {
  const hasActiveFilters = typeFilter !== 'all' || statusFilter !== 'all' || 
                          countyFilter !== 'all' || serviceFilter !== 'all' || searchTerm;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search food resources by name, address, or services..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={onToggle}
            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
            <ChevronDown className={`h-4 w-4 ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center text-sm text-primary-600 hover:text-primary-800"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Options */}
        {isOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="filter-select w-full"
              >
                <option value="all">All Types</option>
                {Object.entries(resourceTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="filter-select w-full"
              >
                <option value="all">All Status</option>
                <option value="open">Open Now</option>
                <option value="closed">Closed Now</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                County
              </label>
              <select
                value={countyFilter}
                onChange={(e) => onCountyFilterChange(e.target.value)}
                className="filter-select w-full"
              >
                <option value="all">All Counties</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county} County</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => onServiceFilterChange(e.target.value)}
                className="filter-select w-full"
              >
                <option value="all">All Services</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>
                    {service.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stats Component
const StatsBar = ({ resources, filteredResources }) => {
  const openCount = filteredResources.filter(r => getLocationStatus(r.hours).isOpen).length;
  const closedCount = filteredResources.length - openCount;

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span>
              <strong>{filteredResources.length}</strong> of <strong>{resources.length}</strong> locations shown
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-success-400 rounded-full mr-1"></div>
              <strong>{openCount}</strong> open now
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-danger-400 rounded-full mr-1"></div>
              <strong>{closedCount}</strong> closed now
            </span>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <RefreshCw className="h-3 w-3 mr-1" />
            Status updates every minute
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  // State management
  const [resources] = useState(allFoodResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countyFilter, setCountyFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Real-time updates
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Text search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.name.toLowerCase().includes(search) ||
        resource.address.toLowerCase().includes(search) ||
        resource.services.some(service => service.toLowerCase().includes(search)) ||
        resource.county.toLowerCase().includes(search)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filterByStatus(filtered, statusFilter, currentTime);
    }

    // County filter
    if (countyFilter !== 'all') {
      filtered = filtered.filter(resource => resource.county === countyFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(resource => 
        resource.services.includes(serviceFilter)
      );
    }

    return filtered;
  }, [resources, searchTerm, typeFilter, statusFilter, countyFilter, serviceFilter, currentTime]);

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
    setCountyFilter('all');
    setServiceFilter('all');
  };

  if (showAdmin) {
    return (
      <AdminAuthGuard>
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      </AdminAuthGuard>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAdminClick={() => setShowAdmin(true)}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
      />
      
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        countyFilter={countyFilter}
        onCountyFilterChange={setCountyFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        onClearFilters={clearFilters}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />

      <StatsBar resources={resources} filteredResources={filteredResources} />

      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'map'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="h-4 w-4 mr-2" />
              Map View
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'map' ? (
          <MapView 
            resources={filteredResources}
            selectedResource={null}
            onResourceSelect={() => {}}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                showDistance={false}
              />
            ))}
          </div>
        )}

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cleveland Food Resources
              </h3>
              <p className="text-gray-600 text-sm">
                Connecting Greater Cleveland communities with food assistance resources 
                across 6 counties. Real-time status updates and comprehensive resource information.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="https://www.greaterclevelandfoodbank.org" className="hover:text-primary-600">
                    Greater Cleveland Food Bank
                  </a>
                </li>
                <li>
                  <button onClick={() => window.open('https://www.greaterclevelandfoodbank.org', '_blank')} className="hover:text-primary-600">
                    Find Food Near You
                  </button>
                </li>
                <li>
                  <button onClick={() => alert('Feature coming soon!')} className="hover:text-primary-600">
                    Volunteer Opportunities
                  </button>
                </li>
                <li>
                  <button onClick={() => alert('Feature coming soon!')} className="hover:text-primary-600">
                    Donate
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Need Help?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:216-738-2265" className="hover:text-primary-600">
                    (216) 738-2265
                  </a>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Mon-Fri: 8:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Cleveland Food Resources. Serving Cuyahoga, Ashtabula, Geauga, Lake, Richland, and Ashland counties.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App with Providers
function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

export default App;
