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
    Photo: undefined,
    DNI_tutor: '',
    Adress: '',
    Phone: '',
    BirthDay: ''
  };

  constructor(private registerService: RegisterService) { }

  onSubmit(user: registerUserDTO) {
    this.registerService.registerUser(user)
      .subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente:', response);
          // Lógica adicional después de registrar el usuario
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          // Manejo de errores
        }
      });
  }
}
