import { Component, EventEmitter, Input, Output } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';

declare var bootstrap: any;

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent {
  @Input() selectedActivity: activityDTO | null = null;

  @Output() activitiesChange: EventEmitter<activityDTO> = new EventEmitter<activityDTO>();


  constructor(private activityService: ActivityService) { }

  deleteActivity() {
    this.activityService.deleteActivty(this.selectedActivity?.ID_activity!).subscribe({
      next: response => {
        this.deleteSuccessModal();
      },
      error: (error: any) => {
        this.deleteFailedModal()
      },
      complete: () => {
        this.activitiesChange.emit();
      }
    })
  }

  deleteSuccessModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteFailedModal() {
    const modalElement = document.getElementById('errorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
