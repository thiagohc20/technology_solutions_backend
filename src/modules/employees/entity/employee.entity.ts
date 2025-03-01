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

  @Column({ name: 'public_place' })
  @Expose()
  publicPlace: string;

  @Column()
  @Expose()
  locality: string;

  @Column({ name: 'user_id' })
  @Expose()
  userId: number;

  @CreateDateColumn() // Este campo será automaticamente preenchido com a data e hora de criação
  created_at: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Expose()
  get profileDetails(): ProfileEntity {
    return this.user?.profile;
  }
}
