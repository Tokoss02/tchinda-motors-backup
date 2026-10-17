'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Car } from '@/types/carvalue';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function BookCarPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });



  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`${API_BASE_URL}/cars/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error('Error fetching car:', err);
      }
    }

    if (id) fetchCar();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', form);

    // TODO: Send to backend if needed
    alert('Booking submitted!');
  };

  if (!car) return <p className="text-center mt-10">Loading car data...</p>;

  const imageUrl =
    typeof car.images?.[0] === 'string'
      ? car.images[0].startsWith('/')
        ? `${API_BASE_URL}${car.images[0]}`
        : car.images[0]
      : '/default-car.jpg';


  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Car</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Car Summary */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <div className="relative w-full h-64 mb-4">
            <Image
              src={imageUrl}
              alt={car.name || 'Car image'}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <h2 className="text-xl font-semibold">{car.name}</h2>
          <p className="text-sm text-gray-700">{car.condition} - {car.transmission}</p>
          <p className="text-green-600 font-bold mt-2">${car.price}</p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-lg font-semibold mb-2">Your Details</h2>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="message"
            placeholder="Message (optional)"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}
