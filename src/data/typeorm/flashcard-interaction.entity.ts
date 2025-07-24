import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { StudySessionTypeOrm } from './study-session.entity';
import { FlashcardTypeOrm } from './flashcard.entity';

@Entity('flashcard_interactions')
export class FlashcardInteractionTypeOrm {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => StudySessionTypeOrm, { nullable: false })
  studySession!: StudySessionTypeOrm;

  @ManyToOne(() => FlashcardTypeOrm, { nullable: false })
  flashcard!: FlashcardTypeOrm;

  @CreateDateColumn()
  shownAt!: Date;

  @Column('boolean')
  answered!: boolean;

  @Column('boolean')
  correct!: boolean;

  @Column('int', { nullable: true })
  responseTime?: number;
} 