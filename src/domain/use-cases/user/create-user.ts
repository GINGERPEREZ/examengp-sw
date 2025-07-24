import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    // Aquí podrías encriptar la contraseña antes de guardar
    return this.userRepository.create(user);
  }
} 