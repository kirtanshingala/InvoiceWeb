import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NbDialogService } from '@nebular/theme';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';
import { Router } from '@angular/router';
import { InvoiceDataService } from '../service/invoiceData.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly apiController: string = "Invoice";

  items: any = [];
  searchText: string = '';

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


  DeleteItem(item: any) {
    console.log('Deleting item', item);
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete service or perform the delete action here
        this.httpService.delete(`${this.apiController}/DeleteInvoice?InvoiceID=` + item).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            )
            this.GetInvoice()
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'There was a problem deleting your item.',
              'error'
            );
          }
        });
      }
    });
  }
  

  
  EditItem(item: any, event: Event) {
    this.invoiceDataService.InvoiceId = item
    this.dialogService.open(CreateInvoiceComponent, {
      context:{
          invoiceId: item
      },
      hasBackdrop: true,
      
    });
    console.log("Edit");
  }

  PreviewItem(invoiceID: number, event: Event) {
    this.router.navigate(['/invoice-information', invoiceID]);
    console.log('Preview item', invoiceID);
  }
  filteredItems() {
    if (!this.searchText.trim()) {
      return this.items;
    }
    return this.items.filter((item: any) =>
      item.to_Name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  clearSearch() {
    this.searchText = '';
  }
}
