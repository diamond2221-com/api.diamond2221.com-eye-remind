import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ERemindStatus } from '../enums/remind';

@EntityModel('tbl_remind')
export class Remind {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '提醒id 唯一',
    name: 'id',
  })
  public id: number;

  @Column({
    type: 'int',
    comment: '关联时间枚举表的id',
    name: 'time_id',
  })
  public timeId: number;

  @Column({
    type: 'int',
    comment: '关联药品枚举表的id',
    name: 'medicine_id',
  })
  public medicineId: number;

  @Column({
    type: 'varchar',
    comment: '备注内容',
    name: 'remark',
  })
  public remark: string;

  @Column({
    type: 'int',
    comment: `
        是否已经滴了药:
        1: 已滴
        0: 未滴
    `,
    name: 'status',
  })
  public status: ERemindStatus;

  @Column({
    type: 'date',
    comment: '属于哪天的提醒',
    name: 'date',
  })
  public date: Date;

  @Column({
    type: 'datetime',
    comment: '发帖的时间戳',
    name: 'add_time',
  })
  public addTime: Date;

  @Column({
    type: 'datetime',
    comment: '发帖的时间戳',
    name: 'update_time',
  })
  public updateTime: Date;
}
