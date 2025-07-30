import React, { useState } from 'react';
import { 
  LogOut, 
  Clock, 
  AlertTriangle, 
  Save, 
  X, 
  Users, 
  MapPin,
  Building2,
  ShoppingBasket,
  Truck,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAdmin } from './AdminAuth';
import { allFoodResources } from '../data/foodResources';
import { getLocationStatus } from '../utils/timeUtils';

const AdminDashboard = ({ onClose }) => {
  const { currentUser, logout, hasPermission } = useAdmin();
  const [resources, setResources] = useState(allFoodResources);
  const [editingHours, setEditingHours] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyResource, setEmergencyResource] = useState(null);

  // Filter resources based on admin permissions
  const getAccessibleResources = () => {
    if (hasPermission('all')) {
      return resources;
    }
    
    // Regular pantry managers can only access their own locations
    return resources.filter(resource => resource.adminId === currentUser.id);
  };

  const filteredResources = getAccessibleResources().filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    
    const status = getLocationStatus(resource.hours);
    const matchesStatus = statusFilter === 'open' ? status.isOpen : !status.isOpen;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateHours = (resourceId, newHours) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, hours: newHours }
        : resource
    ));
    setEditingHours(null);
  };

  const handleEmergencyClosure = (resource, reason) => {
    const closedHours = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      closedHours[day] = { closed: true, emergencyReason: reason };
    });
    
    handleUpdateHours(resource.id, closedHours);
    setShowEmergencyModal(false);
    setEmergencyResource(null);
  };

  const HoursEditor = ({ resource, onSave, onCancel }) => {
    const [hours, setHours] = useState(resource.hours || {});
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const handleDayChange = (day, field, value) => {
      setHours(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: value,
          closed: field === 'closed' ? value : false
        }
      }));
    };

    const handleSave = () => {
      onSave(hours);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Hours - {resource.name}</h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {days.map(day => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium capitalize">
                    {day}
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hours[day]?.closed || false}
                      onChange={(e) => handleDayChange(day, 'closed', e.target.checked)}
                      className="mr-2"
                    />
                    Closed
                  </label>
                  {!hours[day]?.closed && (
                    <>
                      <input
                        type="time"
                        value={hours[day]?.open || '09:00'}
                        onChange={(e) => handleDayChange(day, 'open', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours[day]?.close || '17:00'}
                        onChange={(e) => handleDayChange(day, 'close', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-success-600 text-white rounded-md hover:bg-success-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Hours
              </button>
              <button
                onClick={onCancel}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmergencyModal = () => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
      if (reason.trim() && emergencyResource) {
        handleEmergencyClosure(emergencyResource, reason);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
              <h3 className="text-lg font-semibold">Emergency Closure</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              This will immediately close <strong>{emergencyResource?.name}</strong> for all days.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closure Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for closure..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                rows="3"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                disabled={!reason.trim()}
                className="flex items-center px-4 py-2 bg-danger-600 text-white rounded-md hover:bg-danger-700 disabled:opacity-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Close Location
              </button>
              <button
                onClick={() => {
                  setShowEmergencyModal(false);
                  setEmergencyResource(null);
                  setReason('');
                }}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getResourceIcon = (type) => {
    const icons = {
      food_bank: Building2,
      pantry: ShoppingBasket,
      mobile_pantry: Truck,
      hot_meal: Users,
      specialty: Building2,
      senior_market: Users
    };
    return icons[type] || ShoppingBasket;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back to App
              </button>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-danger-600 text-white rounded-md hover:bg-danger-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{getAccessibleResources().length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Open</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getAccessibleResources().filter(r => getLocationStatus(r.hours).isOpen).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-danger-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Closed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getAccessibleResources().filter(r => !getLocationStatus(r.hours).isOpen).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Counties Served</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open Now</option>
                  <option value="closed">Closed Now</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Food Resource Locations ({filteredResources.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredResources.map(resource => {
              const status = getLocationStatus(resource.hours);
              const IconComponent = getResourceIcon(resource.type);
              
              return (
                <div key={resource.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{resource.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{resource.address}</p>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            status.isOpen ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-1.5 ${
                              status.isOpen ? 'bg-success-400' : 'bg-danger-400'
                            }`} />
                            {status.isOpen ? 'Open' : 'Closed'}
                          </span>
                          
                          <span className="text-sm text-gray-500">{status.reason}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingHours(resource)}
                        className="flex items-center px-3 py-2 text-sm bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Edit Hours
                      </button>
                      
                      <button
                        onClick={() => {
                          setEmergencyResource(resource);
                          setShowEmergencyModal(true);
                        }}
                        className="flex items-center px-3 py-2 text-sm bg-danger-100 text-danger-700 rounded-md hover:bg-danger-200"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Emergency Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredResources.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500">No locations found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingHours && (
        <HoursEditor
          resource={editingHours}
          onSave={(newHours) => handleUpdateHours(editingHours.id, newHours)}
          onCancel={() => setEditingHours(null)}
        />
      )}

      {showEmergencyModal && <EmergencyModal />}
    </div>
  );
};

export default AdminDashboard;