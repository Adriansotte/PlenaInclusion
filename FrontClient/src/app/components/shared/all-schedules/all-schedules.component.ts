import { Component, OnInit } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
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

  constructor(private allSchedulesService: AllSchedulesService,
    private userScheduleService: UserScheduleService
  ) { }

  ngOnInit(): void {
    this.handleSchedules();
    // this.pruebaInsercion();
  }

  pruebaInsercion(): void {
    this.userScheduleService.postSchedule("54f3cf07-b44a-4fa3-b49b-3c78db126d1f",
      "380e20c7-07cf-11ef-82d3-7c10c9911f32",
      "2024-12-23"
    ).subscribe({
      next: (data: any) => {
        console.log("Se ha insertado correctamente en la tabla intermedia!!!")
      },
      error: (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    });
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
