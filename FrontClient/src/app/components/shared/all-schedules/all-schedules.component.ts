import { Component, OnInit } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';

declare var bootstrap: any;


@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  schedules: scheduleDTO[] = [];
  selectedSchedule: scheduleDTO | null = null;

  constructor(private allSchedulesService: AllSchedulesService) { }

  ngOnInit(): void {
    this.handleSchedules();
  }

  handleSchedules(): void {
    this.allSchedulesService.listAllSchedules().subscribe({
      next: (data: scheduleDTO[]) => {
        this.schedules = data;
      },
      error: (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    });
  }

  onScheduleClicked(schedule: scheduleDTO): void {
    this.selectedSchedule = schedule;
    const modalElement = document.getElementById('scheduleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
