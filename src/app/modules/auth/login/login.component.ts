import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { loginValidation } from '../validation/login.validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginValidation],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.setErrors({
        ...this.loginForm.errors,
        yourErrorName: true,
      });
      return;
    }
    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((user) => {
        if (user.data.token) {
          this.snackBar.open(user.message, '', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          localStorage.setItem('token', user.data.token);
          this.router.navigate(['movie']);
        }
        if(user.message){
          this.snackBar.open(user.message, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
        else {
          this.snackBar.open('Something was wrong.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      })

  }
}
