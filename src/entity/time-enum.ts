import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tbl_time_enum')
export class TimeEnum {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '时间枚举表id 唯一',
    name: 'id',
  })
  public id: number;

  @Column({
    type: 'varchar',
    comment: '时间对应的中文',
    name: 'name',
  })
  public name: string;

  @Column({
    type: 'int',
    comment: '时间枚举表排序值',
    name: 'sort',
  })
  public sort: number;
}
