

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
  "Tri-zone Climate Zones",
  "Bluetooth system",
  "Android Auto",
  "Wireless Charger",
  "Apple Car Play",
  "USB & Auxiliary Cable",
  "Steering Switches",
];

export const EXTERIOR_FEATURES = [
  "Moonroof",
  "Sunroof",
  "Body Kit",
  "Fog lights",
  "Keyless go",
  "Headlights",
  "LED headlights",
  "Daytime Running Lights (DRL)",
  "Roof Rails",
  "Spoiler",
  "Rain Sensing Wipers",
];

export const SAFETY_FEATURES = [
 "ABS / EBD",
  "Airbags (front and side)",
  "Front Airbags",
  "Rear Airbags",
  "Stability Control",
  "Blind Spot Monitor",
  "Autonomous Emergency Braking (AEB)",
  "Lane Keep Assist",
  "Rear wheel drive",
  "Vehicle Stability Control",
  "Tyre Pressure Warning System",
  "Traction Control",
  "Lane Keep Assist System (LKAS)",
  "Anti-Theft Alarm System",
  "Adaptive Cruise Control",
];

export const COMFORT_CONVENIENCE_FEATURES = [
 "Navigation system",
  "Parking sensor rear",
  "Parking sensor front",
  "Rear Camera",
  "Front Camera",
  "Power locks",
  "Manual Windows",
  "Power Windows",
  "Power Steering",
  "Power Trunk",
  "Push Start",
  "Auto Brake Hold",
  "Rear AC Vents",
  "Parking Assist",
  "Sport Package",
  "Multiple Off-Road Option Selector",
  
];


export const OTHERS_FEATURES = [
  "Front Speakers",
  "Rear Speakers",]

export const ALL_FEATURES = {
  interior: INTERIOR_FEATURES,
  exterior: EXTERIOR_FEATURES,
  safety: SAFETY_FEATURES,
  comfortConvenience: COMFORT_CONVENIENCE_FEATURES,
  otherFeatures: OTHERS_FEATURES,
};

// Optional flat array
export const ALL_FEATURES_FLAT = [
  ...INTERIOR_FEATURES,
  ...EXTERIOR_FEATURES,
  ...SAFETY_FEATURES,
  ...COMFORT_CONVENIENCE_FEATURES,
  ...OTHERS_FEATURES,
];