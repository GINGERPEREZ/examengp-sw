import { UserTypeOrm } from '../user.entity';
import { UserEntity } from '../../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(user: UserTypeOrm): UserEntity {
    return new UserEntity(user.id, user.name, user.email, user.password);
  }

  static toTypeOrm(user: UserEntity): UserTypeOrm {
    const userTypeOrm = new UserTypeOrm();
    userTypeOrm.id = user.id;
    userTypeOrm.name = user.name;
    userTypeOrm.email = user.email;
    userTypeOrm.password = user.password;
    return userTypeOrm;
  }
} 