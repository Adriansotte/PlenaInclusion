import { AfterViewInit, Component } from '@angular/core';
import { loginUserDTO } from 'src/app/models/user/loginUserDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

declare var bootstrap: any; 

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements AfterViewInit  {

  user: loginUserDTO = {
    Email: '',
    Pass: '',
  };

  isValidEmail: boolean = false;
  isPasswordValid: boolean = false;
  loginError: string = '';

  constructor(private loginService: LoginService,
    private router: Router
  ) { }

  submitForm() {
    if (this.isValidEmail && this.isPasswordValid) {
      this.loginService.loginUser(this.user).subscribe({
        next: response => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        },
        error: error => {
          if (error.error.error == "USER_NOT_FOUND") {
            this.loginError = "Correo Equivocado";
          } else if (error.error.error == "INVALID_PASSWORD")
            this.loginError = "Contraseña Incorrecta";
        },
        complete: () => {
          this.router.navigate(['home'])
        }
      });
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

  ngAfterViewInit() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerEl = document.getElementById('tooltipButton');
    if (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    }
  }
}
