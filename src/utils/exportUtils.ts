import jsPDF from 'jspdf';
import { Quote } from '../pages/CotizacionesPage';

export function exportQuoteToPDF(quote: Quote) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('COTIZACIÓN', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(quote.quoteNumber, pageWidth / 2, yPosition, { align: 'center' });

  // Company info (optional - you can customize this)
  yPosition += 15;
  doc.setFontSize(10);
  doc.text('NewTop Marmolería', 20, yPosition);
  yPosition += 5;
  doc.text('Tel: +52 555 000 0000', 20, yPosition);
  yPosition += 5;
  doc.text('info@newtop.com', 20, yPosition);

  // Date and validity
  yPosition += 10;
  doc.setFontSize(9);
  doc.text(`Fecha: ${new Date(quote.createdDate).toLocaleDateString('es-MX')}`, 20, yPosition);
  doc.text(`Válida hasta: ${new Date(quote.validUntil).toLocaleDateString('es-MX')}`, pageWidth - 20, yPosition, { align: 'right' });

  // Line separator
  yPosition += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  // Client information
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE', 20, yPosition);
  
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Nombre: ${quote.clientName}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Email: ${quote.clientEmail}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Teléfono: ${quote.clientPhone}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Proyecto: ${quote.projectType}`, 20, yPosition);
  
  if (quote.clientAddress) {
    yPosition += 6;
    doc.text(`Dirección: ${quote.clientAddress}`, 20, yPosition);
  }

  // Line separator
  yPosition += 8;
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  // Products header
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PRODUCTOS', 20, yPosition);

  // Table header
  yPosition += 7;
  doc.setFontSize(9);
  doc.text('Producto', 20, yPosition);
  doc.text('Área (m²)', 100, yPosition, { align: 'right' });
  doc.text('Precio/m²', 135, yPosition, { align: 'right' });
  doc.text('Subtotal', pageWidth - 20, yPosition, { align: 'right' });

  yPosition += 3;
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  // Products
  doc.setFont('helvetica', 'normal');
  quote.items.forEach((item) => {
    yPosition += 7;
    
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    doc.text(item.productName, 20, yPosition);
    doc.text(item.area.toFixed(2), 100, yPosition, { align: 'right' });
    doc.text(`$${item.pricePerUnit.toLocaleString()}`, 135, yPosition, { align: 'right' });
    doc.text(`$${item.subtotal.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });
  });

  // Line separator
  yPosition += 5;
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  // Totals
  yPosition += 8;
  doc.setFontSize(10);
  doc.text('Subtotal:', pageWidth - 70, yPosition);
  doc.text(`$${quote.subtotal.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });

  yPosition += 6;
  doc.text('IVA (16%):', pageWidth - 70, yPosition);
  doc.text(`$${quote.tax.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });

  if (quote.discount > 0) {
    yPosition += 6;
    doc.setTextColor(34, 197, 94); // green color
    doc.text('Descuento:', pageWidth - 70, yPosition);
    doc.text(`-$${quote.discount.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });
    doc.setTextColor(0, 0, 0); // reset to black
  }

  yPosition += 3;
  doc.setDrawColor(0, 0, 0);
  doc.line(pageWidth - 70, yPosition, pageWidth - 20, yPosition);

  yPosition += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TOTAL:', pageWidth - 70, yPosition);
  doc.text(`$${quote.total.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });

  // Notes
  if (quote.notes) {
    yPosition += 15;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('NOTAS:', 20, yPosition);
    yPosition += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitNotes = doc.splitTextToSize(quote.notes, pageWidth - 40);
    doc.text(splitNotes, 20, yPosition);
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Esta cotización es válida hasta la fecha indicada. Los precios incluyen IVA.', pageWidth / 2, footerY, { align: 'center' });
  doc.text('Para más información, contáctenos a través de nuestros canales de comunicación.', pageWidth / 2, footerY + 4, { align: 'center' });

  // Save the PDF
  doc.save(`${quote.quoteNumber}.pdf`);
}

export function exportQuoteToCSV(quote: Quote) {
  // CSV header
  const headers = ['Producto', 'Área (m²)', 'Precio/m²', 'Subtotal'];
  
  // CSV rows
  const rows = quote.items.map(item => [
    item.productName,
    item.area.toFixed(2),
    item.pricePerUnit.toFixed(2),
    item.subtotal.toFixed(2)
  ]);

  // Add summary rows
  rows.push(['', '', '', '']);
  rows.push(['', '', 'Subtotal:', quote.subtotal.toFixed(2)]);
  rows.push(['', '', 'IVA (16%):', quote.tax.toFixed(2)]);
  
  if (quote.discount > 0) {
    rows.push(['', '', 'Descuento:', `-${quote.discount.toFixed(2)}`]);
  }
  
  rows.push(['', '', 'TOTAL:', quote.total.toFixed(2)]);

  // Add client info at the top
  const clientInfo = [
    ['Cotización:', quote.quoteNumber],
    ['Cliente:', quote.clientName],
    ['Email:', quote.clientEmail],
    ['Teléfono:', quote.clientPhone],
    ['Proyecto:', quote.projectType],
    ['Fecha:', new Date(quote.createdDate).toLocaleDateString('es-MX')],
    ['Válida hasta:', new Date(quote.validUntil).toLocaleDateString('es-MX')],
    ['', '']
  ];

  // Combine all data
  const allRows = [...clientInfo, headers, ...rows];

  // Convert to CSV string
  const csvContent = allRows
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  // Create blob and download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${quote.quoteNumber}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
