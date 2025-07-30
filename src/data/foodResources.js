export const foodResources = [
  {
    id: 1,
    name: "Greater Cleveland Food Bank",
    type: "Food Bank",
    address: "15500 South Waterloo Road, Cleveland, OH 44110",
    phone: "(216) 738-2265",
    website: "https://www.greaterclevelandfoodbank.org",
    hours: {
      monday: "8:00 AM - 4:30 PM",
      tuesday: "8:00 AM - 4:30 PM",
      wednesday: "8:00 AM - 4:30 PM",
      thursday: "8:00 AM - 4:30 PM",
      friday: "8:00 AM - 4:30 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      "Emergency Food Assistance",
      "Mobile Food Pantry",
      "Senior Food Program",
      "Backpack Program"
    ],
    eligibility: "Income-based eligibility requirements apply",
    coordinates: { lat: 41.4182, lng: -81.5926 },
    description: "The largest hunger relief organization in Northeast Ohio, serving 6 counties."
  },
  {
    id: 2,
    name: "West Side Catholic Center",
    type: "Food Pantry",
    address: "3135 Lorain Avenue, Cleveland, OH 44113",
    phone: "(216) 631-4741",
    website: "https://www.wsccenter.org",
    hours: {
      monday: "9:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 4:00 PM",
      wednesday: "9:00 AM - 4:00 PM",
      thursday: "9:00 AM - 4:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Clothing Bank",
      "Social Services"
    ],
    eligibility: "Residents of Cleveland's west side neighborhoods",
    coordinates: { lat: 41.4818, lng: -81.7137 },
    description: "Serving Cleveland's west side with food assistance and comprehensive social services."
  },
  {
    id: 3,
    name: "Vineyard Church Food Pantry",
    type: "Food Pantry",
    address: "8300 Howe Road, Mentor, OH 44060",
    phone: "(440) 255-4685",
    website: "https://www.vineyardmentor.org",
    hours: {
      monday: "Closed",
      tuesday: "6:00 PM - 8:00 PM",
      wednesday: "Closed",
      thursday: "Closed",
      friday: "Closed",
      saturday: "10:00 AM - 12:00 PM",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Holiday Food Boxes"
    ],
    eligibility: "Open to all, no income requirements",
    coordinates: { lat: 41.6331, lng: -81.3395 },
    description: "Community food pantry serving Mentor and surrounding areas."
  },
  {
    id: 4,
    name: "St. Augustine Hunger Center",
    type: "Soup Kitchen",
    address: "2486 West 14th Street, Cleveland, OH 44113",
    phone: "(216) 861-5200",
    website: "https://www.staugustinehungercenter.org",
    hours: {
      monday: "11:00 AM - 1:00 PM",
      tuesday: "11:00 AM - 1:00 PM",
      wednesday: "11:00 AM - 1:00 PM",
      thursday: "11:00 AM - 1:00 PM",
      friday: "11:00 AM - 1:00 PM",
      saturday: "11:00 AM - 1:00 PM",
      sunday: "11:00 AM - 1:00 PM"
    },
    services: [
      "Hot Meals",
      "Soup Kitchen",
      "Emergency Food Assistance",
      "Holiday Meals"
    ],
    eligibility: "Open to all who are hungry",
    coordinates: { lat: 41.4832, lng: -81.7021 },
    description: "Daily hot meals and food assistance in Cleveland's Tremont neighborhood."
  },
  {
    id: 5,
    name: "Lutheran Metropolitan Ministry",
    type: "Food Pantry",
    address: "4515 Superior Avenue, Cleveland, OH 44103",
    phone: "(216) 696-2715",
    website: "https://www.lutheranmetro.org",
    hours: {
      monday: "9:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 4:00 PM",
      wednesday: "9:00 AM - 4:00 PM",
      thursday: "9:00 AM - 4:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Homeless Services",
      "Housing Assistance"
    ],
    eligibility: "Income guidelines apply, valid ID required",
    coordinates: { lat: 41.5017, lng: -81.6340 },
    description: "Comprehensive social services including food assistance for Cleveland residents."
  },
  {
    id: 6,
    name: "Lakewood Community Services Center",
    type: "Food Pantry",
    address: "16024 Madison Avenue, Lakewood, OH 44107",
    phone: "(216) 226-4357",
    website: "https://www.lakewoodcommunityservices.org",
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Financial Assistance",
      "Senior Services"
    ],
    eligibility: "Lakewood residents with valid proof of residency",
    coordinates: { lat: 41.4819, lng: -81.7981 },
    description: "Community services center serving Lakewood residents with food and financial assistance."
  },
  {
    id: 7,
    name: "Harvest for Hunger Mobile Pantry",
    type: "Mobile Food Pantry",
    address: "Various locations throughout Cleveland",
    phone: "(216) 738-2265",
    website: "https://www.greaterclevelandfoodbank.org/mobile-pantry",
    hours: {
      monday: "Varies by location",
      tuesday: "Varies by location",
      wednesday: "Varies by location",
      thursday: "Varies by location",
      friday: "Varies by location",
      saturday: "Varies by location",
      sunday: "Varies by location"
    },
    services: [
      "Mobile Food Distribution",
      "Fresh Produce",
      "Pantry Staples",
      "Emergency Food Assistance"
    ],
    eligibility: "Open to all, first come first served",
    coordinates: { lat: 41.4993, lng: -81.6944 },
    description: "Mobile food pantry bringing fresh food directly to neighborhoods in need."
  },
  {
    id: 8,
    name: "Cleveland Food Bank - East Cleveland",
    type: "Food Pantry",
    address: "1421 Hayden Avenue, East Cleveland, OH 44112",
    phone: "(216) 451-3000",
    website: "https://www.eastcleveland.org",
    hours: {
      monday: "10:00 AM - 2:00 PM",
      tuesday: "Closed",
      wednesday: "10:00 AM - 2:00 PM",
      thursday: "Closed",
      friday: "10:00 AM - 2:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Senior Food Program",
      "Fresh Produce"
    ],
    eligibility: "East Cleveland residents, income guidelines apply",
    coordinates: { lat: 41.5331, lng: -81.5790 },
    description: "Food pantry serving East Cleveland residents with emergency food assistance."
  },
  {
    id: 9,
    name: "Breakthrough Ministries",
    type: "Soup Kitchen",
    address: "3330 East 93rd Street, Cleveland, OH 44104",
    phone: "(216) 881-6547",
    website: "https://www.breakthroughministries.org",
    hours: {
      monday: "Closed",
      tuesday: "5:00 PM - 6:30 PM",
      wednesday: "Closed",
      thursday: "5:00 PM - 6:30 PM",
      friday: "Closed",
      saturday: "12:00 PM - 1:30 PM",
      sunday: "Closed"
    },
    services: [
      "Hot Meals",
      "Soup Kitchen",
      "Food Pantry",
      "Community Support"
    ],
    eligibility: "Open to all community members",
    coordinates: { lat: 41.5142, lng: -81.5943 },
    description: "Community ministry providing hot meals and food assistance in Cleveland's Glenville area."
  },
  {
    id: 10,
    name: "Parma Community Concerns",
    type: "Food Pantry",
    address: "5280 Broadview Road, Parma, OH 44134",
    phone: "(440) 884-0077",
    website: "https://www.parmaconcerns.org",
    hours: {
      monday: "9:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 4:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 4:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "9:00 AM - 12:00 PM",
      sunday: "Closed"
    },
    services: [
      "Food Pantry",
      "Emergency Food Assistance",
      "Financial Assistance",
      "Utility Assistance"
    ],
    eligibility: "Parma residents, income guidelines apply",
    coordinates: { lat: 41.4047, lng: -81.7229 },
    description: "Comprehensive assistance center serving Parma residents with food and financial help."
  }
];

export const resourceTypes = [
  "All Types",
  "Food Bank",
  "Food Pantry",
  "Soup Kitchen",
  "Mobile Food Pantry"
];

export const getResourcesByType = (type) => {
  if (type === "All Types") {
    return foodResources;
  }
  return foodResources.filter(resource => resource.type === type);
};

export const searchResources = (query, type = "All Types") => {
  let resources = getResourcesByType(type);
  
  if (!query) {
    return resources;
  }
  
  const searchTerm = query.toLowerCase();
  return resources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm) ||
    resource.address.toLowerCase().includes(searchTerm) ||
    resource.services.some(service => service.toLowerCase().includes(searchTerm)) ||
    resource.description.toLowerCase().includes(searchTerm)
  );
};