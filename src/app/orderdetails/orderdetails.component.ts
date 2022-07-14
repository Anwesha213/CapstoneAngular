import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ICart } from '../icart';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  result:IProduct[] = [];
  res:ICart[] =[];
  constructor(private cartService: CartService, private checkout: CheckoutService, private router: Router, private api: ApiService) { }

  checkoutdata: any[] = [];
  grandTotal: number = 0;
  productId:IProduct[]=[];


  ngOnInit(): void {
    this.api.getData().subscribe((data: IProduct[]) => {
      console.log(data);
      this.result = data;
    })
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

  placeOrder(){
    this.router.navigate(['/payment-details']);
    alert("Submit Data")
  }
  }

  // saveOrder(){
  //   if(this.productId == this.productId)
  //   {
  //     let d : IProduct[]={
      
  //     };
  //     this.checkout.addCartDetail(d);
  //     console.log("done");
  //   }
  //   else{
  //     console.log("not done");
  //   }
    
  // }
 
  // saveOrder(){
  //   let details: Icheck={
  //     FullName:this.FullName.value,
  //     Email:this.Email.value,
  //     Address:this.Address.value,
  //     City:this.City.value,
  //     State:this.State.value,
  //     ZipCode:parseInt(this.ZipCode.value)
  //   };
  //   this.checkout.addDetail(details);
  //   this.router.navigate(['/orderdetails']);
  //   alert("Submit Data")
  // }


