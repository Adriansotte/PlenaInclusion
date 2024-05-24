import { Component, Input } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent {
  @Input() schedule: scheduleDTO | null = null;

  constructor(private userScheduleService: UserScheduleService) { }

  registerForSchedule() {
    if (this.schedule) {
      const userId = sessionStorage.getItem('ID_User');
      if (userId) {
        const scheduleId = this.schedule.ID_Schedule;

        this.userScheduleService.postSchedule(userId, scheduleId, "1999-09-25").subscribe({
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
      } else {
        console.error('ID de usuario no encontrado en el sesionStorage');
      }
    } else {
      console.error('No hay schedule seleccionado');
    }
  }
}
