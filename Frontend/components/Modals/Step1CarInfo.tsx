// Step1CarInfo.tsx
'use client';
import React from 'react';
import { Car } from '@/types/carvalue';

interface Props {
    car: Car;
    handleChange: (field: keyof Car, value: any) => void;
}

const Step1CarInfo: React.FC<Props> = ({ car, handleChange }) => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const textFields: (keyof Car)[] = [
        'brand', 'modelCar', 'engine','trimLevel', 'exteriorColor', 'interiorColor', 'year',  'price', 'mileage', 'seats',
        'wheelSize', 'doors', 'curbWeight', 'groundClearance', 'wheelbase',
        'height', 'torque', 'horsepower',
    ];

    const selectFields = [
        { field: 'condition', options: ['New', 'Used'] },
        { field: 'transmission', options: ['Manual', 'Automatic', 'CVT'] },
        { field: 'fuelType', options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
        { field: 'carType', options: ['SUV', 'Crossover', 'Sedan', 'Pickup', 'Hatchback', 'Coupe', 'Truck', 'Minivan', 'Bus', 'Van', 'Luxury', 'Jeep'] },
        { field: 'DriveType', options: ['FWD', 'RWD', 'AWD', '4WD'] },
        { field: 'steering', options: ['Left Hand Drive (LHD)', 'Right Hand Drive (RHD)'] },
        { field: 'upholstery', options: ['Fabric', 'Leather'] },
        { field: 'serviceHistory', options: ['Yes', 'No'] },
    ];

    return (
        <div className="row">

            {textFields.map((field) => (
                <div className="col-6 col-sm-4 col-lg-3 mb-3" key={field}>
                    <label className="form-label">{capitalize(field)}</label>
                    <input
                        required
                        type={typeof car[field] === 'number' ? 'number' : 'text'}
                        className="form-control"
                        value={
                            typeof car[field] === 'string' || typeof car[field] === 'number'
                                ? car[field]
                                : ''
                        }
                        onChange={(e) =>
                            handleChange(
                                field,
                                ['year', 'engine', 'price', 'mileage', 'seats', 'wheelSize', 'doors', 'curbWeight',
                                    'groundClearance', 'wheelbase', 'height', 'torque', 'horsepower'].includes(field)
                                    ? Number(e.target.value)
                                    : e.target.value
                            )
                        }
                    />
                </div>
            ))}

            {selectFields.map(({ field, options }) => (
                <div className="col-6 col-sm-4 col-lg-3 mb-3" key={field}>
                    <label className="form-label">{capitalize(field)}</label>
                    <select
                        required
                        className="form-select"
                        value={
                            typeof (car as any)[field] === 'string' || typeof (car as any)[field] === 'number'
                                ? (car as any)[field]
                                : ''
                        }
                        onChange={(e) => handleChange(field as keyof Car, e.target.value)}
                    >
                        <option value="">Select {capitalize(field)}</option>
                        {options.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

        </div>
    );
};

export default Step1CarInfo;

