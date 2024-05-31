import { Component, OnInit } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit {

  activities: activityDTO[] = [];
  selectedActivity: activityDTO | null = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.handleActivities();
  }

  handleActivities(): void {
    this.activityService.listAllActivities().subscribe({
      next: (data: activityDTO[]) => {
        this.activities = data;
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error fetching activities', error);
      }
    });
  }

  onActivityClick(activity: activityDTO): void {
    this.selectedActivity = activity;
    const modalElement = document.getElementById('activityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addActivityModal() {
    const modalElement = document.getElementById('addActivityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
