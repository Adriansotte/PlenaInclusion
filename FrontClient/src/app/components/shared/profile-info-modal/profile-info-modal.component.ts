import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';

@Component({
  selector: 'app-profile-info-modal',
  templateUrl: './profile-info-modal.component.html',
  styleUrls: ['./profile-info-modal.component.css']
})
export class ProfileInfoModalComponent {

  @Input() selectedUser: UserDTO | null = null;
}
