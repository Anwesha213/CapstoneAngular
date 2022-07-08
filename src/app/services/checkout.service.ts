import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icheck } from '../icheck';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  addDetail(details: Icheck) {
    let url = "https://localhost:44307/api/AddressDetails";
    this.http.post(url, details).subscribe(result => console.log("Data Send To DataBase"));
  }
}
