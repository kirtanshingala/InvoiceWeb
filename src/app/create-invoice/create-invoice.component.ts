import { Component, Input, OnInit, input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { InvoiceInformationComponent } from '../invoice-information/invoice-information.component';
import { Router } from '@angular/router';
import { Invoice } from '../Model/invoice.model';
import { HttpService } from '../http.service';
import Swal from 'sweetalert2';
import { InvoiceDataService } from '../service/invoiceData.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'], // corrected from styleUrl to styleUrls
})
export class CreateInvoiceComponent implements OnInit {
  private readonly apiController: string = 'Invoice';
  @Input() invoiceId?:number ;
  // InvoiceUserId: any;
  // UserInvoiceData: any
  model: Invoice;
  // InvoiceID: number;
  // name: string;
  // rowData:any;
  // email: any;
  // PlanName: any;
  // description: any;
  // PhoneNumber: number;
  // PlanPrice: any;
  // CGSTRate: any;
  // SGSTRate: any;
  // StateName: any;
  // CityName: any;
  // HSN_SAC: string;
  // invoiceID: string;
  // issueDate: string;
  // currentDate: Date = new Date();
  price?: number;

  constructor(private router: Router, private httpService: HttpService, private InvoiceDataService: InvoiceDataService) {
    this.model = new Invoice();
  }
  ngOnInit() {
    this.GetInvoiceById()
  }

  openInvoicePrview() {
    // this.ref.close("closeModel");
    // this.router.navigate(['/admin/invoice-information']);
  }
  onSubmit() {
    if (this.model.invoiceDate) {
      this.model.invoiceDate = this.convertToUTC(this.model.invoiceDate);
    }
    this.httpService
      .post(`${this.apiController}/AddUpdateInvoice`, this.model)
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            Swal.fire({
              text: 'Invoice Created Successfully!',
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Okay',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            });
            this.router.navigate(['/home']);
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.Message || 'An error occurred.',
              icon: 'error',
              confirmButtonText: 'Close',
            });
          }
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire({
            title: 'Error!',
            text: 'Please fill in all the required details in this form.',
            icon: 'error',
            confirmButtonText: 'Close',
          });
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }
  
  private convertToUTC(date: Date): Date {
    if (!(date instanceof Date)) {
      date = new Date(date); 
    }
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate;
  }
  
  multiply() {
    if (this.price != undefined) {
      this.model.price = this.price * this.model.qty;
      this.model.taxableAmount = this.model.price;
      this.CGSTPercent();
      this.SGSTPercent();
      this.TDSPercent();
    }
  }

  CGSTPercent() {
    this.model.cgsT_Amount = (this.model.price * this.model.cgsT_Per) / 100;
    this.TotalAmount();
  }

  SGSTPercent() {
    this.model.sgsT_Amount = (this.model.price * this.model.sgsT_Per) / 100;
    this.TotalAmount();
  }
  TDSPercent() {
    this.model.tdS_Amount = (this.model.price * this.model.tdS_Per) / 100;
    this.TotalAmount();
  }

  TotalAmount() {
    // this.model.total = this.model.price - this.model.cgsT_Amount - this.model.sgsT_Amount;
    this.model.total = this.model.price - this.model.tdS_Amount;
  }
  updateTaxableAmount() {
    if (this.model.cgsT_Per == undefined && this.model.sgsT_Per == undefined) {
      this.model.cgsT_Amount = 0;
      this.model.sgsT_Amount = 0;
    } else {
      this.CGSTPercent();
      this.SGSTPercent();
      this.TDSPercent();
    }
  }
  GetInvoiceById() {
    // const invoiceId = this.InvoiceDataService.InvoiceId
    console.log(this.invoiceId);
    this.httpService.get(`${this.apiController}/GetInvoiceById?InvoiceID=` + this.invoiceId).subscribe((resp: any) => {
      this.model = resp
    });
  }
  onCancel() {
    // Navigate back to the previous page or reset the form
    this.router.navigate(['/home']); // Adjust the route as needed
    // Or, to reset the form, you can use this.exampleForm.reset();
  }
}
