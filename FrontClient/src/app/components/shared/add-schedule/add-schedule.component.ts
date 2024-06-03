import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { TypeService } from 'src/app/services/type/type.service';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  @Output() scheduleCreated: EventEmitter<void> = new EventEmitter<void>();

  schedule: scheduleDTO = {
    ID_Schedule: '',
    Address: '',
    DayOfWeek: '',
    StartHour: '',
    FinishHour: '',
    Frequency: '',
    StartDate: new Date,
    FinishDate: new Date,
    Capacity: 0,
    Attendance: 0,
    ID_Activity: '',
    ID_Type: '',
    ID_Campaign: ''
  }

  adviceTitle: string = "";

  activities: activityDTO[] = [];
  campaigns: CampaignDTO[] = [];
  types: typeDTO[] = [];

  constructor(private typeService: TypeService,
    private campaignService: CampaignService,
    private scheduleService: AllSchedulesService,
    private activityService: ActivityService
  ) { }


  ngOnInit(): void {
  }

  handleTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (response: typeDTO[]) => {
        this.types = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  handleCampaigns(): void {
    this.campaignService.listAllCampaigns().subscribe({
      next: (response: CampaignDTO[]) => {
        this.campaigns = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  handeActivities(): void {
    this.activityService.listAllActivities().subscribe({
      next: (response: activityDTO[]) => {
        this.activities = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
}
