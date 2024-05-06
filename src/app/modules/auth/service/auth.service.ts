import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, of } from 'rxjs';

const API_Admin_URL = `http://localhost:8000/user`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isLoadingSubject: BehaviorSubject<boolean>;
  private isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['login'], {
      queryParams: {},
    });
  }
  login(email: string, password: string){
    return this.http.post<any>(`${API_Admin_URL}/login`, {
      email,
      password,
    }).pipe(map((auth) => {
      this.isAuthenticated = true;
      if (auth && auth.data) {
        return auth.data;
      }
      return;
    }),
    catchError((err) => {
      return of(err.error);
    }),
    finalize(() => this.isLoadingSubject.next(false))
  );
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
