import { Component, Input } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent {
  @Input() schedule: scheduleDTO | null = null;
}
