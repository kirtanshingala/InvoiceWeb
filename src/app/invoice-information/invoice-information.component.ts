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
    var allPost = this.el.nativeElement.querySelector('#allpost');
    if (allPost) {
        const html2canvasOptions = {
            scale: 2,
            useCORS: true
        };

        html2canvas(allPost, html2canvasOptions).then((canvas) => {
            const imgData = canvas.toDataURL('image/png',  0.5);

            const pdf = new jsPDF('portrait', 'pt', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const canvasAspectRatio = canvas.width / canvas.height;
            const pageAspectRatio = pageWidth / pageHeight;

            let imgWidth, imgHeight;

            if (canvasAspectRatio > pageAspectRatio) {
                imgWidth = pageWidth;
                imgHeight = pageWidth / canvasAspectRatio;
            } else {
                imgHeight = pageHeight;
                imgWidth = pageHeight * canvasAspectRatio;
            }
            const xOffset = (pageWidth - imgWidth) / 2;
            const yOffset = 0;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, '', 'FAST');
            pdf.save('invoice.pdf');
        });
    }
  }
}
