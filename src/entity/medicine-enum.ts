import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tbl_medicine_enum')
export class MedicineEnum {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '药品枚举表id 唯一',
    name: 'id',
  })
  public id: number;

  @Column({
    type: 'varchar',
    comment: '药品对应的中文',
    name: 'name',
  })
  public name: string;
}
