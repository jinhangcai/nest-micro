import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Micro_register_route_secondEntity } from './micro_register_route_second.entity'

@Entity()
export class Micro_register_routeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:20})
  path: string;

  @Column({type:'varchar', length:20})
  name: string;

  @Column({type:'varchar', length:20})
  baseStair: string;

  @Column({type:'varchar', length:20})
  baseSecond: string;


  @OneToMany(
    () => Micro_register_route_secondEntity,
    routes => routes.micro,
  )
  routes: Micro_register_route_secondEntity[];

}