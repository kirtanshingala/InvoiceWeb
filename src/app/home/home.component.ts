import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NbDialogService } from '@nebular/theme';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';
import { InvoiceInformationComponent } from '../invoice-information/invoice-information.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly apiController: string = "Invoice";

  items : any= [];

  constructor( private dialogService: NbDialogService, private router: Router, private httpService: HttpService){}
 
  
  ngOnInit() {
    this.GetInvoice();
  }

GetInvoice(){
  this.httpService.get(`${this.apiController}/GetInvoice`).subscribe((resp : any) => {
   this.items = resp;
  })
}
EditItem(item: any, event: Event){
  this.dialogService.open(CreateInvoiceComponent, {
    hasBackdrop: true,
  }).onClose.subscribe(comments => {
  });
  console.log("Edit")
}
DeleteItem(item: any) {
  console.log('Deleting item', item);
}

PreviewItem(item: any, event: Event) {
  this.router.navigate(['/invoice-information']);
  console.log('Preview item', item);
}
}
