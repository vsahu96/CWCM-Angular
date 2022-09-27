import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snakeBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  loginForm!: FormGroup;
  submitted: boolean = false;
  isShowLoader: boolean = false;

  login() {
    this.submitted = true;
    this.isShowLoader = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.isShowLoader = false;
      return;
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);

  }
}
