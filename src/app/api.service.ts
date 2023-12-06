import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from './Product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  PHP_API_SERVER = 'https://fakestoreapi.com';

  getAllproducts = async () => {
    let products: any = await this.httpClient
      .get<product[]>(`${this.PHP_API_SERVER}/products`)
      .toPromise();
    console.log(products);
    return products;
  };
}
