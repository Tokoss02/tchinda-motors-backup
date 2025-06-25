'use client';

import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Car } from '@/types/carvalue';
import '@/public/assets/css/main.css';


interface CarTableProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (carId: string) => void;
}

export default function CarTable({ cars, onEdit, onDelete }: CarTableProps) {

  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleSelectAll = () => {
    if (selectedCarIds.length === cars.length) {
      setSelectedCarIds([]);
    } else {
      setSelectedCarIds(cars.map((car) => car._id));
    }
  };

  const toggleSelectCar = (id: string) => {
    setSelectedCarIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.modelCar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.carType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCars = filteredCars.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const isAllSelected = paginatedCars.length > 0 && selectedCarIds.length === paginatedCars.length;



  const exportSelectedToCSV = () => {
    const selectedCars = cars.filter((car) => selectedCarIds.includes(car._id));
    if (selectedCars.length === 0) return;

    const headers = ['Brand', 'Model', 'Year', 'trimLevel', 'Type', 'Condition', 'Price'];
    const rows = selectedCars.map(car => [
      car.brand,
      car.modelCar,
      car.trimLevel,
      car.year.toString(),
      car.carType,
      car.condition,
      car.price.toString()
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map(e => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'selected_cars.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <div className="table-responsive">

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search cars by brand, model, or condition..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page when searching
          }}

        />
      </div>

      {/*Items Per Page Selector UI:*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          Show{' '}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1); // Reset to page 1 when changing size
            }}
            className="form-select form-select-sm d-inline w-auto"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>{' '}
          entries per page
        </div>

        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-end">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Table */}
      {/* Delete Selected Button */}

      {selectedCarIds.length > 0 && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span>{selectedCarIds.length} selected</span>
          <div className="btn-group">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                const confirmDelete = confirm(`Delete ${selectedCarIds.length} selected car(s)?`);
                if (confirmDelete) {
                  selectedCarIds.forEach((id) => onDelete(id));
                  setSelectedCarIds([]);
                }
              }}
            >
              Delete Selected
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={exportSelectedToCSV}
            >
              Export to CSV
            </button>
          </div>
        </div>
      )}


      <table className="table table-striped table-hover align-middle shadow-sm rounded bg-white">
        <thead className="table-dark">
          <tr>
            <th>
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
                <label htmlFor="select-all"></label>
              </div>
            </th>
            <th>Brands</th>
            <th>Models</th>
            <th>trimLevel</th>
            <th>Years</th>
            <th>Car Type</th>
            <th>Conditions</th>
            <th>Prices (AED)</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>

          {paginatedCars.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No cars found.
              </td>
            </tr>
          ) : (

            paginatedCars.map((car) => (
              //Array.isArray(car) && car.map((car) => (
              <tr key={car._id}>
                <td className="custom-checkbox">
                  <input
                    type="checkbox"
                    id={`select-${car._id}`}
                    checked={selectedCarIds.includes(car._id)}
                    onChange={() => toggleSelectCar(car._id)}
                  />
                  <label htmlFor={`select-${car._id}`}></label>
                </td>
                <td>{car.brand}</td>
                <td>{car.modelCar}</td>
                <td>{car.trimLevel}</td>
                <td>{car.year}</td>
                <td>{car.carType}</td>
                <td>{car.condition}</td>
                <td>AED {car.price}</td>
                <td className="text-end">

                  <button className="btn btn-sm rounded-3  me-2" style={{ backgroundColor: '#d8d8d8' }} onClick={() => onEdit(car)}>
                    <Pencil size={16} className="me-2" />
                    Edit
                  </button>
                  <button className="btn btn-sm rounded-3 btn-outline-danger  " style={{ backgroundColor: '#fff' }} onClick={() => onDelete(car._id)}>
                    <Trash2 size={16} className="me-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
