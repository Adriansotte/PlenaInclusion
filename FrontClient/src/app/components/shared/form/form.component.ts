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
    ConfirmPass: '',
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

  isDNICorrect() {
    return this.user.DNI && this.user.DNI.length === 9;
  }

  isValidDate = false;

  validateDate() {
    const userDate = new Date(this.user.BirthDay);
    const currentDate = new Date();

    if (userDate > currentDate) {
      alert('La fecha de nacimiento no puede ser una fecha futura.');
      this.isValidDate = false;
    } else {
      this.isValidDate = true;
    }
  }


  onInputChange(value: string) {
    // Realizar validaciones adicionales o acciones específicas
    console.log('El valor del campo de entrada ha cambiado:', value);
    // Puedes agregar más lógica aquí según sea necesario
  }

  isValidInput(value: string): boolean {
    return value.trim() !== '';
  }

  isValidEmail: boolean = false;

  onEmailChange(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
    if (emailRegex.test(value)) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }
}

