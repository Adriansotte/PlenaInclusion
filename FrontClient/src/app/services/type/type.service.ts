import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { typeDTO } from 'src/app/models/type/typeDTO';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<typeDTO[]> {
    return this.http.get<typeDTO[]>(`${this.url}/api/types`);
  }
}
