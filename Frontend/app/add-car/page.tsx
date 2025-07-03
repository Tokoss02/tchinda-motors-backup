'use client'
import { useState } from 'react';
import CarFormModal from '@/components/Modals/CarFormModal';
import { emptyCar } from '@/types/carvalue';

export default function AddCarPage() {
  const [car, setCar] = useState(emptyCar);

  return (
    <CarFormModal
      isNew
      isModal={false}
      selectedCar={car}
      setSelectedCar={setCar}
    />
  );
}
