'use client';

import React, { useEffect, useState } from 'react';
import { Car, emptyCar } from '@/types/carvalue';
import { v4 as uuidv4 } from 'uuid';
import { X } from 'lucide-react';
import { INTERIOR_FEATURES, EXTERIOR_FEATURES, COMFORT_CONVENIENCE_FEATURES, SAFETY_FEATURES, CAR_FEATURES, } from '../../../Backend/type/features';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CarModalProps {
  isNew: boolean;
  selectedCar: Car;
  setSelectedCar: (car: Car) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent, images: File[], updatedCar: Car) => void;
}


type FeatureCheckboxGroupProps = {
  title: string;
  featureList: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
};


const FeatureCheckboxGroup = ({
  title,
  featureList,
  selected,
  onChange,
}: FeatureCheckboxGroupProps) => (
  <div className="mb-3">
    <label className="form-label fw-bold">{title}</label>
    <div className="row">
      {featureList.map((feature) => (
        <div className="col-4" key={feature}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`feature-${feature}`}
              checked={selected.includes(feature)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...selected, feature]
                  : selected.filter((f) => f !== feature);
                onChange(updated);
              }}
            />
            <label className="form-check-label" htmlFor={`feature-${feature}`}>
              {feature}
            </label>
          </div>
        </div>
      ))}
    </div>
  </div>
);


type PreviewImage = {
  id: string;
  file: File | null;
  url: string;
};


