'use client'
import { useState } from 'react';
import CarFormModal from '@/components/Modals/CarFormModal';
import { Car, emptyCar } from '@/types/carvalue';
import router from 'next/router';
import Head from 'next/head';

export default function AddCarPage() {
  const [car, setCar] = useState(emptyCar);

  const handleSubmit = (
    e: React.FormEvent,
    images: File[],
    updatedCar: Car
  ) => {
    // This function is triggered after local submission logic in the modal
    console.log('📝 Submitted from parent:', { updatedCar, images });

    // Example: redirect to dashboard after submission (optional)
    router.push('/dashboard/cars');
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CarFormModal
        isNew
        isModal={false}
        selectedCar={car}
        setSelectedCar={setCar}
        onSubmit={handleSubmit}
        onClose={() => { }}
      />
    </>
  );
}
