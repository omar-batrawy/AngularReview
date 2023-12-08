import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() product: any;
  constructor(private router: Router) {}
  navigateTo = (url: string) => {
    this.router.navigate([url]);
  };
}
