import { Component, OnInit } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';

declare var bootstrap: any;

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  schedules: scheduleDTO[] = [];
  selectedSchedule: scheduleDTO | null = null;
  userSchedules: userScheduleDTO[] = [];

  constructor(private allSchedulesService: AllSchedulesService,
    private userScheduleService: UserScheduleService
  ) { }

  ngOnInit(): void {
    this.handleUserSchedules();
    this.handleSchedules();
  }

  handleSchedules(): void {
    this.allSchedulesService.listAllSchedules().subscribe({
      next: (data: scheduleDTO[]) => {
        this.schedules = data.filter(schedule =>
          !this.userSchedules.some(userSchedule => userSchedule.ScheduleIDSchedule === schedule.ID_Schedule)
        );
      },
      error: (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    });
  }

  handleUserSchedules(): void {
    this.userScheduleService.listSchedulesByUser(sessionStorage.getItem('ID_User')).subscribe({
      next: (data: userScheduleDTO[]) => {
        this.userSchedules = data;
      },
      error: (error: any) => {
        console.error("Error al conseguir las actividades del usuario:", error);
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

  handleScheduleRegistered(): void {
    this.handleUserSchedules();
    this.handleSchedules();
  }
}
