import { Component, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-information',
  templateUrl: './invoice-information.component.html',
  styleUrls: ['./invoice-information.component.scss']
})
export class InvoiceInformationComponent {
  constructor(private el: ElementRef) { }

  generatePdfAndDownload() {
    const allPost = this.el.nativeElement.querySelector('#allpost');
    if (allPost) {
      const html2canvasOptions = {
        scale: 2, // Adjust scale as needed
        useCORS: true
      };

      html2canvas(allPost, html2canvasOptions).then((canvas) => {
        const imgData = canvas.toDataURL('image/png'); // Full quality

        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth; // Set image width to page width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        // Split content into multiple pages if necessary
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('invoice.pdf');
      });
    }
  }
}
