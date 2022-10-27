import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Micro_search_AppsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:100})
  entry: string;

  @Column({type:'varchar', length:100})
  name: string;
}