import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private apiUrl = 'http://localhost:3000'; // URL del servidor Express

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/google`);
  }

  addUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/addUser`);
  }

  // Puedes agregar más métodos según las necesidades de tu aplicación
}
