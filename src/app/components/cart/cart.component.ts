import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product: any[] = [];
  public grandTotal!: number;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        let data: any[] = res;

        if (data.length > 0) {

          this.product = data.map(item => {
            return {
              "productName": item.productName,
              "productCategories": item.productCategories,
              "productDescription": item.productDescription,
              "productId": item.productId,
              "productImage": item.productImage,
              "productPrice": item.productPrice,
              "productTotal": parseInt(item.productPrice),
              "productQuantity": 1
            }
          })
          this.cartService.addCheckoutList(this.product)
        }
        else {
          this.product = []
          this.cartService.addCheckoutList(this.product)
        }
        this.calculatePrice()
      })
  }

  //For Quantity
  removeQuantity(item: IProduct) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].productId === item.productId) {
        this.product[i]['productTotal'] -= parseInt(item.productPrice)
        this.product[i]['productQuantity'] -= 1
        if (this.product[i]['productQuantity'] == 0) {
          this.removeItem(item)
        }
      }
    }
    this.calculatePrice()
  }

  addQuantity(item: IProduct) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].productId === item.productId) {
        this.product[i]['productTotal'] += parseInt(item.productPrice)
        this.product[i]['productQuantity'] += 1
      }
    }
    this.calculatePrice()
  }

  removeItem(item: IProduct) {
    this.cartService.removeCartItem(item)
  }
  emptycart() {
    this.calculatePrice()
    this.cartService.removeAllCart();
  }
  calculatePrice() {
    if (this.product.length > 0) {
      this.grandTotal = this.product.map(pr => parseInt(pr.productTotal)).reduce((prev, curr) => {
        return prev + curr
      })
    }
  }
}