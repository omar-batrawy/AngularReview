import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../Product';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}
  displayStyle = 'none';
  showCustomerExistsModal: boolean = false;
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  product: product[] | undefined;
  selectedproduct: product = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  };
  async addNewProduct() {
    try {
      await this.apiService.addNewProduct(this.selectedproduct);
      this.closePopup();
      this.selectedproduct = {
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
      };
      this.products = await this.apiService.getAllproducts();
    } catch (error) {
      console.error(error);
      // if (error.status === 409) {
      //   this.showCustomerExistsModal = true;
      // }
    }
  }
  products: product[] = [];

  async ngOnInit() {
    this.products = await this.apiService.getAllproducts();
  }
}
