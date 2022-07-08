import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../iproduct';


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }


  getData(): Observable<IProduct[]> {
    let url = "https://localhost:44307/api/products"
    return this.http.get<IProduct[]>(url);
  }

  // addDetail(details: IProduct) {
  //   let url = "https://localhost:44307/api/products"
  //   this.http.post(url, details).subscribe(result => console.log("Data Send To DataBase"));
  // }
}