export default function CarModal({
  isNew,
  selectedCar,
  setSelectedCar,
  onClose,
  onSubmit,
}: CarModalProps) {
  const [step, setStep] = useState(1);
  const [car, setCar] = useState<Car>({ ...emptyCar });
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);



  useEffect(() => {
    setCar({
      ...selectedCar,
      interior: selectedCar.interior ?? [],
      exterior: selectedCar.exterior ?? [],
      safety: selectedCar.safety ?? [],
      comfortConvenience: selectedCar.comfortConvenience ?? [],
      otherFeatures: selectedCar.otherFeatures ?? [],
    });
  }, [selectedCar]);

  const handleChange = (field: keyof Car, value: any) => {
    setCar((prev) => ({ ...prev, [field]: value }));
  };



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newPreviews = files.map((file) => ({
      id: uuidv4(),
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);        // For showing previews
    setImageFiles((prev) => [...prev, ...files]);            // For uploading in handleSubmit
  };




  const handleRemoveImage = (id: string) => {
    const updatedPreviews = previews.filter((img) => img.id !== id);
    setPreviews(updatedPreviews);
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure all required fields are set
    const updatedCar: Car = {
      ...car,
      name: car.name || `${car.brand} ${car.modelCar}`, // Ensure name is set
      // Ensure these required fields are set with defaults if missing
      condition: car.condition || 'New',
      fuelType: car.fuelType || 'Petrol',
      transmission: car.transmission || 'Automatic',
      carType: car.carType || 'SUV',
      DriveType: car.DriveType || 'FWD',
    };

    setSelectedCar(updatedCar);
    onSubmit(e, previews.map((p) => p.file!).filter(Boolean), updatedCar);
  };


  function SortableImageItem({ id, url, onRemove }: { id: string; url: string; onRemove: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      width: 80,
      height: 80,
      objectFit: 'cover',
      position: 'relative',
      borderRadius: '0.375rem',
      border: '1px solid #dee2e6',
    };



    return (
      <div ref={setNodeRef} style={{ position: 'relative' }} {...attributes} {...listeners}>
        <img src={url} style={style} />
        <button
          type="button"
          className="btn btn-sm btn-danger position-absolute top-0 end-0 p-1"
          onClick={onRemove}
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title">{isNew ? 'Add New Car' : 'Edit Car'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="mb-4">
            <ul className="nav nav-pills nav-justified">
              {['Car Info', 'Specs', 'Contents'].map((label, idx) => (
                <li className="nav-item" key={idx}>
                  <span
                    className={`nav-link ${step === idx + 1 ? 'active' : 'bg-light'}`}
                  >
                    Step {idx + 1}: {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {step === 1 && (
                <div className="row">
                  {/* Input fields (text/number) */}
                  {(['brand', 'modelCar', 'color', 'year', 'engine', 'price', 'mileage', 'seats', 'wheelSize', 'doors', 'curbWeight',
                    'groundClearance', 'wheelbase', 'height', 'torque', 'horsepower', 'trimLevel',] as const).map((field) => (

                      <div className="col-md-4 mb-3" key={field}>
                        <label className="form-label">{capitalize(field)}</label>
                        <input
                          required
                          step={field === 'engine' ? '0.01' : undefined}
                          type={['year', 'engine', 'price', 'mileage', 'seats', 'wheelSize', 'doors', 'curbWeight',
                            'groundClearance', 'wheelbase', 'height', 'torque', 'horsepower',].includes(field) ? 'number' : 'text'}
                          className="form-control"
                          value={
                            (car[field] !== undefined && car[field] !== null)
                              ? String(car[field])
                              : ''
                          }
                          onChange={(e) =>
                            handleChange(
                              field,
                              ['year', 'engine', 'price', 'mileage', 'seats', 'wheelSize', 'doors', 'curbWeight',
                                'groundClearance', 'wheelbase', 'height', 'torque', 'horsepower',].includes(field)
                                ? Number(e.target.value)
                                : e.target.value
                            )
                          }
                        />
                      </div>
                    ))}

                  {/* Select fields */}
                  {[
                    { field: 'condition', options: ['New', 'Used'] },
                    { field: 'transmission', options: ['Manual', 'Automatic', 'CVT'] },
                    { field: 'fuelType', options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
                    { field: 'carType', options: ['SUV', 'Crossover', 'Sedan', 'Pickup', 'Hatchback', 'Coupe', 'Truck', 'Minivan', 'Bus', 'Van', 'Luxury', 'Jeep'] },
                    { field: 'DriveType', options: ['FWD', 'RWD', 'AWD', '4WD'] },
                    { field: 'Steering', options: ['Left Hand Drive', 'Right Hand Drive'] },
                    { field: 'Upholstery', options: ['Fabric', 'Leather'] },
                    { field: 'serviceHistory', options: ['Yes', 'No'] },
                  ].map(({ field, options }) => (
                    <div className="col-md-4 mb-3" key={field}>
                      <label className="form-label">{capitalize(field)}</label>
                      <select
                        required
                        className="form-select"
                        value={
                          typeof car[field as keyof Car] === 'string'
                            ? (car[field as keyof Car] as string)
                            : ''
                        }
                        onChange={(e) => handleChange(field as keyof Car, e.target.value)}
                      >
                        <option value="">Select {field}</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}


              {step === 2 && (
                <>

                  

                  <FeatureCheckboxGroup
                    title="Interior Features"
                    featureList={INTERIOR_FEATURES}
                    selected={car.interior ?? []}
                    onChange={(v) => handleChange('interior', v)}
                  />
                  <FeatureCheckboxGroup
                    title="Exterior Features"
                    featureList={EXTERIOR_FEATURES}
                    selected={car.exterior ?? []}
                    onChange={(v) => handleChange('exterior', v)}
                  />
                  <FeatureCheckboxGroup
                    title="Safety Features"
                    featureList={SAFETY_FEATURES}
                    selected={car.safety ?? []}
                    onChange={(v) => handleChange('safety', v)}
                  />
                  <FeatureCheckboxGroup
                    title="Comfort & Convenience"
                    featureList={COMFORT_CONVENIENCE_FEATURES}
                    selected={car.comfortConvenience ?? []}
                    onChange={(v) => handleChange('comfortConvenience', v)}
                  />
                  <FeatureCheckboxGroup
                    title="Other Features"
                    featureList={CAR_FEATURES}
                    selected={car.otherFeatures}
                    onChange={(v) => handleChange('otherFeatures', v)}
                  />
                </>
              )}

              {step === 3 && (
                <>
                <div className="mb-3">
                    <label className="form-label">Images</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={({ active, over }) => {
                      if (active.id !== over?.id) {
                        const oldIndex = previews.findIndex((img) => img.id === active.id);
                        const newIndex = previews.findIndex((img) => img.id === over?.id);
                        const newPreviews = arrayMove(previews, oldIndex, newIndex);
                        setPreviews(newPreviews);
                      }
                    }}
                  >
                    <SortableContext
                      items={previews.map((img) => img.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="d-flex flex-wrap gap-2">
                        {previews.map((preview) => (
                          <SortableImageItem
                            key={preview.id}
                            id={preview.id}
                            url={preview.url}
                            onRemove={() => handleRemoveImage(preview.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  <div className="mb-3 mt-3">
                    <label className="form-label">Video URL</label>
                    <input
                      type="url"
                      className="form-control"
                       value={car.videoUrl || ''}
                      onChange={(e) => handleChange('videoUrl', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  {car.videoUrl && (
                    <div className="mb-3">
                      <iframe
                        width="100%"
                        height="200"
                        className="rounded"
                        src={car.videoUrl.replace('watch?v=', 'embed/')}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </>
              )}

            </div>
            {/* Navigation buttons */}
            <div className="modal-footer border-0 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-prima"
                onClick={goBack}
                disabled={step === 1}
              >
                Back
              </button>
              {step < 3 ? (
                <button type="button" className="btn btn-prima" onClick={goNext}>
                  Next
                </button>
              ) : (
                <button type="submit" className="cssbuttons-io-button">
                  {isNew ? 'Add Car' : 'Update Car'}
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
