import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz, Question, Gift } from '../models';
// import { Score, GiftScore } from '../models/score';

@Injectable()
export class QuizService {

  private _quiz: Quiz;
  private _http: HttpClient;

  constructor(private http: HttpClient) {
    this._http = http;
  }

  getScore(): Gift[] {
    const _keyCount = 23; // the number of alphabetic keys

    let thisGiftKey = '';
    let questionsForThisGift: Question[] = [];
    for (let i = 0; i < _keyCount; i++) {
      try {
        if (this._quiz.gifts[i]) {
          thisGiftKey = this._quiz.gifts[i].key;
          this._quiz.gifts[i].score = 0;
          questionsForThisGift = this._quiz.questions.filter(q => q.gift === thisGiftKey);
          console.log(questionsForThisGift.length + ' questions for the key ' + thisGiftKey);
          questionsForThisGift.forEach((q) => {this._quiz.gifts[i].score += q.score; console.log(this._quiz.gifts[i].score); } );
          console.log('score for quiz gift ' + i + ': ' + this._quiz.gifts[i].score);
        }
      } catch (error) {
        console.log('gift not found; key: ' + thisGiftKey);
      }

      console.log('current key: ' + thisGiftKey);

    }
    return this._quiz.gifts;
  }

  post(quiz: Quiz) {
    this._quiz = quiz;
  }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/spiritualGifts.prod.json', name: 'Spiritual Gifts' }
    ];
  }
}
