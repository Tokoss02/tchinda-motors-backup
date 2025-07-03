// components/pdf/DownloadSpecsOnly.ts
import jsPDF from 'jspdf';

export const generateSpecsOnlyPDF = (specs: any) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 30;
    let rowColorToggle = false;

    doc.setFontSize(16);
    doc.text('Car Specifications', 10, 20);
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    const title = specs.name || 'Car Title';
    const titleParts = title.split(' '); // Separate year from the rest (assumes format: YEAR NAME...)

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');

    const yellowPart = titleParts[0]; // e.g. 2025
    const blackPart = titleParts.slice(1).join(' '); // CAMRY 2.5L HYBRID

    let x = 10;
    doc.setTextColor(204, 152, 35); // Yellow
    doc.text(yellowPart, x, y);

    const yellowTextWidth = doc.getTextWidth(yellowPart);
    x += yellowTextWidth + 3;

    doc.setTextColor(0, 0, 0); // Black
    doc.text(blackPart, x, y);
    y += 12; // space below title
    doc.setDrawColor(180);
    doc.line(10, y, pageWidth - 10, y);


    const addSectionTitle = (title: string) => {
        y += 8;
        doc.setFillColor(180, 180, 180);
        doc.rect(10, y, 190, 9, 'F');
        doc.setFontSize(13);
        doc.setTextColor(33, 33, 33);
        doc.text(title, 12, y + 6);
        y += 9;
    };

    const addTableRow = (label: string, value: string | number = 'N/A') => {
        const fillColor: [number, number, number] = rowColorToggle ? [240, 240, 240] : [255, 255, 255];
        rowColorToggle = !rowColorToggle;

        doc.setFillColor(...fillColor);
        doc.rect(10, y, 60, 8, 'F');
        doc.rect(70, y, 130, 8, 'F');
        doc.setFontSize(11);
        doc.setTextColor(0);
        doc.text(label, 12, y + 6);
        doc.text(`${value}`, 72, y + 6);
        y += 8;

        if (y > pageHeight - 40) {
            doc.addPage();
            y = 20;
            rowColorToggle = false;
        }
    };

    addSectionTitle('Technical Features');
    addTableRow('Brand', specs.brand);
    addTableRow('Model', specs.modelCar);
    addTableRow('Engine', specs.engine);
    addTableRow('Horsepower', specs.horsepower);
    addTableRow('Drive Type', specs.DriveType);
    addTableRow('Cylinders', specs.cylinders);
    addTableRow('Transmission', specs.transmission);
    addTableRow('Fuel Type', specs.fuelType);
    addTableRow('Wheel Size', specs.wheelSize);

    addSectionTitle('Interior');
    addTableRow('Interior Color', specs.interiorColor);
    addTableRow('Seats', specs.seats);
    addTableRow('Steering Side', specs.steering);
    if (specs.features?.interior?.length) {
        specs.features.interior.forEach((f: string) => addTableRow(f, '•'));
    }

    addSectionTitle('Exterior');
    addTableRow('Exterior Color', specs.color);
    addTableRow('Number of Doors', specs.numberOfDoors);
    addTableRow('Car Type', specs.carType);
    if (specs.features?.exterior?.length) {
        specs.features.exterior.forEach((f: string) => addTableRow(f, '•'));
    }

    // Safety
    addSectionTitle('Safety');
    if (specs.features?.safety?.length) {
        specs.features.safety.forEach((f: string) => addTableRow(f, '•'));
    }

    // Comfort & Convenience
    addSectionTitle('Comfort & Convenience');
    if (specs.features?.comfortConvenience?.length) {
        specs.features.comfortConvenience.forEach((f: string) => addTableRow(f, '•'));
    }

    // Other Features
    addSectionTitle('Other Features');
    if (specs.features?.otherFeatures?.length) {
        specs.features.otherFeatures.forEach((f: string) => addTableRow(f, '•'));
    }


    doc.setFontSize(10);
    const footerY = doc.internal.pageSize.height - 10;
    doc.text('www.tokossmotors.com', 10, footerY);
    const socialText = 'FB | TK | IG | YT: @tokossmotors';
    const textWidth = doc.getTextWidth(socialText);

    doc.text(socialText, pageWidth - textWidth - 10, footerY);
    const fileName = `${specs.name.replace(/\s+/g, '-')}-car-Specs-Only-Tokoss-Motors.pdf`;
    doc.save(fileName);
};


