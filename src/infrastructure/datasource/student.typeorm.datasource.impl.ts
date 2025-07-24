import { StudentDatasource } from '../../domain/datasources/student.datasource';
import { StudentEntity } from '../../domain/entities/student.entity';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { StudentTypeOrm } from '../../data/typeorm/student.entity';
import { UserTypeOrm } from '../../data/typeorm/user.entity';

export class StudentTypeOrmDatasourceImpl implements StudentDatasource {
  private repo = AppDataSource.getRepository(StudentTypeOrm);
  private userRepo = AppDataSource.getRepository(UserTypeOrm);

  async create(student: StudentEntity): Promise<StudentEntity> {
    const user = await this.userRepo.findOneBy({ id: student.userId });
    if (!user) throw new Error('User not found');
    const saved = await this.repo.save({ user });
    return new StudentEntity(saved.id, saved.user.id);
  }

  async update(student: StudentEntity): Promise<StudentEntity> {
    let updateData: any = {};
    if (student.userId) {
      const user = await this.userRepo.findOneBy({ id: student.userId });
      if (!user) throw new Error('User not found');
      updateData.user = user;
    }
    await this.repo.update(student.id, updateData);
    const updated = await this.repo.findOne({ where: { id: student.id }, relations: ['user'] });
    if (!updated) throw new Error('Student not found');
    return new StudentEntity(updated.id, updated.user.id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<StudentEntity | null> {
    const st = await this.repo.findOne({ where: { id }, relations: ['user'] });
    return st ? new StudentEntity(st.id, st.user.id) : null;
  }

  async findByUserId(userId: number): Promise<StudentEntity | null> {
    const st = await this.repo.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    return st ? new StudentEntity(st.id, st.user.id) : null;
  }

  async findAll(): Promise<StudentEntity[]> {
    const sts = await this.repo.find({ relations: ['user'] });
    return sts.map(st => new StudentEntity(st.id, st.user.id));
  }
} 