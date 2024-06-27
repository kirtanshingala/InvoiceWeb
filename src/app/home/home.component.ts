import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly apiController: string = "Invoice";

  items : any= [];

  constructor(private httpService: HttpService){}
 
  
  ngOnInit() {
    this.GetInvoice();
  }

GetInvoice(){
  this.httpService.get(`${this.apiController}/GetInvoice`).subscribe((resp : any) => {
   this.items = resp;
  })
}
editItem(item: any) {
  // Add your edit logic here
  console.log('Editing item', item);
}

PreviewItem(item: any) {
  // Add your delete logic here
  console.log('Deleting item', item);
}
}
