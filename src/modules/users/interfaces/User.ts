import type { Profile } from 'src/modules/profiles/interfaces/Profile';

export interface UserById {
  id: string;
  name: string;
  email: string;
  profile: Profile;
}
