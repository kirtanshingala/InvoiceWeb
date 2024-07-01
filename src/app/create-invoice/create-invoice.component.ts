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
  price? : number 
  

  constructor( private router: Router , private httpService: HttpService ){
    this.model = new Invoice();
  }
  ngOnInit() {
    
  }

  
  openInvoicePrview(){
    // this.ref.close("closeModel");
    // this.router.navigate(['/admin/invoice-information']);
  }
  onSubmit() {


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
        text: 'Please fill in all the required details in this form.',
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
    if(this.price != undefined){
    this.model.price = this.price*this.model.qty
    this.model.taxableAmount= this.model.price
    this.CGSTPercent();
    this.SGSTPercent()
  }
  }

  CGSTPercent(){
    this.model.cgsT_Amount = this.model.price * this.model.cgsT_Per / 100;
    this.TotalAmount()

  }

  SGSTPercent() {
    this.model.sgsT_Amount = this.model.price * this.model.sgsT_Per / 100;
    this.TotalAmount()
  }
  

TotalAmount(){
  this.model.total =  this.model.price + this.model.cgsT_Amount + this.model.sgsT_Amount
}
updateTaxableAmount() {
  
  if (this.model.cgsT_Per == undefined && this.model.sgsT_Per == undefined)
  {
    this.model.cgsT_Amount = 0;
    this.model.sgsT_Amount= 0;

  }
  else{
  this.CGSTPercent();
  this.SGSTPercent();
}
}

}
