import { Component, OnInit } from '@angular/core';
import { StatusBarComponent } from '../status-bar/status-bar.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  onTimeDeliveryStatus: Array<any>;
  lateDeliveryStatus: Array<any>;
  constructor() { }

  ngOnInit() {
    this.onTimeDeliveryStatus = [{name: 'onTime', value: 29.7, color: 'green'}];
    this.lateDeliveryStatus = [{name: 'late', value: 53.4, color: 'red'}];
  }

}
