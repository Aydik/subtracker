import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

export function toISOString(date: Dayjs) {
  if (!date.isValid()) {
    throw new Error(`Невалидная дата: ${date}`);
  }

  return date.toISOString();
}

export function isoToRussianDate(isoValue?: string) {
  if (!isoValue) return '';

  const date = dayjs(isoValue).locale('ru');
  if (!date.isValid()) throw new Error(`Невалидная дата: ${isoValue}`);

  return date.format('D MMMM');
}
