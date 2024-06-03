import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  
  @Input() user: UserDTO | null = null;


}
