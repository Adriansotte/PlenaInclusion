import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserScheduleService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  postSchedule(userId: string, scheduleId: string, date: string): Observable<any> {
    const body = {
      UserIDUser: userId,
      ScheduleIDSchedule: scheduleId,
      AttendanceDate: date
    }
    return this.http.post<any>(`${this.url}/api/userSchedules`, body);
  }
}