import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'order', component: OrderComponent},
  {path: 'ordermanagement', component: OrderManagementComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
