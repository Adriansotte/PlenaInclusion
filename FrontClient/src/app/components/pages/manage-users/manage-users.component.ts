import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/userDTO';
import { UserService } from 'src/app/services/user/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: UserDTO[] = [];
  selectedUser: UserDTO | null = null;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: UserDTO[]) => {
        this.users = response;
      },
      error: () => {

      }
    })
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onUserClicked(user: UserDTO): void {
    this.selectedUser = user;
    const modalElement = document.getElementById('userInfoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
