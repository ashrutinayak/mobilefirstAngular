import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, of } from 'rxjs';

const API_Admin_URL = `http://localhost:8000/fav`;    
@Injectable({
  providedIn: 'root',
})
export class FavouriteService {

    isLoadingSubject: BehaviorSubject<boolean>;
    constructor(
      private http: HttpClient,
    ) {
    }
  
  getfavourite(pageSize: number, pageNumber: number){
    return this.http.get<any>(`${API_Admin_URL}/list?pageNumber=` +pageNumber+`&pageSize=`+pageSize
    ).pipe(map((data) => {
      if (data) {
        return data;
      }
      return;
    }),
    catchError((err) => {
      return of(err.error);
    }),
    finalize(() => this.isLoadingSubject.next(false))
  );
  }
  unfavourite(id: number){
    return this.http.get<any>(`${API_Admin_URL}/unfav/`+id).pipe(map((unfav) => {
      if (unfav && unfav.data) {
        return unfav.data;
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
