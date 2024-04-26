import { Component } from '@angular/core';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {

  constructor(private pruebaService: PruebaService) { }

  registrarConGoogle(): void {
    this.pruebaService.authenticateWithGoogle();
  }

  recogerDatos() : void{
    console.log(this.pruebaService.getData());
  }


  // getUsers() {
  //   this.pruebaService.getUsers().subscribe(
  //     (response: any) => {
  //       console.log('Usuarios:', response);
  //     },
  //     (error) => {
  //       console.error('Error obteniendo usuarios:', error);
  //     }
  //   );
  // }

  // addUser() {
  //   const userData = { /* datos del usuario a agregar */ };
  //   this.pruebaService.addUser().subscribe(
  //     (response: any) => {
  //       console.log('Usuario agregado:', response);
  //     },
  //     (error) => {
  //       console.error('Error agregando usuario:', error);
  //     }
  //   );
  // }

  // Puedes agregar más métodos según sea necesario para llamar a otros servicios
}
