import React from 'react';


interface CarSpecsProps {
  specs: any;
}

const CarSpecsSection: React.FC<CarSpecsProps> = ({ specs }) => {
  const features = specs?.features || {
    interior: [],
    exterior: [],
    safety: [],
    comfortConvenience: [],
    otherFeatures: [],
  };


  const renderFeatureList = (label: string, list: string[]) => {
    if (!Array.isArray(list) || list.length === 0) return null;


    return (
      <div className="mb-4">
        <h5>{label}</h5>
        <ul className="list-unstyled row row-cols-1 row-cols-md-2 text-lg-medium ">
          {list.map((feature, idx) => (
            <li key={idx}>• {feature}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      {/* Technical Features */}
      <div className="mb-4">
        <h5>Technical Features</h5>

        <ul className="list-unstyled text-lg-medium text-bold row row-cols-1 row-cols-md-2 ">

          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <td>Brand:</td>
                <td>{specs.brand}</td>
              </tr>
              <tr>
                <td className="font-semibold">Model:</td>
                <td>{specs.modelCar}</td>
              </tr>
              <tr>
                <td className="font-semibold">Trim Level:</td>
                <td>{specs.trimLevel}</td>
              </tr>
              <tr>
                <td className="font-semibold">Engine:</td>
                <td>{specs.engine}</td>
              </tr>
              <tr>
                <td className="font-semibold">Cylinders:</td>
                <td>{specs.cylinders}</td>
              </tr>

              <tr>
                <td className="font-semibold">Year:</td>
                <td>{specs.year}</td>
              </tr>
              <tr>
                <td className="font-semibold">Transmission:</td>
                <td>{specs.transmission}</td>
              </tr>
              <tr>
                <td className="font-semibold">Seats:</td>
                <td>{specs.seats}</td>
              </tr>
              <tr>
                <td className="font-semibold">Car Type:</td>
                <td>{specs.carType}</td>
              </tr>
              <tr>
                <td className="font-semibold">Steering:</td>
                <td>{specs.steering}</td>
              </tr>
              <tr>
                <td className="font-semibold">Upholstery:</td>
                <td>{specs.upholstery}</td>
              </tr>
              <tr>
                <td className="font-semibold">Drive Type:</td>
                <td>{specs.DriveType}</td>
              </tr>
              <tr>
                <td className="font-semibold">Wheel Size:</td>
                <td>{specs.wheelSize}</td>
              </tr>
              <tr>
                <td className="font-semibold">Exterior Color:</td>
                <td>{specs.exteriorColor}</td>
              </tr>
              <tr>
                <td className="font-semibold">Interior Color:</td>
                <td>{specs.interiorColor}</td>
              </tr>
              <tr>
                <td className="font-semibold">Condition:</td>
                <td>{specs.condition}</td>
              </tr>
              <tr>
                <td className="font-semibold">Mileage:</td>
                <td>{specs.mileage} KM</td>
              </tr>
              <tr>
                <td className="font-semibold">Number of Doors:</td>
                <td>{specs.numberOfDoors}</td>
              </tr>
              <tr>
                <td className="font-semibold">Curb Weight:</td>
                <td>{specs.curbWeight}</td>
              </tr>
              <tr>
                <td className="font-semibold">Ground Clearance:</td>
                <td>{specs.groundClearance}</td>
              </tr>
              <tr>
                <td className="font-semibold">Wheelbase:</td>
                <td>{specs.wheelbase}</td>
              </tr>
              <tr>
                <td className="font-semibold">Height:</td>
                <td>{specs.height}</td>
              </tr>
              <tr>
                <td className="font-semibold">Torque:</td>
                <td>{specs.torque}</td>
              </tr>
              <tr>
                <td className="font-semibold">Service History:</td>
                <td>{specs.serviceHistory}</td>
              </tr>
              <tr>
                <td className="font-semibold">Fuel Type:</td>
                <td>{specs.fuelType}</td>
              </tr>
              <tr>
                <td className="font-semibold">Horsepower:</td>
                <td>{specs.horsepower}</td>
              </tr>
            </tbody>
          </table>
        </ul>
      </div>

      {renderFeatureList('Interior', features.interior)}
      {renderFeatureList('Exterior', features.exterior)}
      {renderFeatureList('Safety', features.safety)}
      {renderFeatureList('Comfort & Convenience', features.comfortConvenience)}
      {renderFeatureList('Other Features', features.otherFeatures)}
    </div>
  );
};

export default CarSpecsSection;
