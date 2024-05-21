import { activityDTO } from "../activity/activityDTO";
import { typeDTO } from "../type/typeDTO";

export interface scheduleDTO {
    ID_Schedule: string,
    Address: string,
    DayOfWeek: string,
    StartHour: string,
    FinishHour: string,
    Frequency: string,
    StartDate: Date,
    FinishDate: Date
    ID_Activity: string,
    ID_Type: string,
    Activity: activityDTO,
    Type: typeDTO
}