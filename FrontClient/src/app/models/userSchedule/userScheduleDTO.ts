import { scheduleDTO } from "../schedule/scheduleDTO";

export interface userScheduleDTO {
    ID: string,
    AttendanceDate: string,
    Comment: string,
    Rating: number,
    UserIDUser: string,
    ScheduleIDSchedule: string,
    Schedule: scheduleDTO
}