import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { UserTypeOrm } from '../../data/typeorm/user.entity';
import { UserMapper } from '../../data/typeorm/mappers/user.mapper';

export class UserTypeOrmDatasourceImpl implements UserDatasource {
  private repo = AppDataSource.getRepository(UserTypeOrm);

  async create(user: UserEntity): Promise<UserEntity> {
    const saved = await this.repo.save(UserMapper.toTypeOrm(user));
    return UserMapper.toDomain(saved);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    await this.repo.update(user.id, UserMapper.toTypeOrm(user));
    const updated = await this.repo.findOneBy({ id: user.id });
    if (!updated) throw new Error('User not found');
    return UserMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.repo.findOneBy({ id });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findOneBy({ email });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repo.find();
    return users.map(UserMapper.toDomain);
  }
} 