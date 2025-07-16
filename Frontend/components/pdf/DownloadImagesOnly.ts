// components/pdf/DownloadImagesOnly.ts
import jsPDF from 'jspdf';

export async function generateImagesOnlyPDF(specs: any) {
    if (!specs || !specs.images || specs.images.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;

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
    y += 6; // space below title
    doc.setDrawColor(180);
    doc.line(10, y, pageWidth - 10, y);
    y += 8;

    for (let i = 0; i < specs.images.length; i++) {
        const imgUrl = specs.images[i];
        const image = await loadImageAsBase64(imgUrl);

        if (y + 130 > doc.internal.pageSize.height) {
            doc.addPage();
            y = 10;
        }

        doc.addImage(image, 'JPEG', 10, y, 180, 120);
        y += 130;
    }

    
    doc.setFontSize(10);
    const footerY = doc.internal.pageSize.height - 10;
    doc.text('www.tokossmotors.com', 10, footerY);
    const socialText = 'FB | TK | IG | YT: @tokossmotors';
    const textWidth = doc.getTextWidth(socialText);
    doc.text(socialText, pageWidth - textWidth - 10, footerY);
    const fileName = `${specs.name.replace(/\s+/g, '-')}-car-Images-Tokoss-Motors.pdf`;
    doc.save(fileName);
}

// Helper: Load image as base64
const loadImageAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous'; // allow cross-origin fetch
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 1.0));
        };
        img.src = url;
    });
};
