import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class DefaultProfileService {

  url: string = environments.baseUrl
  defaultProfileImage : string = environments.defautlProfileImage;
  noAvtivityImage : string = environments.noActivityImage;

  constructor(private http: HttpClient) { }

  getDefaultProfileImage(): Observable<string> {
    return this.http.get<any>(`${this.url}/api/storage/${this.defaultProfileImage}`).pipe(
      map((response: any) => response.data.url)
    );
  }

  getNoActivityImage(): Observable<string> {
    return this.http.get<any>(`${this.url}/api/storage/${this.noAvtivityImage}`).pipe(
      map((response: any) => response.data.url)
    );
  }

}
