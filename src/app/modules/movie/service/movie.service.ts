import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, of } from 'rxjs';

const API_Admin_URL = `http://localhost:8000/movie`;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  isLoadingSubject: BehaviorSubject<boolean>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  getMovie(pageSize: number, pageNumber: number){
    return this.http.get<any>(`${API_Admin_URL}/movie?pageNumber=` +pageNumber+`&pageSize=`+pageSize).pipe(map((movie) => {
      if (movie && movie.data) {
        return movie.data;
      }
      return;
    }),
    catchError((err) => {
      return of(err.error);
    }),
    finalize(() => this.isLoadingSubject.next(false))
    );
  }

  favourite(title: string){
    return this.http.post<any>(`${API_Admin_URL}/fav`,{
      movieTitle: title
    }).pipe(map((fav) => {
      if (fav && fav.data) {
        return fav.data;
      }
      return;
    }),
    catchError((err) => {
      return of(err.error);
    }),
    finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
