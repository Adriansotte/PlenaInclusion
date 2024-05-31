import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campagne-modal',
  templateUrl: './campagne-modal.component.html',
  styleUrls: ['./campagne-modal.component.css']
})
export class CampagneModalComponent {

  @Input() selectedCampaign: CampaignDTO | null = null;

  @Output() campaignsChange: EventEmitter<CampaignDTO> = new EventEmitter<CampaignDTO>();

  constructor(private campaignService: CampaignService) { }

  deleteActivity() {
    this.campaignService.deleteCampaign(this.selectedCampaign?.ID_Campaign!).subscribe({
      next: response => {
        console.log(response)

        // this.deleteSuccessModal();
      },
      error: (error: any) => {
        console.log(error)

        // this.deleteFailedModal()
      },
      complete: () => {
        this.campaignsChange.emit();
      }
    })
  }
}
