import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.update(user);
  }
} 