import { Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import { PizzaSummaryComponent } from './pizza-summary/pizza-summary.component';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public pizzaList: any;
  private count = 0;
  public totalCost = 0;
  placeOrderForm: FormGroup;
  name: string;
  address: string;
  email: string;
  contactNum: number;
  customerOrderArray: any = [];
  customerDetails: any;
  @ViewChildren(PizzaSummaryComponent)
  summary: QueryList<PizzaSummaryComponent>;
  sizeMap = {
    L: {name: 'Large Pizza', price: 13},
    M: {name: 'Medium Pizza', price: 10},
    S: {name: 'Small Pizza', price: 5}};
  constructor(private formBuilder: FormBuilder) {
    this.placeOrderForm = formBuilder.group({
      name: ['',Validators.required],
      address: ['',Validators.required],
      email: ['',Validators.required],
      contactNum: ['',[Validators.required,Validators.maxLength(10)]] ,
    })
  }

  ngOnInit() {
    this.pizzaList = [{pizzaId: ++this.count, size: '', toppings: [], prize: 0}];
  }

  addPizza() {
    this.pizzaList.push({pizzaId: ++this.count, size: '', toppings: [], price: 0});
  }

  pizzaChanged(pizzaObj) {
    this.totalCost = 0;
    this.pizzaList[pizzaObj.pIndex] = pizzaObj.pizza;
    this.summary['_results'][pizzaObj.pIndex].pizzaModified();
    this.pizzaList.forEach(element => {
        if(element.size){
        this.totalCost = this.totalCost + this.sizeMap[element.size].price;
        element.toppings.forEach(topping => {
          this.totalCost = this.totalCost + 0.99;
        });
      }
    });
  }

  placeOrder(placeOrderForm: any){

    this.customerOrderArray = [];
    this.name = placeOrderForm.controls.name.value;
    this.email = placeOrderForm.controls.email.value;
    this.address = placeOrderForm.controls.address.value;
    this.contactNum =  placeOrderForm.controls.contactNum.value;
    this.customerDetails = {
      name: this.name,
      email: this.email,
      address: this.address,
      contactNumber: this.contactNum
    }
    if(this.pizzaList && this.pizzaList.length>0 && this.pizzaList[0].name){
      this.customerOrderArray.push({'pizzaList': this.pizzaList});
    }
    if(this.totalCost){
      this.customerOrderArray.push({'totalCost': this.totalCost});
    }

    this.customerOrderArray.push({'customerDetails': this.customerDetails})


    if (this.customerOrderArray.length === 3) {
  // make an post observable call to backend with customerOrderArray to store the details in the DB.
  // Not using static JSON , sample post call below
  // this.http.post('...url', customerOrderArray)
  //  .subscribe((response: any) => {
  //     this.successMessage = respone.message; // response.message = 'Your order has been placed successfully'
  //   },error => {
  //    // do something here
  // });
    }
  }

}
