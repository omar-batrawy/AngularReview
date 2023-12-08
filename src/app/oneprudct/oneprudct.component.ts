import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../Product';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-oneprudct',
  templateUrl: './oneprudct.component.html',
  styleUrls: ['./oneprudct.component.css'],
})
export class OneprudctComponent implements OnInit {
  product: product = {};
  id!: number; // Change to non-nullable type

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.activatedRoute.snapshot.params['id']; // Extract ID from routing parameter
    this.product = await this.apiService.getoneproduct(this.id);
    console.log(this.product);
  }
}
