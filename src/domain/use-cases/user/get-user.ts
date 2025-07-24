import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }
} 