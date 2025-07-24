import { UserRepository } from '../../repositories/user.repository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
} 