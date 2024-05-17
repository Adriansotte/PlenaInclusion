import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { registerUserDTO } from 'src/app/models/user/createUserDTO';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  user: any = {};
  selectedFile: File | undefined;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    formData.append('DNI', this.user.DNI);
    formData.append('Rol', this.user.Rol);
    formData.append('Name', this.user.Name);
    formData.append('Surname_1', this.user.Surname_1);
    formData.append('Surname_2', this.user.Surname_2);
    formData.append('Email', this.user.Email);
    formData.append('Pass', this.user.Pass);

    if (this.selectedFile) {
      formData.append('myfile', this.selectedFile);
    }

    this.http.post<any>('http://localhost:3000/api/auth/register', formData).subscribe(
      (response) => {
        console.log(response);
        // Maneja la respuesta del servidor aquí
      },
      (error) => {
        console.error(error);
        // Maneja los errores aquí
      }
    );
  }
}
