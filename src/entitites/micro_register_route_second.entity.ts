import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Micro_register_routeEntity } from './micro_register_route.entity'

@Entity()
export class Micro_register_route_secondEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:20})
  path: string;

  @Column({type:'varchar', length:20})
  name: string;

  @ManyToOne(
    () => Micro_register_routeEntity,
    user => user.routes,
  )
  micro: Micro_register_routeEntity;
}