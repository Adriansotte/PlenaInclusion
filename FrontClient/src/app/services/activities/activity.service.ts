import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { activityDTO } from 'src/app/models/activity/activityDTO';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  listAllActivities(): Observable<activityDTO[]> {
    return this.http.get<activityDTO[]>(`${this.url}/api/activities`);
  }

}
