import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DefaultProfileService {

  constructor(private http: HttpClient) { }

  getDefaultProfileImage(): Observable<string> {
    return this.http.get<any>('http://localhost:3000/api/storage/ed6d99c3-0647-417b-8f9b-8f458fe15135').pipe(
      map((response: any) => response.data.url)
    );
  }

}
