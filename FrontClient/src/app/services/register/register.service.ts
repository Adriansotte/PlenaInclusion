import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registerUserDTO } from '../../models/user/createUserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: registerUserDTO, file: File | undefined): Observable<any> {
    const formData = new FormData();
    formData.append('DNI', user.DNI);
    formData.append('Rol', user.Rol);
    formData.append('Name', user.Name);
    formData.append('Pass', user.Pass);
    formData.append('Surname_1', user.Surname_1);
    formData.append('Surname_2', user.Surname_2);
    formData.append('Email', user.Email);
    formData.append('DNI_tutor', user.DNI_tutor);
    formData.append('Adress', user.Adress);
    formData.append('Phone', user.Phone);
    formData.append('BirthDay', user.BirthDay);

    if (file) {
      console.log(file)
      formData.append('Photo', file);
    }

    return this.http.post<any>('http://localhost:3000/api/auth/register?', formData);
  }
}
