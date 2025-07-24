import { FlashcardInteractionEntity } from '../../domain/entities/flashcard-interaction.entity';
import { FlashcardInteractionDatasource } from '../../domain/datasources/flashcard-interaction.datasource';
import { AppDataSource } from '../../data/typeorm/typeorm.config';
import { FlashcardInteractionTypeOrm } from '../../data/typeorm/flashcard-interaction.entity';
import { StudySessionTypeOrm } from '../../data/typeorm/study-session.entity';
import { FlashcardTypeOrm } from '../../data/typeorm/flashcard.entity';

export class FlashcardInteractionTypeOrmDatasourceImpl implements FlashcardInteractionDatasource {
  private repo = AppDataSource.getRepository(FlashcardInteractionTypeOrm);
  private sessionRepo = AppDataSource.getRepository(StudySessionTypeOrm);
  private flashcardRepo = AppDataSource.getRepository(FlashcardTypeOrm);

  async create(interaction: FlashcardInteractionEntity): Promise<FlashcardInteractionEntity> {
    const studySession = await this.sessionRepo.findOneBy({ id: interaction.studySessionId });
    const flashcard = await this.flashcardRepo.findOneBy({ id: interaction.flashcardId });
    if (!studySession || !flashcard) throw new Error('Session or Flashcard not found');
    const saved = await this.repo.save({
      studySession,
      flashcard,
      shownAt: interaction.shownAt,
      answered: interaction.answered,
      correct: interaction.correct,
      responseTime: interaction.responseTime
    });
    return new FlashcardInteractionEntity(saved.id, saved.studySession.id, saved.flashcard.id, saved.shownAt, saved.answered, saved.correct, saved.responseTime);
  }

  async findByStudySession(studySessionId: number): Promise<FlashcardInteractionEntity[]> {
    const interactions = await this.repo.find({ where: { studySession: { id: studySessionId } }, relations: ['studySession', 'flashcard'] });
    return interactions.map(i => new FlashcardInteractionEntity(i.id, i.studySession.id, i.flashcard.id, i.shownAt, i.answered, i.correct, i.responseTime));
  }

  async findByFlashcard(flashcardId: number): Promise<FlashcardInteractionEntity[]> {
    const interactions = await this.repo.find({ where: { flashcard: { id: flashcardId } }, relations: ['studySession', 'flashcard'] });
    return interactions.map(i => new FlashcardInteractionEntity(i.id, i.studySession.id, i.flashcard.id, i.shownAt, i.answered, i.correct, i.responseTime));
  }

  async findAll(): Promise<FlashcardInteractionEntity[]> {
    const interactions = await this.repo.find({ relations: ['studySession', 'flashcard'] });
    return interactions.map(i => new FlashcardInteractionEntity(i.id, i.studySession.id, i.flashcard.id, i.shownAt, i.answered, i.correct, i.responseTime));
  }
} 