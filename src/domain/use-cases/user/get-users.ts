import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

export class GetUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
} 