import { Remind } from './../entity/remind';
import { ERemindStatus } from '../enums/remind';

export enum EColumnType {
  'text' = 1,
  'checkbox' = 2,
}

export interface Column {
  id: number;
  key: string;
  title: string;
  type: EColumnType;
}
export interface RemindItem {
  name: string;
  [key: string]: Remind | string;
}

export interface UseStatusResponse {
  columns: Column[];
  list: RemindItem[];
  pageInfo: {
    pageHeader: string;
    startWeek: string;
    endWeek: string;
    week: string;
  };
}
