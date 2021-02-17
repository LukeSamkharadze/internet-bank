import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
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
    // if (uid) {
    //   this.router.navigate(['/dashboard']);
    //   return true;
    // } else if (!uid) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return uid ? true : false;
  }

  // Check if email is already registered
  checkEmailUniqueness(email: string): boolean {
    return this.usersArr.some((user) => user.email === email);
  }
}
