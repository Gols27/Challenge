import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { findIndex } from 'rxjs/operators';
@Component({
  selector: 'app-customized-pizza',
  templateUrl: './customized-pizza.component.html',
  styleUrls: ['./customized-pizza.component.css']
})
export class CustomizedPizzaComponent implements OnInit {

  constructor() { }
  @Input() pizza: any;
  @Input() pIndex: number;
  @Output() pizzaCustomized = new EventEmitter<any>();
  pizzzaObj: any;
  ngOnInit() {
    this.pizzzaObj = {pIndex: this.pIndex, pizza: this.pizza};
  }

  toppingSelected(pIndex: number, type: string): void {
    const elemFound =  this.pizza.toppings.findIndex(topping => topping === type);
    if (elemFound === -1) {
      this.pizza.toppings.push(type);
    } else {
      this.pizza.toppings.splice(elemFound, 1);
    }
    this.pizzzaObj.pizza = this.pizza;
    this.pizzaCustomized.emit(this.pizzzaObj);
  }


  sizeSelected(size: string): void {
    this.pizza.size = size;
    this.pizzzaObj.pizza = this.pizza;
    this.pizzaCustomized.emit(this.pizzzaObj);
  }

}
