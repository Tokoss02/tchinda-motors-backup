"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { addCar } from "@/services/carService";

const CarForm = () => {
  const emptyCar = {
    name: "",
    brand: "",
    modelCar: "",
    brandSlug: "",
    year: "",
    modelSlug: "",
    condition: "",
    fuelType: "",
    transmission: "",
    carType: "",
    price: "",
    engine: "",
    mileage: "",
    seats: "",
    DriveType: "",
    color: "",
    videoUrl: '',
    //------
    trimLevel: '',
    horsepower: "",
    torque: "",
    length: "",
    width: "",
    height: "",
    Wheelbase: "",
    groundClearance: "",
    Steering: "",
    doors: "",
    wheelSize: "",
    upholstery: "",
  };


  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');

  const [carData, setCarData] = useState(emptyCar);
  const [imageFiles, setImageFiles] = useState<File[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized");
      return;
    }

    try {
      const brandSlug = slugify(carData.brand);
      const modelSlug = slugify(carData.modelCar);
      const fullCarData = {
        ...carData,
        brandSlug,
        modelSlug,
      };

      const formData = new FormData();
      Object.entries(fullCarData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await addCar(formData);
      toast.success("Car added successfully!");
      setCarData(emptyCar);
      setImageFiles([]);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>

      {[
        { name: "name", label: "Name" },
        { name: "brand", label: "Brand" },
        { name: "modelCar", label: "Model" },
        { name: "year", label: "Year" },
        { name: "price", label: "Price" },
        { name: "engine", label: "Engine" },
        { name: "mileage", label: "Mileage" },
        { name: "seats", label: "Seats" },
        { name: "DriveType", label: "DiveType" },
        { name: "color", label: "Color" },

      ].map(({ name, label }) => (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block font-medium mb-1">{label}</label>
          <input
            type="text"
            name={name}
            value={carData[name as keyof typeof carData]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Select inputs */}
      {[
        { name: "condition", label: "Condition", options: ["New", "Used"] },
        { name: "fuelType", label: "Fuel Type", options: ["Petrol", "Diesel", "Electric", "Hybrid"] },
        { name: "transmission", label: "Transmission", options: ["Automatic", "Manual"] },
        { name: "carType", label: "Car Type", options: ["Sedan", "SUV", "Truck", "Coupe", "Van"] },
        { name: "DriveType", label: "Drive Type", options: ["FWD", "RWD", "4WD", "AWD"] },
      ].map(({ name, label, options }) => (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block font-medium mb-1">{label}</label>
          <select
            name={name}
            value={carData[name as keyof typeof carData]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      {/* File input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Car
      </button>
    </form>
  );
};

export default CarForm;
