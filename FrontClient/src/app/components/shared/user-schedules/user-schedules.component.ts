import { Component, OnInit } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit {
  userSchedules: userScheduleDTO[] = [];

  constructor(private userScheduleService: UserScheduleService,
    private typeService: TypeService) { }

  ngOnInit(): void {
    this.handleUserSchedules();
  }

  handleUserSchedules(): void {
    this.userScheduleService.listSchedulesByUser(sessionStorage.getItem('ID_User')).subscribe({
      next: (data: userScheduleDTO[]) => {
        // Asigna los datos
        this.userSchedules = data;
        // Ordena los userSchedules por AttendanceDate
        this.userSchedules.sort((a, b) => {
          return new Date(a.AttendanceDate).getTime() - new Date(b.AttendanceDate).getTime();
        });
        console.log(data);
      },
      error: (error: any) => {
        console.error("Error al conseguir las actividades del usuario:", error);
      }
    });
  }
}
