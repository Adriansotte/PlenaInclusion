import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private apiUrl = 'http://localhost:3000/auth/google';

  constructor(private http: HttpClient, private router: Router) { }

  authenticateWithGoogle(): void {
    console.log("Entra al servicio");
    this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        console.log("Me ha llegado una respuesta")
        if (response && response.status === 200) {
          console.log("Autenticación exitosa:", response);
        } else {
          throw new Error('Error de autenticación');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error al autenticar con Google:", error);
        return throwError(error);
      })
    ).subscribe();
  }

  getData(): boolean {
    const peticion = this.http.get<any>("http://localhost:3000/auth/google");
    let comprobacion = true;
    if(peticion) !comprobacion; 
    return comprobacion;
  }

}
