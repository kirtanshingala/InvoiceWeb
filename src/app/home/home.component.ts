import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NbDialogService } from '@nebular/theme';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';
import { Router } from '@angular/router';
import { InvoiceDataService } from '../service/invoiceData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly apiController: string = "Invoice";

  items: any = [];

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private httpService: HttpService,
    private invoiceDataService: InvoiceDataService // inject the service
  ) {}

  ngOnInit() {
    this.GetInvoice();
  }

  GetInvoice() {
    this.httpService.get(`${this.apiController}/GetInvoice`).subscribe((resp: any) => {
      this.items = resp;
    });
  }

  EditItem(item: any, event: Event) {
    this.dialogService.open(CreateInvoiceComponent, {
      hasBackdrop: true,
    }).onClose.subscribe(comments => {
      // handle dialog close
    });
    console.log("Edit");
  }

  DeleteItem(item: any) {
    console.log('Deleting item', item);
  }

  PreviewItem(invoiceID: number, event: Event) {
    this.router.navigate(['/invoice-information', invoiceID]);
    console.log('Preview item', invoiceID);
  }
}
