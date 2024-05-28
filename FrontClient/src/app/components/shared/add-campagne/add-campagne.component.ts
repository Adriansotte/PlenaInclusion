import { Component, EventEmitter, Output } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-add-campagne',
  templateUrl: './add-campagne.component.html',
  styleUrls: ['./add-campagne.component.css']
})
export class AddCampagneComponent {

  @Output() campaignCreated: EventEmitter<void> = new EventEmitter<void>();

  campaign: CampaignDTO = {
    Name: '',
    Description: '',
    StartDate: new Date(),
    FinishDate: new Date()
  }

  constructor(private campaignService: CampaignService) { }

  submitForm(): void {

  }
}
