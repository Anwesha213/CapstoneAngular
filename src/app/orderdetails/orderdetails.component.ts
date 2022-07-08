import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(private cartService: CartService, private checkout: CheckoutService) { }

  checkoutdata: any[] = [];
  grandTotal: number = 0;

  ngOnInit(): void {
    this.cartService.checkoutlist.subscribe(res => {
      let data: any[] = res;

      if (data.length > 0) {
        this.checkoutdata = data
      }
      else {
        this.checkoutdata = []
      }
      console.log("checkoutdata", this.checkoutdata)
      this.calculatePrice()
    })
  }
  removeItem(item: IProduct) {
    this.cartService.removeCartItem(item)
  }
  calculatePrice() {
    if (this.checkoutdata.length > 0) {
      this.grandTotal = this.checkoutdata.map(pr => parseInt(pr.productTotal)).reduce((prev, curr) => {
        return prev + curr
      })
    }
  }
}
