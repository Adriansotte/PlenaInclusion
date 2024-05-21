import { Component } from '@angular/core';
import { loginUserDTO } from 'src/app/models/user/loginUserDTO';
import { LoginService } from 'src/app/services/login/login.service';

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
  loginError: string = '';

  constructor(private loginService: LoginService) { }

  submitForm() {
    if (this.isValidEmail && this.isPasswordValid) {
      this.loginService.loginUser(this.user).subscribe(
        response => {
          // Manejar la respuesta del servidor
          console.log('Login exitoso:', response);
        },
        error => {
          // Manejar errores
          console.error('Error de login:', error);
          this.loginError = 'Error al iniciar sesión. Por favor, intente de nuevo.';
        }
      );
    }
  }

  onEmailChange(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) && value.split('.').pop() === 'com') {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }

  isValidPassword(value: string): void {
    this.isPasswordValid = value.length >= 5 && value.length <= 20;
  }
}
