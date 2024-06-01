import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { environments } from 'src/environments/environments';

declare var google: any;

@Component({
  selector: 'app-google-auth-btn',
  templateUrl: './google-auth-btn.component.html',
  styleUrls: ['./google-auth-btn.component.css']
})
export class GoogleAuthBtnComponent implements OnInit {

  client_id: string = environments.client_id;

  constructor(private loginService: LoginService) { }

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
        width: AUTO_STYLE
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
      this.loginService.googleLogin(payload).subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }

}
