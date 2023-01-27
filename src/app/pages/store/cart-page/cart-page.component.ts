import { CartUtil } from './../../../utils/cart.util';
import { Cart } from './../../../models/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  public cart: Cart = new Cart();
  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  public total() {
    let total = 0;
    this.cart.items.forEach((item) => (total += item.price * item.quantity));
    return total;
  }

  public loadCart() {
    this.cart = CartUtil.get();
  }

  public remove(item) {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }
}
