import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { InvoiceInformationComponent } from '../invoice-information/invoice-information.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'] // corrected from styleUrl to styleUrls
})
export class CreateInvoiceComponent {
  constructor( private router: Router){

  }
  openInvoicePrview(){
    // this.ref.close("closeModel");
    // this.router.navigate(['/admin/invoice-information']);
  }
}
