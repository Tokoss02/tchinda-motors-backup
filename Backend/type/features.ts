

export const INTERIOR_FEATURES = [
  "AUX audio in",
  "Climate control",
  "Cooled front seats",
  "Cruise control",
  "Leather seats",
  "Power seats",
  "Racing seats",
  "USB",
  "Power Mirrors",
  "Heated Seats",
  "Dual-zone Climate Zones",
  "Tri-zone Climate Zones"
];

export const EXTERIOR_FEATURES = [
  "Moonroof",
  "Sunroof",
  "Body Kit",
  "Fog lights",
  "Keyless go",
  "Headlights",
  "Daytime Running Lights (DRL)",
  "Roof Rails",
  "Spoiler"
];

export const SAFETY_FEATURES = [
  "ABS / EBD",
  "Airbags(front and side)",
  "LED headlights",
  "Rear wheel drive",
  "Front Airbags",
  "Rear Airbags",
  "Stability Control",
  "Blind Spot Monitor",
  "Autonomous Emergency Braking (AEB)",
  "Lane Keep Assist"
];

export const COMFORT_CONVENIENCE_FEATURES = [
  "Navigation system",
  "Parking sensor rear",
  "Power locks",
  "Manual Windows",
  "Power Windows",
  "Parking sensor front",
  "Rear Camera",
  "Front Camera",
  "Sport Package"
];


export const CAR_FEATURES = [
  'Bluetooth system',
  'Android Auto',
  'Wireless Charger',
  'Power Steering',
  'Power Trunk',
  'Power Windows',
  'Steering Switches',
  'Vehicle Stability Control',
  'Front Speakers',
  'Apple Car Play',
  
  'Auto Brake Hold',
  'Push Start',
  'Heated Seats',
  'Parking Assist',
  'Airbags (front and side)',
  'Rear Speakers',
  'USB & Auxiliary Cable',
  'Rain Sensing Wipers',
  'Rear AC Vents',
  'Tyre Pressure Warning System',
  'Traction Control',
  'Lane Keep Assist System (LKAS)',
  'Anti-Theft Alarm System',
  'USB',
  'Multiple Off-Road Option Selector',
  'Leather Seats',
  'Power Seats',
  'Cruise Control',
];

export const ALL_FEATURES = {
  interior: INTERIOR_FEATURES,
  exterior: EXTERIOR_FEATURES,
  safety: SAFETY_FEATURES,
  comfortConvenience: COMFORT_CONVENIENCE_FEATURES,
  otherFeatures: CAR_FEATURES,
};

// Optional flat array
export const ALL_FEATURES_FLAT = [
  ...INTERIOR_FEATURES,
  ...EXTERIOR_FEATURES,
  ...SAFETY_FEATURES,
  ...COMFORT_CONVENIENCE_FEATURES,
  ...CAR_FEATURES,
];