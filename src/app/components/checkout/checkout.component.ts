import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
// import { Router } from 'express';
import { Icheck } from 'src/app/icheck';
import { IProduct } from 'src/app/iproduct';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private checkout:CheckoutService, private router:Router) { }

  checkoutdata:any[]=[];
  grandTotal:number=0;

  FullName : FormControl = new FormControl("");
  Email : FormControl = new FormControl("");
  Address : FormControl = new FormControl("");
  City : FormControl = new FormControl("");
  ZipCode : FormControl = new FormControl("");
  State : FormControl = new FormControl("");
  
  ngOnInit(): void 
  {
   this.cartService.checkoutlist.subscribe(res=>{
    let data:any[]=res;
    
    if(data.length>0)
    {
      this.checkoutdata=data
    }
    else
    {
      this.checkoutdata=[]
    }
    console.log("checkoutdata",this.checkoutdata)
    this.calculatePrice()})
  }

  saveOrder(){
    let details: Icheck={
      FullName:this.FullName.value,
      Email:this.Email.value,
      Address:this.Address.value,
      City:this.City.value,
      State:this.State.value,
      ZipCode:parseInt(this.ZipCode.value)
    };
    this.checkout.addDetail(details);
    this.router.navigate(['/orderdetails']);
    alert("Submit Data")
  }
  removeItem(item:IProduct)
  {
    this.cartService.removeCartItem(item)
  }
  
  calculatePrice(){
    if(this.checkoutdata.length>0)
    {
  this.grandTotal=this.checkoutdata.map(pr=>parseInt(pr.productTotal)).reduce((prev,curr)=>{
      return prev+curr
    })
  }
}
}
