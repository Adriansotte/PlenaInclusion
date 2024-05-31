import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  listAllCampaigns(): Observable<CampaignDTO[]> {
    return this.http.get<CampaignDTO[]>(`${this.url}/api/campaigns`);
  }

  addCampaign(campaign: CampaignDTO): Observable<any> {
    return this.http.post<any>(`${this.url}/api/campaigns`, campaign);
  }

  deleteCampaign(idCampaign: string) {
    return this.http.delete<CampaignDTO>(`${this.url}/api/campaigns/${idCampaign}`);
  }

  updateCampaign(campaign: CampaignDTO) {
    const { ID_Campaign, ...campaignBody } = campaign;
    return this.http.put<CampaignDTO>(`${this.url}/api/campaigns/${ID_Campaign}`, campaignBody);
  }

}
