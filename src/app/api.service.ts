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

  getoneproduct = async (id: number): Promise<product> => {
    let oneproduct: any = await this.httpClient
      .get<product>(`${this.PHP_API_SERVER}/products/` + id)
      .toPromise();
    console.log(oneproduct);
    return oneproduct;
  };

  async addNewProduct(oneproduct: product): Promise<product[]> {
    try {
      const product: any = await this.httpClient
        .post<product[]>(
          `${this.PHP_API_SERVER}/products`,
          JSON.stringify(oneproduct)
        )
        .toPromise();
      console.log('Product added successfully:', product);
      return product;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
}
