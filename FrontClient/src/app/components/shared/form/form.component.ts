import { Component } from '@angular/core';
import { registerUserDTO } from 'src/app/models/user/createUserDTO';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  user: registerUserDTO = {
    DNI: '',
    Rol: '',
    Name: '',
    Surname_1: '',
    Surname_2: '',
    Email: '',
    Pass: '',
    DNI_tutor: '',
    Adress: '',
    Phone: '',
    BirthDay: ''
  };
  Photo: File | undefined;

  constructor(private registerService: RegisterService) { }

  onFileSelected(event: any) {
    this.Photo = event.target.files[0];
  }

  submitForm() {
    this.registerService.registerUser(this.user, this.Photo).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
