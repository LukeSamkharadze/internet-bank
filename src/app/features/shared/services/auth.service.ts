import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Fullname requirements: Only Latin letters and symbols (,.'-).
  fullnamePattern = /^[^\s]+( [^\s]+)+$/;
  // Email requirements: any valid email patern 'x@x.xx'.
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Password requirements: min 8 characters, numbers or symbols. Max 30 characters, numbers or symbols.
  passwordPattern = /^[A-Za-z\d#$@!%&*?]{8,50}$/;
  usersArr: IUser[];
  user: IUser;

  get userId() {
    return localStorage.getItem('userId');
  }

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAll().subscribe((users) => (this.usersArr = users));
  }

  // Check if User exists
  loginCheck(loginData: { email: string; password: string }): boolean {
    return this.usersArr.some(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
  }

  // If User exists return observable with its id and email
  login(loginData: { email: string; password: string }) {
    if (this.loginCheck(loginData)) {
      this.user = this.usersArr.find((obj) => obj.email === loginData.email);
      return of({ userId: this.user.id, userEmail: this.user.email });
    }
  }

  // Check if User is logged in
  userIsLoggedIn(): boolean {
    const uid = localStorage.getItem('userId');
    return uid ? true : false;
  }

  // Check if email is already registered
  checkEmailUniqueness(email: string): boolean {
    return this.usersArr.every((user) => user.email !== email);
  }

  // Remove user Id from localStorage on Logout and navigate to 'Login'
  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
