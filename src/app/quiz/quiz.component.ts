import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig, Gift } from '../models/index';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizzes: any[];
  quiz: Quiz = new Quiz(null);
  gifts: Gift[];
  gift: Gift = new Gift(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'pageSize': 2,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1,
    lastIndex: 0
  };
  quizScore: any;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizzes = this.quizService.getAll();
    this.quizName = this.quizzes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
  // tslint:disable-next-line: prefer-const
    let obj = this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.pager.lastIndex = this.pager.count - 1;
    });
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) { x.selected = false; }
      });
      question.score = question.options.filter(q => q.selected === true)[0].value;
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  onSubmit() {
    // tslint:disable-next-line: prefer-const
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({
      'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered
    }));
    this.quizService.post(this.quiz);
    this.quizScore = this.quizService.getScore();
    this.mode = 'result';
  }

  printDiv(elementId: any) {
    const printableWindow = window.open('', '_blank', 'Print content');
    const divToPrint = document.getElementById(elementId);
    printableWindow.document.write(divToPrint.outerHTML);
    printableWindow.document.close();
    printableWindow.focus();
    printableWindow.print();
    printableWindow.close();
  }

}
