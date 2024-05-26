import { Component, EventEmitter, Input, Output } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent {
  @Input() selectedActivity: activityDTO | null = null;
  
  @Output() activitiesChange: EventEmitter<activityDTO> = new EventEmitter<activityDTO>();


  constructor(private activityService: ActivityService) { }

}
