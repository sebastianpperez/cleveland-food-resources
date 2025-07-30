import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Building2, 
  ShoppingBasket, 
  Truck, 
  UtensilsCrossed, 
  Heart, 
  Users,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { getLocationStatus, formatTime, getStatusColor, getStatusText } from '../utils/timeUtils';

const iconMap = {
  Building2,
  ShoppingBasket,
  Truck,
  UtensilsCrossed,
  Heart,
  Users
};

const ResourceCard = ({ resource, showDistance = false, userLocation = null }) => {
  const status = getLocationStatus(resource.hours);
  const statusColor = getStatusColor(status.isOpen);
  const statusText = getStatusText(status.isOpen);
  
  // Get the appropriate icon for the resource type
  const resourceTypes = {
    food_bank: { label: "Food Bank", icon: "Building2", color: "blue" },
    pantry: { label: "Food Pantry", icon: "ShoppingBasket", color: "green" },
    mobile_pantry: { label: "Mobile Pantry", icon: "Truck", color: "orange" },
    hot_meal: { label: "Hot Meals", icon: "UtensilsCrossed", color: "red" },
    specialty: { label: "Specialty Program", icon: "Heart", color: "purple" },
    senior_market: { label: "Senior Market", icon: "Users", color: "indigo" }
  };
  
  const resourceType = resourceTypes[resource.type] || resourceTypes.pantry;
  const IconComponent = iconMap[resourceType.icon];
  
  const getDirectionsUrl = () => {
    const encodedAddress = encodeURIComponent(resource.address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };
  
  const formatPhoneForCall = (phone) => {
    return phone.replace(/[^\d]/g, '');
  };
  
  const getServiceBadgeColor = (service) => {
    const colors = {
      emergency_food: 'bg-blue-100 text-blue-800',
      fresh_produce: 'bg-green-100 text-green-800',
      hot_meals: 'bg-red-100 text-red-800',
      clothing: 'bg-purple-100 text-purple-800',
      utility_assistance: 'bg-yellow-100 text-yellow-800',
      nutrition_education: 'bg-indigo-100 text-indigo-800',
      senior_meals: 'bg-pink-100 text-pink-800',
      youth_programs: 'bg-cyan-100 text-cyan-800',
      mobile_pantry: 'bg-orange-100 text-orange-800',
      take_out_meals: 'bg-teal-100 text-teal-800',
      financial_assistance: 'bg-amber-100 text-amber-800'
    };
    return colors[service] || 'bg-gray-100 text-gray-800';
  };
  
  const formatServiceName = (service) => {
    return service.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg bg-${resourceType.color}-100`}>
            <IconComponent className={`h-5 w-5 text-${resourceType.color}-600`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {resource.name}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
              <div className={`w-2 h-2 rounded-full mr-1.5 ${status.isOpen ? 'bg-success-400' : 'bg-danger-400'}`} />
              {statusText}
            </span>
          </div>
        </div>
        
        {/* Resource Type Badge */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${resourceType.color}-100 text-${resourceType.color}-800`}>
          {resourceType.label}
        </span>
      </div>

      {/* Address */}
      <div className="flex items-start space-x-2 mb-3">
        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600">{resource.address}</p>
      </div>

      {/* Phone */}
      {resource.phone && (
        <div className="flex items-center space-x-2 mb-3">
          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <a 
            href={`tel:${formatPhoneForCall(resource.phone)}`}
            className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
          >
            {resource.phone}
          </a>
        </div>
      )}

      {/* Status and Hours */}
      <div className="flex items-start space-x-2 mb-4">
        <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className={`font-medium ${status.isOpen ? 'text-success-600' : 'text-danger-600'}`}>
            {status.reason}
          </p>
          {status.nextChange && (
            <p className="text-gray-500 text-xs mt-1">
              Next change: {status.nextChange.toLocaleDateString()} at {formatTime(status.nextChange.toTimeString().substring(0, 5))}
            </p>
          )}
        </div>
      </div>

      {/* Services */}
      {resource.services && resource.services.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Services</h4>
          <div className="flex flex-wrap gap-1">
            {resource.services.map((service, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getServiceBadgeColor(service)}`}
              >
                {formatServiceName(service)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {resource.requirements && resource.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {resource.requirements.map((req, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                {formatServiceName(req)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* County */}
      <div className="mb-4">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          {resource.county} County
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </a>
        
        {resource.phone && (
          <a
            href={`tel:${formatPhoneForCall(resource.phone)}`}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </a>
        )}
        
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;