'use client';

import React, { useEffect, useState } from 'react';
import { Car, emptyCar } from '@/types/carvalue';
import Step1CarInfo from './Step1CarInfo';
import Step2SpecsFeatures from './Step2SpecsFeatures';
import Step3MediaUpload from './Step3MediaUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PreviewImage = {
  id: string;
  file: File | null;
  url: string;
};

interface CarFormModalProps {
  isNew: boolean;
  isModal?: boolean;
  selectedCar: Car;
  setSelectedCar: (car: Car) => void;
  onClose?: () => void;
}

export default function CarFormModal({ isNew, isModal = true, selectedCar, setSelectedCar, onClose }: CarFormModalProps) {
  const [step, setStep] = useState(1);
  const [car, setCar] = useState<Car>({ ...emptyCar });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setCar({
      ...selectedCar,
      features: selectedCar.features ?? {
        interior: [],
        exterior: [],
        safety: [],
        comfortConvenience: [],
        otherFeatures: []
      }
    });
  }, [selectedCar]);

  const handleChange = (field: keyof Car | 'features', value: any) => {
    if (field === 'features') {
      setCar((prev) => ({
        ...prev,
        features: {
          ...(prev.features || {
            interior: [],
            exterior: [],
            safety: [],
            comfortConvenience: [],
            otherFeatures: []
          }),
          ...value,
        },
      }));
    } else {
      setCar((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const missing: string[] = [];
      if (!car.brand) missing.push('Brand');
      if (!car.modelCar) missing.push('Model');
      if (!car.engine) missing.push('Engine');
      if (!car.exteriorColor) missing.push('Exterior Color');
      if (!car.year) missing.push('Year');
      if (!car.trimLevel) missing.push('Trim Level');

      if (missing.length > 0) {
        toast.error(`Please fill in: ${missing.join(', ')}`);
        return false;
      }
    }

    if (step === 3 && imageFiles.length === 0) {
      toast.error('Upload at least one image.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step !== 3) {
      console.warn('Blocked submission: not on final step');
      return;
    }

    const updatedCar: Car = {
      ...car,
      name: car.name || `${car.brand} ${car.modelCar}`,
      condition: car.condition,
      fuelType: car.fuelType,
      transmission: car.transmission,
      carType: car.carType,
      DriveType: car.DriveType,
    };

    setSelectedCar(updatedCar);

    const formData = new FormData();
    formData.append('car', JSON.stringify(updatedCar));
    imageFiles.forEach(file => formData.append('images', file));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cars`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to create car');

      const result = await res.json();

      console.log('✅ Car created:', result);
      toast.success(`Car ${isNew ? 'added' : 'updated'} successfully!`);

    } catch (err) {
      toast.error(`Error submitting car: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('🚫 Error submitting:', err);
    }

  };

  const formContent = (
    <>
      <div className="mb-4">
        <ul className="nav nav-pills nav-justified">
          {['Car Info', 'Specs', 'Contents'].map((label, idx) => (
            <li className="nav-item" key={idx}>
              <span className={`nav-link ${step === idx + 1 ? 'active' : 'bg-light'}`}>
                Step {idx + 1}: {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit} onKeyDown={(e) => {
        if (e.key === 'Enter' && step !== 3) {
          e.preventDefault();
        }
      }}>
        <div className="modal-body">
          {step === 1 && <Step1CarInfo car={car} handleChange={handleChange} />}
          {step === 2 && <Step2SpecsFeatures car={car} onChange={handleChange} />}
          {step === 3 && (
            <Step3MediaUpload
              car={car}
              setCar={setCar}
              previews={previews}
              setPreviews={setPreviews}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          )}

        </div>

        <div className="modal-footer border-0 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-prima"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              className="btn btn-prima"
              onClick={() => validateStep(step) && setStep((prev) => Math.min(prev + 1, 3))}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-prima"
              onClick={() => {
                if (validateStep(step)) {

                  // Find the form element and trigger its submit method
                  const form = document.querySelector('form');
                  if (form) {

                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    if (isModal && onClose) onClose();
                  }
                }
              }}
            >
              Submit
            </button>

          )}
        </div>
      </form>
    </>
  );

  return isModal ? (
    
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal- modal-lg modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title">{isNew ? 'Add New Car' : 'Edit Car'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <ToastContainer />
          {formContent}
        </div>
      </div>
    </div>
  ) : (
    <div className="container py-4">
      <h2 className="mb-4">{isNew ? 'Add New Car' : 'Edit Car'}</h2>
      {formContent}
    </div>
  );
}
