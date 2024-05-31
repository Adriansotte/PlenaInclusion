import { Component, OnInit } from '@angular/core';
import { environments } from 'src/environments/environments';

declare var google: any;

@Component({
  selector: 'app-google-auth-btn',
  templateUrl: './google-auth-btn.component.html',
  styleUrls: ['./google-auth-btn.component.css']
})
export class GoogleAuthBtnComponent implements OnInit {
  client_id: string = environments.client_id;

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.client_id,
      callback: (response: any) => {
        this.handleLoggin(response.credential)
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
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  handleLoggin(credential: any) {
    if (credential) {
      const payload = this.decodeToken(credential);
      console.log(payload);
    }
  }

  // handleCredentialResponse(response: any) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   // Aquí puedes manejar la respuesta del token, por ejemplo, enviarlo a tu backend para verificarlo
  // }
}
