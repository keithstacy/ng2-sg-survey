import { QuizConfig } from './quiz-config';
import { Question } from './question';
import { Gift } from './gift';

export class Quiz {
  id: number;
  name: string;
  description: string;
  config: QuizConfig;
  questions: Question[];
  gifts: Gift[];
  currentIndex: number;

  constructor(data: any) {
    if (data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.config = new QuizConfig(data.config);
        this.questions = [];
        data.questions.forEach((q: any) => {
            this.questions.push(new Question(q));
        });
        this.currentIndex = 1;
        this.questions.forEach(q => q.sequenceNumber = this.currentIndex++);
        this.gifts = [];
        data.gifts.forEach((g: any) => this.gifts.push(new Gift(g)));
      }
  }
}
