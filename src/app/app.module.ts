import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceInformationComponent } from './invoice-information/invoice-information.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NbCardModule, NbDialogModule, NbThemeModule } from '@nebular/theme';

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
    NbDialogModule.forChild(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
