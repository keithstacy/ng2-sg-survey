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
            // data.topThreeGifts.forEach((g: any) => {
            //   this.topThreeGifts.push(new Gift(g));
            // });
        }
    }
}
