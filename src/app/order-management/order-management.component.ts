
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

   gridOptions: GridOptions;
   completedOrderNumber: number;
   pendingOrderNumber: number;
   cancelledOrderNumber: number;
   oneDay: number;

   itemStatusList: Array<any>;
  constructor(private http: HttpClient) {

    this.gridOptions = {} as GridOptions;
    this.oneDay =  24*60*60*1000;
    this.gridOptions.columnDefs = [
      { headerName: 'Item ID', field: 'itemId' },
      { headerName: 'Address', field: 'address' },
      { headerName: 'Ordered Time',
        field: 'orderedTime',
        cellRenderer: this.renderOrderTimeColumn.bind(this),
      },
      {
        headerName: 'Status/Action', field: 'status',
        cellClass: ['cellClassCss'],
        cellRenderer: this.renderStatusColumn.bind(this)
      }
    ];

    this.gridOptions.rowData = [{
      customerName: 'Govil',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'ASR23DR',
      orderedTime: '1562092200000',
      status: 'new'
    },
    {
      customerName: 'Sanjay',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'AS2f53DR',
      orderedTime: '1562233127000',
      status: 'cancelled'
    },
    {
      customerName: 'Sanjeev',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'ASDSDF34',
      orderedTime: '1561939200000',
      status: 'accepted'
    },
    {
      customerName: 'Himanshu',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'AS2f123F',
      orderedTime: '1562233127000',
      status: 'intransit'
    },
    {
      customerName: 'Yujveer',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'PGRF23DR',
      orderedTime: '1562233127000',
      status: 'completed'
    },
    {
      customerName: 'rohan',
      email: 'abc.abc@gmail.com',
      address: '123 Enclave, Dubai',
      contactNumber: 999999999,
      itemId: 'ROHF53DR',
      orderedTime: '1562025600000',
      status: 'intransit'
    }
    ];
    this.itemStatusList = [
      { index: 0, name: 'completed', value: (this.completedOrderNumber / this.gridOptions.rowData.length) *100 , color: 'lightgreen' },
      { index: 1, name: 'pending', value: (this.pendingOrderNumber / this.gridOptions.rowData.length) *100, color: 'lightskyblue' },
      { index: 2, name: 'cancelled', value: (this.cancelledOrderNumber / this.gridOptions.rowData.length) *100, color: 'red' }
    ];
  }

/*
 Here MockAPI's are called just to demostrate the use of observables with the call of
 API and update of data accordingly. However, using static JSON is very convenient to add, update
 the rowData and display accordingly.
 MockAPI's are hardcoded and will yield same results everytime as they are being configured.
 Please refer 'https://beeceptor.com/console/pizzaorder#' for all mocking rules made.
*/

  ngOnInit() {
    // this.http.get('https://pizzaorder.free.beeceptor.com/api/pizzaorders')
    // .subscribe((response: any) => {
    //   this.gridOptions.rowData = response;
    this.numberOfOrders(this.gridOptions.rowData);
    // });
  }

  renderStatusColumn(params: any): string {
    switch (params.value) {
      case 'new':
        return `<label value="accept" class="accept">Accept</label>
        <label value="cancel" class="reject">Cancel</label>`;
      case 'intransit':
        return `<label class="inTransit">In-Transit</label><label value="complete" class="markComplete"
        >Mark as Completed</label>`;

      case 'accepted':
        return `<label>Accepted</label>
        <label value="complete" class="markComplete">Mark as Completed</label>`;

      case 'completed':
        return '<label class="completed">Completed</label>';

      default:
        return '<label class="cancelled">Cancelled</label>';

    }
  }

  renderOrderTimeColumn(params: any): string{
    const today = new Date();
    const orderTimeDate = new Date( parseInt(params.value));

    return `${Math.round(Math.abs((today.getTime() - orderTimeDate.getTime())/(this.oneDay)))}  days ago`;

  }

  cancelOrder(index: number, data: any): any {
    const { itemId } = data;
    this.http.put('https://pizzaorder.free.beeceptor.com/api/pizzaorders/cancelled/ASR23DR', data)
      .subscribe((response: any) => {
        this.gridOptions.api.setRowData(response);
        this.numberOfOrders(response);
      });
  }

  acceptedOrder(index: number, data: any): any {
    const { itemId } = data;
    this.http.put('https://pizzaorder.free.beeceptor.com/api/pizzaorders/accepted/ASR23DR', data)
      .subscribe((response: any) => {
        this.gridOptions.api.setRowData(response);
        this.numberOfOrders(response);
      });
  }

  completedOrder(index: number, data: any): any {
    const { itemId } = data;
    this.http.put('https://pizzaorder.free.beeceptor.com/api/pizzaorders/completed/ASDSDF34', data)
      .subscribe((response: any) => {
        this.gridOptions.api.setRowData(response);
        this.numberOfOrders(response);
      });
  }

  updateItemList(completed: number, pending: number, cancelled: number): void{
    this.itemStatusList.map(item => {
        item.value = (arguments[item.index] / this.gridOptions.rowData.length) * 100;
    });
  }

  numberOfOrders(data: any[]): void {
    this.completedOrderNumber = data && data.filter((item) => item.status === 'completed').length;
    this.pendingOrderNumber = data && data.filter((item) => item.status === 'intransit'
    || item.status === 'accepted' || item.status === 'new' ).length;
    this.cancelledOrderNumber = data && data.filter((item) => item.status === 'cancelled').length;
    this.updateItemList( this.completedOrderNumber, this.pendingOrderNumber, this.cancelledOrderNumber);
    }


  onCellClicked(event: any, index: number): void {
    const { rowIndex, data } = event;
    if (event.event.target.attributes[0].value === 'accept') {
      this.acceptedOrder(rowIndex, data);
    } else if (event.event.target.attributes[0].value === 'cancel') {
      this.cancelOrder(rowIndex, data);
    } else if (event.event.target.attributes[0].value === 'complete') {
      this.completedOrder(rowIndex, data);
    } else {
      // do something here...
    }
  }

}