'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarTable from '@/components/elements/CarTable';
import { Car, emptyCar } from '@/types/carvalue';
import { addCar, updateCar, deleteCar } from '@/util/carHandlers';
import CarModal from '@/components/Modals/CarFormModal';
import PageHeader from '@/components/elements/PageHeader';

export default function CarsPage() {


  // ========== STATE ==========
  const [cars, setCars] = useState<Car[]>([]); // All fetched cars
  const [token, setToken] = useState(''); // Auth token
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Modal visibilityded
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isNew, setIsNew] = useState(false); // Flag to distinguish Add vs Edit
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;




  // ========== LIFECYCLE: Fetch Cars ==========
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // If token is not found, redirect to 2FA page
    if (!token) return router.push('/2fa');
    setToken(token);

    // Fetch cars from backend
    fetch(`${API_BASE_URL}/cars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCars(data);
        else console.error('Unexpected car data:', data);
      })
      .catch((err) => console.error('Failed to fetch cars:', err));
  }, [router]);



  // ========== RENDER ==========
  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Page header */}
      <PageHeader
        title=""
        actionLabel={
          <>
            <i className="bi bi-plus-circle me-2 "></i> Add Car
          </>
        }
        actionClassName="btn btn-success btn-sm rounded-3"
        onActionClick={() => {
          setSelectedCar({ ...emptyCar });
          setImageFiles([]);
          setIsNew(true);
          setShowModal(true);
        }}
      />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div>
          <h5>Cars list</h5>
        </div>
        <CarTable cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {/* ========== MODAL FORM ========== */}
      {showModal && selectedCar && (
        <CarModal
          isNew={isNew}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          onClose={handleCloseModal}
          onSubmit={(e, images, updatedCar) => {
            isNew
              ? handleAdd(e, updatedCar, images)
              : handleUpdate(e, updatedCar, images);
          }}
        />
      )}
    </div>


  );

  // ========== ACTION HANDLERS ==========

  // Open modal to edit a specific car
  function handleEdit(car: Car) {
    console.log('Editing car:', car)
    setSelectedCar(car);
    setImageFiles([]);
    setIsNew(false);
    setShowModal(true);
  }

  // Close modal and reset selected car
  function handleCloseModal() {
    setShowModal(false);
    setSelectedCar(null);
    setImageFiles([]);
  }

  // Delete a car by ID
  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this car?')) {
      try {
        const success = await deleteCar(id, token);
        if (success) {
          setCars(prev => prev.filter(c => c._id !== id));
        } else {
          alert('Delete failed');
        }
      } catch (err) {
        console.error('Failed to delete car:', err);
      }
    }
  }

  //Submit new car data

  async function handleAdd(e: React.FormEvent, newCar: Car, images: File[]) {
    e.preventDefault();

    try {
      const created = await addCar(newCar, token);
      if (created) {
        setCars(prev => [...prev, created]);
        handleCloseModal();
      } else {
        alert('Creation failed');
      }
    } catch (err) {
      console.error('Failed to add car:', err);
    }
  }


  // Submit update for existing car

  async function handleUpdate(e: React.FormEvent, updatedCar: Car, images: File[]) {
    e.preventDefault();

    try {
      const updated = await updateCar(updatedCar, token);
      if (updated) {
        setCars(prev => prev.map(c => (c._id === updated._id ? updated : c)));
        handleCloseModal();
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error('Failed to update car:', err);
    }
  }

}
