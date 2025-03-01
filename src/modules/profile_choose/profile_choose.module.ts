import { Module } from '@nestjs/common';
import { ProfileChooseService } from './profile_choose.service';

@Module({
  providers: [ProfileChooseService]
})
export class ProfileChooseModule {}
