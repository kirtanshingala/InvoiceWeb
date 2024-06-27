import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { HomeComponent } from './home/home.component';
import { InvoiceInformationComponent } from './invoice-information/invoice-information.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create-invoice',
    component: CreateInvoiceComponent,
  },
  {
    path: 'invoice-information',
    component: InvoiceInformationComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
