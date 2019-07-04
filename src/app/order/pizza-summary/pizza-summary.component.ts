import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-summary',
  templateUrl: './pizza-summary.component.html',
  styleUrls: ['./pizza-summary.component.css']
})
export class PizzaSummaryComponent {

  constructor() { }
  @Input() pizza: any;
  @Input() pIndex: number;
  pizzaSelected: any;
  pizzaPrice: number;
  sizeMap = {
    L: {name: 'Large Pizza', price: 13},
    M: {name: 'Medium Pizza', price: 10},
    S: {name: 'Small Pizza', price: 5}};
  pizzaModified() {
    this.pizzaSelected = this.pizza;
    this.pizzaSelected.toppingList = [];
    if ( this.pizza && this.pizza.size) {
      this.pizzaSelected = Object.assign(this.pizza, this.sizeMap[this.pizza.size]);
    } else {
      this.pizzaSelected = this.sizeMap.M;
    }
    if (this.pizzaSelected && this.pizzaSelected.toppings && this.pizzaSelected.toppings.length !== 0) {
      this.pizzaSelected.toppings.forEach( topping => {
        this.pizzaSelected.toppingList.push({name: topping, price: 0.99});
      });
    }
  }

}




