import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';

@Component({
  selector: 'app-user-schedule-modal',
  templateUrl: './user-schedule-modal.component.html',
  styleUrls: ['./user-schedule-modal.component.css']
})
export class UserScheduleModalComponent {
  @Input() userSchedule: userScheduleDTO | null = null;
  @Output() scheduleChange: EventEmitter<void> = new EventEmitter<void>();


}
