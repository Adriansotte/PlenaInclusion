import { Component, OnInit } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-campagne',
  templateUrl: './manage-campagne.component.html',
  styleUrls: ['./manage-campagne.component.css']
})
export class ManageCampagneComponent implements OnInit {

  campaigns: CampaignDTO[] = [];
  selectedCampaign: CampaignDTO | null = null;

  constructor(private campaignService: CampaignService) {
  }
  ngOnInit(): void {
    this.handleCampaigns();
  }

  handleCampaigns(): void {
    this.campaignService.listAllCampaigns().subscribe({
      next: (response: CampaignDTO[]) => {
        this.campaigns = response;
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error en recogiendo las campañas', error);
      }
    })
  }

  onCampaignClick(campaign: CampaignDTO): void {
    this.selectedCampaign = campaign;
    const modalElement = document.getElementById('campaignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addCampaignModal() {
    const modalElement = document.getElementById('addCampaignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }  
}
