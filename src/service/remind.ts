import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { Remind } from '../entity/remind';

@Provide()
export class RemindService {
  @Inject()
  private ctx: Context;

  @InjectEntityModel(Remind)
  private remindModel: Repository<Remind>;
}
