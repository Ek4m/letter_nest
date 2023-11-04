import { User } from './user.model';

export class UserMapper {
  static async assignUrl(entity: User) {
    return entity;
  }
}
