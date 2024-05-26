import { Component, OnInit } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit {

  activities: activityDTO[] = [];

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
    // Maneja el evento de clic en una actividad, por ejemplo, navegando a otra página o mostrando detalles
    console.log('Activity clicked:', activity);
  }
}
