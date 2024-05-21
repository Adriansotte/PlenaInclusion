import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';



@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  listAllSchedules(): Observable<scheduleDTO[]> {
    return this.http.get<scheduleDTO[]>(`${this.url}/api/schedules`);
  }

}
