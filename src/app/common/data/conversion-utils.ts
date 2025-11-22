import { DateTime } from 'luxon';
import { Timestamp } from '@angular/fire/firestore';

export function convertDateTimeToDate(data: any): any {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // Check if it's a Luxon DateTime instance and convert it to a standard JavaScript Date.
  if (data instanceof DateTime) {
    const d = Timestamp.fromMillis(data.toMillis());

    return d;
  }

  if (Array.isArray(data)) {
    // If it's an array, map over its elements and recurse
    return data.map(convertDateTimeToDate);
  }

  // If it's a plain object, iterate over keys and recurse
  const processedData: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      processedData[key] = convertDateTimeToDate(data[key]);
    }
  }
  return processedData;
}

export function convertTimestampsToDates(data: any): any {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // 🚨 Direct type check using instanceof
  if (data instanceof Timestamp) {
    return DateTime.fromMillis(data.toMillis());
  }

  if (Array.isArray(data)) {
    // If it's an array, map over its elements and recurse
    return data.map(convertTimestampsToDates);
  }

  // If it's a plain object, iterate over keys and recurse
  const processedData: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      processedData[key] = convertTimestampsToDates(data[key]);
    }
  }
  return processedData;
}
