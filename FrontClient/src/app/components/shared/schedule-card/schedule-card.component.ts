import { Component, Input, Output, EventEmitter } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent {
  @Input() schedule: scheduleDTO | null = null;
  @Output() scheduleClicked = new EventEmitter<scheduleDTO>();

  date: Date = new Date();

  isCardDisabled(): boolean {
    if (this.schedule && this.schedule.FinishDate) {
      const finishDate = new Date(this.schedule.FinishDate);
      return finishDate < this.date;
    }
    return false;
  }

  onCardClick(): void {
    if (this.schedule && !this.isCardDisabled()) {
      this.scheduleClicked.emit(this.schedule);
    }
  }
}
