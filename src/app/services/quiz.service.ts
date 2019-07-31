import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models';
import { Score, GiftScore } from '../models/score';
import { Question } from '../models';

@Injectable()
export class QuizService {

  private _quiz: Quiz;
  private _score: Score;
  private _questionsForThisGift: Question[];

  constructor(private http: HttpClient) { }

  getScore(): Score {
    const _keyCount = 23; // the number of alphabetic keys
    this._score = new Score;

    let thisKey = '';

    for (let i = 0; i < _keyCount; i++) {
      try {
        console.log(this._quiz);
        console.log(this._quiz.gifts);
        thisKey = this._quiz.gifts[i].key;
      } catch (error) {
        console.log('error at line 24');
      }
      console.log(thisKey);
      try {
        this._score.giftScoreList[i] = new GiftScore;
      } catch (error) {
        console.log(error);
      }
      try {
      this._questionsForThisGift = this._quiz.questions.filter(q => q.key === thisKey);
      console.log('key: ' + this._questionsForThisGift[0].key);
      this._questionsForThisGift.forEach(q => this._score.totalScore += q.score);
      } catch (error) {
        console.log(error);
      }
      console.log('totalScore: ' + this._score.totalScore);
      try {
        this._score.key = thisKey;
        this._score.giftName = this._quiz.gifts[i].name;
      } catch (error) {
        console.log(error);
      }
    }
    return this._score;
  }

  post(quiz: Quiz) {
    this._quiz = quiz;
  }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/spiritualGifts.dev.json', name : 'Spiritual Gifts' }
    ];
  }
}
