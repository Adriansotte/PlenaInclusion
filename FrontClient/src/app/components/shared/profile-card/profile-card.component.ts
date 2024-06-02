import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  userProfile: UserDTO | undefined = undefined;

  constructor(private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = JSON.parse(sessionStorage.getItem("user")!).ID_user;
    this.userService.getUserById(userId).subscribe({
      next: (response: UserDTO) => {
        this.userProfile = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  signOut() {
    this.authService.signOut();
  }

}

