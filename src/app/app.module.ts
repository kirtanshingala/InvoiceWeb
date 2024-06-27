import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceInformationComponent } from './invoice-information/invoice-information.component';
import { HomeComponent } from './home/home.component';
import { NbCardModule, NbThemeModule } from '@nebular/theme';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateInvoiceComponent,
    InvoiceInformationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
