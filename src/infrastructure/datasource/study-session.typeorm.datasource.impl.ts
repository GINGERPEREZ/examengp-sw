import { StudySessionDatasource } from '../../domain/datasources/study-session.datasource';
import { StudySessionEntity } from '../../domain/entities/study-session.entity';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { StudySessionTypeOrm } from '../../data/typeorm/study-session.entity';
import { StudentTypeOrm } from '../../data/typeorm/student.entity';
import { CategoryTypeOrm } from '../../data/typeorm/category.entity';

export class StudySessionTypeOrmDatasourceImpl implements StudySessionDatasource {
  private repo = AppDataSource.getRepository(StudySessionTypeOrm);
  private studentRepo = AppDataSource.getRepository(StudentTypeOrm);
  private categoryRepo = AppDataSource.getRepository(CategoryTypeOrm);

  async create(session: StudySessionEntity): Promise<StudySessionEntity> {
    const student = await this.studentRepo.findOneBy({ id: session.studentId });
    const category = await this.categoryRepo.findOneBy({ id: session.categoryId });
    if (!student || !category) throw new Error('Student or Category not found');
    const saved = await this.repo.save({ student, category, startedAt: session.startedAt, endedAt: session.endedAt });
    return new StudySessionEntity(saved.id, saved.student.id, saved.category.id, saved.startedAt, saved.endedAt);
  }

  async update(session: StudySessionEntity): Promise<StudySessionEntity> {
    let updateData: any = { endedAt: session.endedAt };
    if (session.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: session.categoryId });
      if (!category) throw new Error('Category not found');
      updateData.category = category;
    }
    await this.repo.update(session.id, updateData);
    const updated = await this.repo.findOne({ where: { id: session.id }, relations: ['student', 'category'] });
    if (!updated) throw new Error('StudySession not found');
    return new StudySessionEntity(updated.id, updated.student.id, updated.category.id, updated.startedAt, updated.endedAt);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<StudySessionEntity | null> {
    const ss = await this.repo.findOne({ where: { id }, relations: ['student', 'category'] });
    return ss ? new StudySessionEntity(ss.id, ss.student.id, ss.category.id, ss.startedAt, ss.endedAt) : null;
  }

  async findByStudent(studentId: number): Promise<StudySessionEntity[]> {
    const sss = await this.repo.find({ where: { student: { id: studentId } }, relations: ['student', 'category'] });
    return sss.map(ss => new StudySessionEntity(ss.id, ss.student.id, ss.category.id, ss.startedAt, ss.endedAt));
  }

  async findAll(): Promise<StudySessionEntity[]> {
    const sss = await this.repo.find({ relations: ['student', 'category'] });
    return sss.map(ss => new StudySessionEntity(ss.id, ss.student.id, ss.category.id, ss.startedAt, ss.endedAt));
  }
} 