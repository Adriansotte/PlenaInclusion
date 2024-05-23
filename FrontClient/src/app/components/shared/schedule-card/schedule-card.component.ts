import { Component, Input } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent {
  @Input() schedule!: scheduleDTO;
}