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
  // https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid={API key}

  getWeather = async (lat: any, lon: any, dt: any): Promise<any> => {
    try {
      const response = await this.httpClient
        .get<any>(
          `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=b60c6144910dcba70ec6e4958651a801`
        )
        .toPromise();

      const weather = response?.data[0];

      console.log(`Weather on ${dt}`, weather);
      return weather;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  };
}
