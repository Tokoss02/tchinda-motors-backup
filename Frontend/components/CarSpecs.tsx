'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { generateSpecsOnlyPDF } from '@/components/pdf/DownloadSpecsOnly';
import { generateImagesOnlyPDF } from '@/components/pdf/DownloadImagesOnly';
import { generateSpecsWithImagesPDF } from '@/components/pdf/DownloadSpecsWithImages';

interface CarSpecsPDFProps {
  carId: string;
}

const CarSpecsPDF: React.FC<CarSpecsPDFProps> = ({ carId }) => {
  const [specs, setSpecs] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cars/${carId}`)
      .then((res) => setSpecs(res.data))
      .catch((err) => console.error('Error fetching car specs:', err));
  }, [carId]);

  if (!specs) return <p>Loading car specs...</p>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div className="btn-group container">
          <button
            className="btn btn-secondary w-100 mt-3 rounded me-2"
            onClick={() => generateSpecsWithImagesPDF(specs)}
          >
            PDF (Specs + Images)
          </button>
          <button
            className="btn btn-secondary w-100 mt-3 rounded me-2"
            onClick={() => generateSpecsOnlyPDF(specs)}
          >
            PDF (Specs Only)
          </button>
          <button
            className="btn btn-secondary w-100 mt-3 rounded me-2"
            onClick={() => generateImagesOnlyPDF(specs)}
          >
            PDF (Images Only)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSpecsPDF;
