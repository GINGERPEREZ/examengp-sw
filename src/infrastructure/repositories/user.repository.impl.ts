import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserDatasource } from '../../domain/datasources/user.datasource';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  create(user: UserEntity): Promise<UserEntity> {
    return this.datasource.create(user);
  }
  update(user: UserEntity): Promise<UserEntity> {
    return this.datasource.update(user);
  }
  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
  findById(id: number): Promise<UserEntity | null> {
    return this.datasource.findById(id);
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.findByEmail(email);
  }
  findAll(): Promise<UserEntity[]> {
    return this.datasource.findAll();
  }
} 