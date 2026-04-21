import { Dayjs } from 'dayjs';

export function toISOString(date: Dayjs) {
  if (!date.isValid()) {
    return null;
  }

  return date.toISOString();
}
