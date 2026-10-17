import { useState, useEffect } from 'react';
import { Car } from '@/types/carvalue';
import { getCars, deleteCar } from '@/services/carService';

export const useCarActions = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null); // Added error state
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  const fetchCars = async () => {
    setIsLoading(true); // Start loading
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      setError('Error fetching cars. Kindly refresh the page.');
      console.error('Failed to fetch cars:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };


  const handleSearch = async (searchParams: Partial<Pick<Car, 'brand' | 'modelCar' | 'fuelType' | 'transmission' | 'carType'>>) => {
    setIsLoading(true); // Start loading
    try {

      // Convert to a plain object with string values only
      const stringParams: Record<string, string> = {};
      for (const key in searchParams) {
        const value = searchParams[key as keyof typeof searchParams];
        if (value !== undefined && value !== null) {
          stringParams[key] = String(value);
        }
      }

      const data = await getCars(stringParams);
      setCars(data);
    } catch (error) {
      setError('Search failed.');
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };


  const handleCarAdded = () => {
    fetchCars();
    setShowForm(false);
  };

  const handleEditClick = (car: Car) => setEditingCar(car);
  const handleCancelEdit = () => setEditingCar(null);
  const handleCarUpdated = () => {
    fetchCars();
    handleCancelEdit();
  };

  const handleDeleteRequest = (car: Car) => setCarToDelete(car);
  const cancelDelete = () => setCarToDelete(null);

  const confirmDelete = async () => {
    if (!carToDelete) return;
    try {
      await deleteCar(carToDelete._id!);
      fetchCars();
    } catch (error) {
      console.error('Failed to delete car:', error);
    } finally {
      setCarToDelete(null);
    }
  };



  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    showForm,
    setShowForm,
    editingCar,
    handleEditClick,
    handleCancelEdit,
    handleCarUpdated,
    handleCarAdded,
    carToDelete,
    handleDeleteRequest,
    cancelDelete,
    confirmDelete,
    handleSearch,
    isLoading,
    error,
  };
};
