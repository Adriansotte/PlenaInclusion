import { Component } from '@angular/core';
import { loginUserDTO } from 'src/app/models/user/loginUserDTO';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  user: loginUserDTO = {
    Email: '',
    Pass: '',
  };

  isValidEmail: boolean = false;
  isPasswordValid: boolean = false;

  submitForm() {

  }

  onEmailChange(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
    if (emailRegex.test(value)) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }

  // Función para validar la contraseña y actualizar isPasswordValid
  isValidPassword(value: string): void {
    this.isPasswordValid = value.length >= 5 && value.length <= 20;
  }
}
