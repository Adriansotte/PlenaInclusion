import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registerUserDTO } from 'src/app/models/user/createUserDTO';
import { RegisterService } from 'src/app/services/register/register.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

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

  defaultProfileImageUrl: string = "";

  constructor(private registerService: RegisterService,
    private defaultProfileService: DefaultProfileService,
    private router: Router) { }


  ngOnInit(): void {
    this.defaultProfileService.getDefaultProfileImage().subscribe({
      next: (imageUrl: string) => {
        this.defaultProfileImageUrl = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      }
    });
  }

  archivoInsertado: boolean = false;
  archivoInsertadoValid: boolean = true;
  imagenMostrada: any;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {

      this.archivoInsertadoValid = true;
      this.Photo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenMostrada = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      this.archivoInsertadoValid = false;
      this.imagenMostrada = null;
    }

    this.archivoInsertado = true;
  }

  submitForm(): void {
    this.registerService.registerUser(this.user, this.Photo).subscribe({
      next: (response) => {
        if (response && response.token && response.user) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('ID_User', response.data.user.ID_user);
          sessionStorage.setItem('Email', response.data.user.Email);
          sessionStorage.setItem('Name', response.data.user.Name);
          sessionStorage.setItem('Surname_1', response.data.user.Surname_1);
          sessionStorage.setItem('Surname_2', response.data.user.Surname_2);
          sessionStorage.setItem('Rol', response.data.user.Rol);
        }
      },
      error: (error) => {
        console.error('Error en el registro', error);
      },
      complete: () => {
        this.navigateToHome();
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['home'])
  }


  isDNIValid: boolean = false;
  isRolSelected: boolean = false;
  isValidDate: boolean = false;
  isNameEntered: boolean = false;
  isSurname1Entered: boolean = false;
  isSurname2Entered: boolean = false;
  isValidEmail: boolean = false;
  isValidAdress: boolean = false;
  isValidPhone: boolean = false;
  isPasswordValid: boolean = false;
  passwordsMatch: boolean = false;
  confirmPassValid: boolean = false;

  // Función que valida el DNI
  isDNICorrect(): boolean {
    this.isDNIValid = this.user.DNI.length === 9;
    return this.isDNIValid;
  }

  // Función que se llama cuando se cambia el valor del DNI
  onDNIInputChange(): void {
    this.isDNICorrect();
  }


  // Función que valida si se ha seleccionado un rol
  isRolValid(): boolean {
    this.isRolSelected = this.user.Rol !== '';
    return this.isRolSelected;
  }


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

  // Función que valida el nombre y actualiza isNameEntered
  isValidName(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isNameEntered = value.trim() !== '' && isValid;
    return isValid;
  }


  // Función que valida el primer apellido y actualiza isSurname1Entered
  isValidSurname1(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isSurname1Entered = value.trim() !== '' && isValid;
    return isValid;
  }

  // Función que valida el segundo apellido y actualiza isSurname2Entered
  isValidSurname2(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isSurname2Entered = value.trim() !== '' && isValid;
    return isValid;
  }

  isValidInput(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value.trim());
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

  checkPasswords(): void {
    this.passwordsMatch = this.user.Pass === this.user.ConfirmPass;
    this.confirmPassValid = this.passwordsMatch && this.user.ConfirmPass !== '';
  }


  isValidInputAdress(value: string): boolean {
    const regex = /^[a-zA-Z0-9\s]+$/;
    this.isValidAdress = regex.test(value.trim());
    return this.isValidAdress;
  }

  // Función que se llama cuando se cambia el valor de la dirección
  onAddressInputChange(value: string): void {
    this.isValidInputAdress(value);
  }


  isValidInputPhone(value: string): boolean {
    const regex = /^[0-9]{9}$/;
    this.isValidPhone = regex.test(value.trim());
    return this.isValidPhone;
  }

  // Función que se llama cuando se cambia el valor del teléfono
  onPhoneInputChange(value: string): void {
    this.isValidInputPhone(value);
  }

  dniTutorValido: boolean = false;

  validarDniTutor(): void {
    this.dniTutorValido = this.user.DNI_tutor.length === 9;
  }

  isAllFieldsValid(): boolean {
    return this.isDNIValid &&
      this.isRolSelected &&
      this.isValidDate &&
      this.isNameEntered &&
      this.isSurname1Entered &&
      this.isSurname2Entered &&
      this.isValidEmail &&
      this.isValidAdress &&
      this.isValidPhone &&
      this.isPasswordValid &&
      this.passwordsMatch &&
      this.confirmPassValid &&
      this.archivoInsertado &&
      this.archivoInsertadoValid;
  }

}

