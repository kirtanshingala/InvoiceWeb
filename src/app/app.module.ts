import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceInformationComponent } from './invoice-information/invoice-information.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InvoiceDataService } from './service/invoiceData.service';
import { AmountInWordsPipe } from './invoice-information/amount-in-words.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateInvoiceComponent,
    InvoiceInformationComponent,
    HomeComponent,
    HeaderComponent,
    AmountInWordsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbCardModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbButtonGroupModule,
    FormsModule,
    NbButtonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [InvoiceDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
