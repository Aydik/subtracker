import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';

export function toISOString(date: Dayjs) {
  if (!date.isValid()) {
    throw new Error(`Невалидная дата: ${date}`);
  }

  return date.format('YYYY-MM-DD') + 'T00:00:00.000Z';
}

export function isoToRussianDate(isoValue?: string) {
  if (!isoValue) return '';
  const date = dayjs(isoValue).locale('ru');
  if (!date.isValid()) throw new Error(`Невалидная дата: ${isoValue}`);
  return date.format('D MMMM');
}

export function formatDate(isoValue?: string, locale: string = 'ru') {
  if (!isoValue) return '';
  const date = dayjs(isoValue).locale(locale === 'ru' ? 'ru' : 'en');
  if (!date.isValid()) throw new Error(`Невалидная дата: ${isoValue}`);
  return date.format('D MMMM');
}

export function daysFromToday(targetDate: string | Date | null | undefined): number | null {
  if (!targetDate) return null;

  const target = new Date(targetDate);
  const today = new Date();

  if (isNaN(target.getTime()) || isNaN(today.getTime())) return null;

  const MS_PER_DAY = 86400000;
  const todayDay = Math.floor(today.getTime() / MS_PER_DAY);
  const targetDay = Math.floor(target.getTime() / MS_PER_DAY);

  return targetDay - todayDay;
}

export function compareDate(
  dateA: string | null | undefined,
  dateB: string | null | undefined,
): number {
  const timeA = dateA;
  const timeB = dateB;

  if (!timeA || !timeB) return 0;
  return timeA.localeCompare(timeB);
}
