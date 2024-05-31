import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

declare var bootstrap: any;

@Component({
  selector: 'app-campagne-modal',
  templateUrl: './campagne-modal.component.html',
  styleUrls: ['./campagne-modal.component.css']
})
export class CampagneModalComponent {

  @Input() selectedCampaign: CampaignDTO | null = null;

  @Output() campaignsChange: EventEmitter<CampaignDTO> = new EventEmitter<CampaignDTO>();

  adviceTitle: string = "";

  constructor(private campaignService: CampaignService) { }

  deleteCampagne() {
    this.campaignService.deleteCampaign(this.selectedCampaign?.ID_Campaign!).subscribe({
      next: response => {
        this.adviceTitle = "Campaña borrada correctamente!!!";

        // this.deleteSuccessModal();
      },
      error: (error: any) => {
        console.log(error)
        this.adviceTitle = "Campaña Pertenece a un Horario, de momento no se puede borrar.";
        this.openAdviceModal();

        // this.deleteFailedModal()
      },
      complete: () => {
        this.campaignsChange.emit();
        this.openAdviceModal();

      }
    })
  }

  openConfirmationModal() {
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openAdviceModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
