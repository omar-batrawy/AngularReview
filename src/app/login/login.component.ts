import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(private router: Router) {}
  onSubmit() {
    localStorage.setItem('username', this.loginForm.value.username);
    this.router.navigate(['']);
  }
}
