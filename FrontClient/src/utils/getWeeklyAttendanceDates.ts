export function getWeeklyAttendanceDates(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    let finishDate = new Date(endDate);
    currentDate.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);
    console.log("Initial currentDate:", currentDate.getDay());

    while (currentDate <= finishDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 7);
    }

    console.log("Final dates array:", dates);
    return dates;
}