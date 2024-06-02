import { Component, OnInit } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';
import { TypeService } from 'src/app/services/type/type.service';
import { typeDTO } from 'src/app/models/type/typeDTO';

declare var bootstrap: any;

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit {
  userSchedules: userScheduleDTO[] = [];
  filteredSchedules: userScheduleDTO[] = [];
  typeList: typeDTO[] = [];
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedType: string = '';
  selectedFrequency: string = '';
  selectedDay: string = '';
  showRegistered: boolean = false;
  showNotRegistered: boolean = false;
  selectedUserSchedule: userScheduleDTO | null = null;

  loading: boolean = true;

  constructor(private userScheduleService: UserScheduleService,
    private typeService: TypeService) { }

  ngOnInit(): void {
    const today = new Date();
    this.startDate = today.toISOString().split('T')[0];
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.endDate = nextWeek.toISOString().split('T')[0];

    this.handleUserSchedules();
    this.loadTypes();
  }

  handleUserSchedules(): void {
    this.userScheduleService.listSchedulesByUser(JSON.parse(sessionStorage.getItem("user")!).ID_user).subscribe({
      next: (data: userScheduleDTO[]) => {
        this.userSchedules = data;
        this.applyFilter();
        console.log(data);
      },
      error: (error: any) => {
        this.loading = false;
        console.error("Error al conseguir las actividades del usuario:", error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (data: typeDTO[]) => {
        this.typeList = data;
      },
      error: (error: any) => {
        console.error('Error fetching types:', error);
      }
    });
  }

  applyFilter(): void {
    this.filteredSchedules = this.userSchedules.filter(schedule => {
      const matchesSearchTerm = this.searchTerm ?
        schedule.Schedule.Activity.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesStartDate = this.startDate ?
        new Date(schedule.AttendanceDate) >= new Date(this.startDate) : true;
      const matchesEndDate = this.endDate ?
        new Date(schedule.AttendanceDate) <= new Date(this.endDate) : true;
      const matchesType = this.selectedType ?
        schedule.Schedule.Type.Name === this.selectedType : true;
      const matchesFrequency = this.selectedFrequency ?
        schedule.Schedule.Frequency === this.selectedFrequency : true;
      const matchesDay = this.selectedDay ?
        schedule.Schedule.DayOfWeek === this.selectedDay : true;

      return matchesSearchTerm && matchesStartDate && matchesEndDate &&
        matchesType && matchesFrequency && matchesDay;
    });
    this.filteredSchedules.sort((a, b) => new Date(a.AttendanceDate).getTime() - new Date(b.AttendanceDate).getTime());
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedType = '';
    this.selectedFrequency = '';
    this.selectedDay = '';
    this.showRegistered = false;
    this.showNotRegistered = false;
    this.applyFilter();
  }

  setTodayAndNextWeek(): void {
    const today = new Date();
    this.startDate = today.toISOString().split('T')[0];
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.endDate = nextWeek.toISOString().split('T')[0];
    this.applyFilter();
  }

  onUserScehduleClicked(schedule: userScheduleDTO): void {
    this.selectedUserSchedule = schedule;
    const modalElement = document.getElementById('userScheduleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  handleScheduleChange(): void {
    this.handleUserSchedules();
  }
}
