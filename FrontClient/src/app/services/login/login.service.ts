import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginUserDTO } from 'src/app/models/user/loginUserDTO';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  loginUser(user: loginUserDTO): Observable<any> {
    const formData = new FormData();
    formData.append('Email', user.Email);
    formData.append('Pass', user.Pass);
    return this.http.post<any>(`${this.url}/api/auth/login`, formData);
  }

}
