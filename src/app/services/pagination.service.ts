import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private httpService: HttpClient) { }
  getData() {
    return this.httpService.get('https://localhost:44307/api/products');
  }
}


