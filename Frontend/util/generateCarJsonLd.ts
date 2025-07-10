export function generateCarJsonLd(car: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${car.brand} ${car.modelCar} ${car.trimLevel} ${car.engine}L ${car.year}`,
    "description": car.description || `Buy ${car.name} (${car.year}) from Tokoss Motors.`,
    "url": `https://tokossmotors.com/cars/${car.carSlug}`,
    "image": car.images.map((url: string) => `https://tokossmotors.com${url}`),
    "brand": {
      "@type": "Brand",
      "name": car.brand
    },
    "model": car.modelCar,
    "vehicleModelDate": `${car.year}`,
    "vehicleTransmission": car.transmission,
    "fuelType": car.fuelType,
    "numberOfDoors": car.numberOfDoors,
    "seatingCapacity": car.seats,
    "bodyType": car.carType,
    "steeringPosition": car.steering,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "engineDisplacement": `${car.engine} L`,
      "enginePower": {
        "@type": "QuantitativeValue",
        "value": car.horsepower,
        "unitCode": "BHP"
      },
      "torque": {
        "@type": "QuantitativeValue",
        "value": car.torque,
        "unitCode": "NM"
      },
      "cylinderCount": car.cylinders
    },
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.mileage,
      "unitCode": "KM"
    },
    "vehicleCondition": car.condition === 'New' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": car.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": car.condition === 'New' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      "url": `https://tokossmotors.com/cars/${car.carSlug}`
    }
  };
}
