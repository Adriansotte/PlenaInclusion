import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';

@Component({
  selector: 'app-user-schedule-card',
  templateUrl: './user-schedule-card.component.html',
  styleUrls: ['./user-schedule-card.component.css']
})
export class UserScheduleCardComponent {
  @Input() userSchedule: userScheduleDTO | null = null;
  @Output() userscehduleClicked = new EventEmitter<userScheduleDTO>();

  onCardClick(): void {
    if (this.userSchedule) {
      this.userscehduleClicked.emit(this.userSchedule);
    }
  }
}
