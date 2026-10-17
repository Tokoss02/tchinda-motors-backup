// components/pdf/DownloadImagesOnly.ts
import jsPDF from 'jspdf';

export async function generateImagesOnlyPDF(specs: any) {
    if (!specs || !specs.images || specs.images.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 15;

    const headerLogoPath = "/assets/imgs/template/Tchinda-motors-Logo-01.png";   // Top-right (first page)
    const footerLogoPath = "/assets/imgs/template/Tchinda-motors-Logo-01.png";   // Footer center

    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    const title = specs.name || 'Car Title';
    const titleParts = title.split(' '); // Separate year from the rest (assumes format: YEAR NAME...)

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    const yellowPart = titleParts[0]; // e.g. 2025
    const blackPart = titleParts.slice(1).join(' '); // CAMRY 2.5L HYBRID

     // === Add logo on top right (first page only) ===
    const logoBase64 = await loadLogoAsBase64(headerLogoPath);
    doc.addImage(logoBase64, 'PNG', pageWidth - 55, 5, 45, 15);// top-right

    // Title
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

    // === FOOTER (last page too) ===
    await addFooter(doc, pageWidth, pageHeight, footerLogoPath);

    async function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number, footerLogoPath?: string) {
    const footerY = pageHeight - 10;

    
    doc.setFontSize(10);
    doc.text('www.tchindamotors.com', 10, footerY);

    // Social media links
    const socialText = 'FB | TK | IG | YT: @tchindamotors';
    const textWidth = doc.getTextWidth(socialText);
    doc.text(socialText, pageWidth - textWidth - 10, footerY);

     // Logo center
     if (footerLogoPath) {
        const logoBase64 = await loadLogoAsBase64(footerLogoPath);
        const centerX = pageWidth / 2 - 10;
        doc.addImage(logoBase64, 'PNG', centerX, footerY - 6, 30, 10);
    }

     // --- Save PDF ---
    const fileName = `${specs.name.replace(/\s+/g, '-')}-Images-Only(Tchinda-Motors).pdf`;
    doc.save(fileName);}
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

// === Logo Loader Helper (preserve transparency) ===
const loadLogoAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous'; // allow cross-origin fetch
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            // ✅ keep transparency for logos
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = url;
    });
};
