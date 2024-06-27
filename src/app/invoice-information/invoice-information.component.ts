import { Component, ElementRef } from '@angular/core';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-information',
  templateUrl: './invoice-information.component.html',
  styleUrls: ['./invoice-information.component.scss']
})
export class InvoiceInformationComponent {
  constructor(private el: ElementRef) { }

  generatePdfAndDownload() {
    var allPost = this.el.nativeElement.querySelector('#allpost');
    if (allPost) {
      const html2canvasOptions = {
        scale: 2, // Adjust scale as needed
        useCORS: true
      };

      html2canvas(allPost, html2canvasOptions).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0); // Full quality

        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();

        const imgWidth = pageWidth; // Set image width to page width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('invoice.pdf');
      });
    }
  }
}
