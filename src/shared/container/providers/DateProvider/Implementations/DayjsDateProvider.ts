import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);
    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);
    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }
}

export { DayjsDateProvider };
