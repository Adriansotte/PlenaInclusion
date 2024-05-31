import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-auth-btn',
  templateUrl: './google-auth-btn.component.html',
  styleUrls: ['./google-auth-btn.component.css']
})
export class GoogleAuthBtnComponent implements OnInit {

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '562380291200-abf1rofqn5kjjdlohfj45nhro3obdl7c.apps.googleusercontent.com',
      callback: (response: any) => {
        console.log(response)
      }
    });
    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      }
    );
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token).split('.')[1])
  }

  handleLoggin(response: any) {
    if (response) {

    }
  }

  // handleCredentialResponse(response: any) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   // Aquí puedes manejar la respuesta del token, por ejemplo, enviarlo a tu backend para verificarlo
  // }
}
