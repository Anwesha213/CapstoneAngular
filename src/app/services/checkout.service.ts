import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../icart';
import { Icheck } from '../icheck';
import { IProduct } from '../iproduct';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  addDetail(details: Icheck) {
    let url = "https://localhost:44308/api/AddressDetails";
    this.http.post(url, details).subscribe(result => console.log("Data Send To DataBase"));
  }
  addCartDetail(details: ICart) {
    let url = "https://localhost:44308/api/Carts";
    this.http.post(url, details).subscribe(result => console.log("Data Send To DataBase"));
  }
}
