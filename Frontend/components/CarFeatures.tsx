'use client';

import { useState, useEffect } from 'react';
import {
  COMFORT_CONVENIENCE_FEATURES,
  EXTERIOR_FEATURES,
  INTERIOR_FEATURES,
  OTHERS_FEATURES,
  SAFETY_FEATURES,
} from '../../Backend/type/features';

interface CarFeaturesProps {
  onChange: (features: string[]) => void;
  defaultSelected?: string[];
}

interface FeatureGroup {
  title: string;
  features: string[];
}

export default function CarFeatures({ onChange, defaultSelected = [] }: CarFeaturesProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(defaultSelected);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    onChange(selectedFeatures);
  }, [selectedFeatures, onChange]);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const FEATURE_GROUPS: FeatureGroup[] = [
    { title: 'Interior', features: INTERIOR_FEATURES },
    { title: 'Exterior', features: EXTERIOR_FEATURES },
    { title: 'Safety', features: SAFETY_FEATURES },
    { title: 'Comfort & Convenience', features: COMFORT_CONVENIENCE_FEATURES },
    { title: 'Other Features', features: OTHERS_FEATURES },
  ];

  return (
    <div className="space-y-4">
      {FEATURE_GROUPS.map((group) => (
        <div key={group.title} className="border rounded-lg p-4 shadow-sm">
          <button
            onClick={() => toggleSection(group.title)}
            className="flex justify-between w-full text-left font-semibold text-lg focus:outline-none"
          >
            {group.title}
            <span>{openSections[group.title] ? '−' : '+'}</span>
          </button>

          {openSections[group.title] && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.features.map((feature) => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={feature}
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
