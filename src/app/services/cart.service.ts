import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: IProduct[] = []
  public productList = new BehaviorSubject<any>([]);
  public checkoutlist = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor() { }

  getProducts() {
    return this.productList.asObservable();

  }
  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: IProduct) {

    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);

  }

  incrementQuantity(product: IProduct) {
    const i = this.cartItemList.indexOf(product)
    this.cartItemList[i].quantity++;
  }

  decrementQuantity(product: IProduct) {
    const i = this.cartItemList.indexOf(product)
    this.cartItemList[i].quantity--;
  }

  hasReachedMaxQuantity(product: IProduct) {
    const i = this.cartItemList.indexOf(product)
    return this.cartItemList[i].quantity === 5
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: IProduct) {
    for (let i = 0; i < this.cartItemList.length; i++) {
      if (this.cartItemList[i].productId === product.productId) {
        this.cartItemList.splice(i, 1);
      }
    }
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  addCheckoutList(data: any) {
    this.checkoutlist.next(data)
  }
}
