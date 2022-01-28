import { Context } from 'egg';
import { ContextUtil } from '../extend/context';

export interface RowsData<T = any[]> {
  count: number;
  rows: T;
}

export interface GraphqlContext {
  context: {
    ctx: Context;
  };
  contextUtil: ContextUtil;
}
