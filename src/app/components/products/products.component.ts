import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  result: IProduct[] = [];
  public filterproductCategories: any;
  searchKey: string = "";
  filterCategory: any;
  showMsg = false;
  showErrMsg = false;

  constructor(private api: ApiService, private cartService: CartService, private pagination: PaginationService) { }

  ngOnInit(): void {
    this.api.getData().subscribe((data: IProduct[]) => {
      console.log(data);
      this.result = data;
      this.filterproductCategories = data;
      // for cart use--
      this.result.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.Price })
      });
      console.log(this.result);
    });
    this.cartService.search.subscribe((data: any) => {
      this.searchKey = data;
    })
  }

  // for cart

  addtocart(cart: IProduct) {
    if (!this.cartService.cartItemList.includes(cart)) {
      this.cartService.addtoCart(cart);
      this.showMsg = true;
      setTimeout(() => { this.showMsg = false }, 1000)
    }

    else if (!this.cartService.hasReachedMaxQuantity(cart)) {
      this.cartService.incrementQuantity(cart);
      this.showMsg = true;
      setTimeout(() => { this.showMsg = false }, 1000)
    }

    else {
      this.showErrMsg = true;
      setTimeout(() => { this.showErrMsg = false }, 1000)
    }
  }

  //For Categories
  filter(productCategories: string) {
    this.filterproductCategories = this.result.filter((a: any) => {
      if (a.productCategories == productCategories || productCategories == '')
        return a;
    })
  }

  //Pagination
  p: any;
  getData() {
    this.pagination.getData().subscribe(
      (data) => {
        this.filterCategory = data;
      }
    );
  }
}

