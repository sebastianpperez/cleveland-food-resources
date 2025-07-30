// Time utilities for Cleveland Food Resources App
// Handles real-time status calculations and time formatting

/**
 * Get current time in EST (Eastern Standard Time)
 * @returns {Date} Current date/time in EST
 */
export const getCurrentTime = () => {
  return new Date();
};

/**
 * Check if a location is currently open based on hours and current time
 * @param {Object} hours - Location hours object
 * @param {Date} currentTime - Current time (optional, defaults to now)
 * @returns {Object} Status object with isOpen, nextChange, and reason
 */
export const getLocationStatus = (hours, currentTime = getCurrentTime()) => {
  if (!hours) {
    return { isOpen: false, nextChange: null, reason: "Hours not available" };
  }

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[currentTime.getDay()];
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimeMinutes = currentHours * 60 + currentMinutes;

  const todayHours = hours[currentDay];

  // Check if closed today
  if (!todayHours || todayHours.closed) {
    const nextOpenDay = findNextOpenDay(hours, currentTime);
    return {
      isOpen: false,
      nextChange: nextOpenDay,
      reason: "Closed today"
    };
  }

  // Parse opening and closing times
  const [openHour, openMinute] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
  
  const openTimeMinutes = openHour * 60 + openMinute;
  const closeTimeMinutes = closeHour * 60 + closeMinute;

  // Check if currently open
  if (currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes) {
    // Currently open - calculate when it closes
    const closeTime = new Date(currentTime);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    
    return {
      isOpen: true,
      nextChange: closeTime,
      reason: `Open until ${formatTime(todayHours.close)}`
    };
  } else if (currentTimeMinutes < openTimeMinutes) {
    // Closed but will open today
    const openTime = new Date(currentTime);
    openTime.setHours(openHour, openMinute, 0, 0);
    
    return {
      isOpen: false,
      nextChange: openTime,
      reason: `Opens at ${formatTime(todayHours.open)}`
    };
  } else {
    // Closed for the day
    const nextOpenDay = findNextOpenDay(hours, currentTime);
    return {
      isOpen: false,
      nextChange: nextOpenDay,
      reason: "Closed for today"
    };
  }
};

/**
 * Find the next day a location will be open
 * @param {Object} hours - Location hours object
 * @param {Date} currentTime - Current time
 * @returns {Date|null} Next opening time or null if never opens
 */
export const findNextOpenDay = (hours, currentTime) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(currentTime);
    nextDate.setDate(nextDate.getDate() + i);
    
    const dayName = days[nextDate.getDay()];
    const dayHours = hours[dayName];
    
    if (dayHours && !dayHours.closed) {
      const [openHour, openMinute] = dayHours.open.split(':').map(Number);
      nextDate.setHours(openHour, openMinute, 0, 0);
      return nextDate;
    }
  }
  
  return null; // Never opens
};

/**
 * Format time string for display
 * @param {string} timeString - Time in HH:MM format
 * @returns {string} Formatted time string
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Format hours object for display
 * @param {Object} hours - Location hours object
 * @returns {string} Formatted hours string
 */
export const formatHours = (hours) => {
  if (!hours) return 'Hours not available';
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const hoursStrings = days.map((day, index) => {
    const dayHours = hours[day];
    if (!dayHours || dayHours.closed) {
      return `${dayLabels[index]}: Closed`;
    }
    return `${dayLabels[index]}: ${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`;
  });
  
  return hoursStrings.join('\n');
};

/**
 * Get time until next status change
 * @param {Date} nextChange - Next change time
 * @param {Date} currentTime - Current time (optional)
 * @returns {string} Human readable time until change
 */
export const getTimeUntilChange = (nextChange, currentTime = getCurrentTime()) => {
  if (!nextChange) return '';
  
  const diffMs = nextChange.getTime() - currentTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMinutes < 0) return 'Now';
  if (diffMinutes < 60) return `${diffMinutes} min`;
  if (diffHours < 24) return `${diffHours}h ${diffMinutes % 60}m`;
  if (diffDays === 1) return 'Tomorrow';
  return `${diffDays} days`;
};

/**
 * Check if two times are on the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if same day
 */
export const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

/**
 * Get status badge color based on open/closed status
 * @param {boolean} isOpen - Whether location is open
 * @returns {string} Tailwind color class
 */
export const getStatusColor = (isOpen) => {
  return isOpen ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800';
};

/**
 * Get status text
 * @param {boolean} isOpen - Whether location is open
 * @returns {string} Status text
 */
export const getStatusText = (isOpen) => {
  return isOpen ? 'Open' : 'Closed';
};

/**
 * Filter locations by open status
 * @param {Array} locations - Array of location objects
 * @param {string} statusFilter - 'open', 'closed', or 'all'
 * @param {Date} currentTime - Current time (optional)
 * @returns {Array} Filtered locations
 */
export const filterByStatus = (locations, statusFilter, currentTime = getCurrentTime()) => {
  if (statusFilter === 'all') return locations;
  
  return locations.filter(location => {
    const status = getLocationStatus(location.hours, currentTime);
    return statusFilter === 'open' ? status.isOpen : !status.isOpen;
  });
};

/**
 * Sort locations by distance (requires coordinates)
 * @param {Array} locations - Array of location objects
 * @param {number} userLat - User latitude
 * @param {number} userLng - User longitude
 * @returns {Array} Sorted locations by distance
 */
export const sortByDistance = (locations, userLat, userLng) => {
  if (!userLat || !userLng) return locations;
  
  return locations.sort((a, b) => {
    const distanceA = calculateDistance(userLat, userLng, a.lat, a.lng);
    const distanceB = calculateDistance(userLat, userLng, b.lat, b.lng);
    return distanceA - distanceB;
  });
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - Latitude 1
 * @param {number} lng1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lng2 - Longitude 2
 * @returns {number} Distance in miles
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};