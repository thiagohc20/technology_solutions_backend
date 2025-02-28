import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Profile } from '../profiles/entity/profile.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column({ unique: true })
  @Expose()
  cpf: string;

  @Column()
  @Expose()
  telephone: string;

  @Column()
  @Expose()
  zipcode: string;

  @Column()
  @Expose()
  uf: string;

  @Column()
  @Expose()
  neighborhood: string;

  @Column()
  @Expose()
  publicPlace: string;

  @Column()
  @Expose()
  locality: string;

  @Exclude()
  @Column({ type: 'nvarchar', unique: true })
  password?: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
