import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { UserDTO } from 'src/app/models/user/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.url}/api/users/${userId}`);
  }
}
