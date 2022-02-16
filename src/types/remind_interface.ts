import { Remind } from './../entity/remind';

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
  medicineId: number;
  [key: string]: Remind | string | number;
}

export interface UseStatusResponse {
  columns: Column[];
  rows: RemindItem[];
  pageInfo: {
    pageHeader: string;
    startWeek: string;
    endWeek: string;
    week: string;
  };
}

/**
 * 设置药品时间
 */
export type SetRemindData = Pick<
  Remind,
  'timeId' | 'medicineId' | 'status' | 'date'
>;
