import { Component, Input } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';
import { getWeeklyAttendanceDates } from '../../../../utils/getWeeklyAttendanceDates';


@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent {
  @Input() schedule: scheduleDTO | null = null;

  fechas: string[] = [];

  constructor(private userScheduleService: UserScheduleService) { }

  registerForSchedule() {
    if (this.schedule) {
      const userId = sessionStorage.getItem('ID_User');
      if (userId) {
        const scheduleId = this.schedule.ID_Schedule;
        this.calcularFechas();
        for (const date of this.fechas) {
          this.launchInsertion(userId, scheduleId, date)
        }

      } else {
        console.error('ID de usuario no encontrado en el sesionStorage');
      }
    } else {
      console.error('No hay schedule seleccionado');
    }
    this.fechas = [];

  }

  launchInsertion(userId: string, scheduleId: string, date: string) {
    this.userScheduleService.postSchedule(userId, scheduleId, date).subscribe({
      next: response => {
        console.log('Registro exitoso', response);
      },
      error: error => {
        console.error('Error en el registro', error);
      },
      complete: () => {
        console.log('Registro completado');
      }
    });
  }

  calcularFechas() {
    if (this.schedule && this.schedule.Frequency === "Semanal") {
      this.fechas = getWeeklyAttendanceDates(this.schedule.StartDate, this.schedule.FinishDate);
    } else {
      this.fechas.push(new Date(this.schedule?.StartDate!).toISOString().split('T')[0]);
    }
    console.log(this.fechas)
    //TODO: dejar en vacio las fechas despues de asignar
  }
}
