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
  products: product[] = [];
  constructor(private apiService: ApiService) {}
  async ngOnInit() {
    this.products = await this.apiService.getAllproducts();
  }
}
