import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models';
import { Score, GiftScore } from '../models/score';
import { Question } from '../models';

@Injectable()
export class QuizService {

  private _quiz: Quiz;
  private _score: Score;
  private _giftScore: GiftScore;
  private _questionsForThisGift: Question[];

  getScore(): Score {
    const _keyCount = 23; // the number of alphabetic keys
    this._score = new Score;
    this._score.giftScoreList = new GiftScore[_keyCount];
    let thisKey = '';

    for (let i = 0; i < _keyCount; i++) {
      thisKey = this._quiz.gifts[i].key;
      this._score.giftScoreList[i] = new GiftScore;
      this._questionsForThisGift = this._quiz.questions.filter(q => q.key === thisKey);
      this._questionsForThisGift.forEach(q => this._score.totalScore += q.score);
      this._score.key = thisKey;
      this._score.giftName = this._quiz.gifts[i].name;
      }

    return this._score;
  }

  post(quiz: Quiz) {
    this._quiz = quiz;
  }

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/spiritualGifts.json', name : 'Spiritual Gifts' }
    ];
  }

}
