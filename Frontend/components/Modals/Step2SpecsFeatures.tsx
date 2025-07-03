import React from 'react';
import { Car } from '@/types/carvalue';
import FeatureCheckboxGroup from './FeatureCheckboxGroup';
import {
  INTERIOR_FEATURES,
  EXTERIOR_FEATURES,
  SAFETY_FEATURES,
  COMFORT_CONVENIENCE_FEATURES,
  OTHERS_FEATURES,
} from '../../../Backend/type/features';

type Step2SpecsFeaturesProps = {
  car: Car;
  onChange: (field: keyof Car | 'features', value: any) => void;
};

export default function Step2SpecsFeatures({ car, onChange }: Step2SpecsFeaturesProps) {
  const features = car.features ?? {
    interior: [],
    exterior: [],
    safety: [],
    comfortConvenience: [],
    otherFeatures: []
  };

  return (
    <>
      <FeatureCheckboxGroup
        title="Interior Features"
        featureList={INTERIOR_FEATURES}
        selected={features.interior}
        onChange={(v) => onChange('features', { interior: v })}
      />

      <FeatureCheckboxGroup
        title="Exterior Features"
        featureList={EXTERIOR_FEATURES}
        selected={features.exterior}
        onChange={(v) => onChange('features', { exterior: v })}
      />

      <FeatureCheckboxGroup
        title="Safety Features"
        featureList={SAFETY_FEATURES}
        selected={features.safety}
        onChange={(v) => onChange('features', { safety: v })}
      />

      <FeatureCheckboxGroup
        title="Comfort & Convenience"
        featureList={COMFORT_CONVENIENCE_FEATURES}
        selected={features.comfortConvenience}
        onChange={(v) => onChange('features', { comfortConvenience: v })}
      />

      <FeatureCheckboxGroup
        title="Other Features"
        featureList={OTHERS_FEATURES}
        selected={features.otherFeatures}
        onChange={(v) => onChange('features', { otherFeatures: v })}
      />
    </>
  );
}
