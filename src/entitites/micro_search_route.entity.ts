import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Micro_search_routeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:100})
  baseStair: string;

  @Column({type:'varchar', length:100})
  baseSecond: string;

  @Column({type:'varchar', length:100})
  microApp: string;
}