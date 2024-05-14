import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registerUserDTO } from '../../models/user/createUserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // registerUser(user: registerUserDTO): Observable<any> {
  //   console.log(user)
  //   return this.http.post<any>('http://localhost:3000/api/auth/register', user);
  // }

  registerUser(user: registerUserDTO): Observable<any> {
    const formData = new FormData();
    formData.append('DNI', user.DNI);
    formData.append('Rol', user.Rol);
    formData.append('Name', user.Name);
    formData.append('Surname_1', user.Surname_1);
    formData.append('Surname_2', user.Surname_2);
    formData.append('Email', user.Email);
    formData.append('Pass', user.Pass);
    if (user.Photo) {
      formData.append('Photo', user.Photo);
      console.log(user.Photo)
    }
    formData.append('DNI_tutor', user.DNI_tutor);
    formData.append('Adress', user.Adress);
    formData.append('Phone', user.Phone);
    formData.append('BirthDay', user.BirthDay);

    return this.http.post<any>('http://localhost:3000/api/auth/register', formData);
  }
}
