import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
