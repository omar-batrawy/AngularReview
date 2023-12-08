import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-testcard',
  templateUrl: './testcard.component.html',
  styleUrls: ['./testcard.component.css'],
})
export class TestcardComponent {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: any;
  address?: string;
  disable?: boolean = true;
  isEmpty = (value: any) => value === '' || value === undefined;
  @Output() dataEmitted = new EventEmitter<any>();

  emitData(data: any) {
    this.dataEmitted.emit(data);
  }

  onsSubmit() {
    if (
      !this.firstname ||
      !this.lastname ||
      !this.email ||
      !this.phone ||
      !this.address
    ) {
      console.error('Please fill out all fields');
      console.log('name', this.firstname);
      console.log('lastname', this.lastname);
      console.log('email', this.email);
      console.log('phone', this.phone);
      console.log('address', this.address);
    } else {
      console.log('Form Submitted');
      alert('Form Submitted');
      this.emitData({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        address: this.address,
      });
      console.log('name', this.firstname);
      console.log('lastname', this.lastname);
      console.log('email', this.email);
      console.log('phone', this.phone);
      console.log('address', this.address);
    }
  }
  emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  validateEmail(): void {
    if (!this.emailRegex.test(this.email || '')) {
      // Display error message or highlight the input field
      console.error('Invalid email address');
    }
  }
}
