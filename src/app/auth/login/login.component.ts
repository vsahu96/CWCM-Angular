import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  isLoggedIn: boolean = false;

  login() {
    this.isLoggedIn = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

}
