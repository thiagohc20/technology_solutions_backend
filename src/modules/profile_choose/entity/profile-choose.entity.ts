import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ProfileEntity } from 'src/modules/profiles/entity/profile.entity';
import { Expose } from 'class-transformer';
@Entity('profiles_choose')
export class ProfileChooseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'profile_id' })
  @Expose()
  profileId: number;

  @Column({ name: 'profile_choose_id' })
  @Expose()
  profileChooseId: number;
}
