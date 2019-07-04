import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { CustomizedPizzaComponent } from './order/customized-pizza/customized-pizza.component';
import { PizzaSummaryComponent } from './order/pizza-summary/pizza-summary.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    OrderManagementComponent,
    CustomizedPizzaComponent,
    PizzaSummaryComponent,
    StatusBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AgGridModule.withComponents([]),
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
