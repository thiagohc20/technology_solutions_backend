import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/modules/users/users.entity';
import { ProfileEntity } from 'src/modules/profiles/entity/profile.entity';
@Entity('employees')
export class EmployeeEntity {
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
  @Exclude()
  telephone: string;

  @Column()
  @Expose()
  @Exclude()
  zipcode: string;

  @Column()
  @Expose()
  @Exclude()
  uf: string;

  @Column()
  @Expose()
  @Exclude()
  neighborhood: string;

  @Column({ name: 'public_place' })
  @Expose()
  @Exclude()
  publicPlace: string;

  @Column()
  @Expose()
  @Exclude()
  locality: string;

  @Column({ name: 'user_id' })
  @Expose()
  @Exclude()
  userId: number;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  @Exclude()
  created_at: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity;

  @Expose()
  @Exclude()
  get profileDetails(): ProfileEntity {
    return this.user?.profile;
  }
}
