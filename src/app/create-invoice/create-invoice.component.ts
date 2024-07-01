import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { InvoiceInformationComponent } from '../invoice-information/invoice-information.component';
import { Router } from '@angular/router';
import { Invoice } from '../Model/invoice.model';
import { HttpService } from '../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'] // corrected from styleUrl to styleUrls
})
export class CreateInvoiceComponent implements OnInit{
  private readonly apiController: string = "Invoice";
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
  totalprice : any = 0;
  percentAmount: any ;
  TotalAmount: any

  constructor( private router: Router , private httpService: HttpService ){
    this.model = new Invoice();
  }
  ngOnInit() {
    throw new Error('Method not implemented.');
  }

  
  openInvoicePrview(){
    // this.ref.close("closeModel");
    // this.router.navigate(['/admin/invoice-information']);
  }
  onSubmit() {
    debugger
  this.httpService.post(`${this.apiController}/AddUpdateInvoice`, this.model).subscribe({
    next: (data: any) => {
      if (data.status) {
        // this.swalService.Success(data.Message);
        Swal.fire({
          text: "Invoice Data is Sent Successfully!",
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Okay',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.Message,
          icon: 'error',
          confirmButtonText: 'Close',
        });
      }
    },
    error: (error: any) => {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while sending the invoice data.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    },
    complete: () => {
      console.log('Request complete');
    }
  });
}

  multiply(){
    if(this.model.price != undefined){
    this.totalprice = this.model.price*this.model.qty
  }
  }

  CGSTPercent(){
    this.model.cgsT_Amount = (this.totalprice * this.model.cgsT_Per / 100);
  }
  SGSTPercent(){
    this.model.sgsT_Amount = (this.totalprice * this.model.sgsT_Per / 100);
    
  }

  totalamount(){
    this.TotalAmount = this.totalprice + this.model.cgsT_Amount + this.model.sgsT_Amount
  }
}
