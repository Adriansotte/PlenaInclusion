import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: UserDTO[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: UserDTO[]) => {
        this.users = response;
      },
      error: () => {

      }
    })
  }

}
