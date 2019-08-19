import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz, Question, Gift } from '../models';
// import { Score, GiftScore } from '../models/score';

@Injectable()
export class QuizService {

  private _quiz: Quiz;

  constructor(private http: HttpClient) {
  }

  getScore(): Gift[] {
    const _keyCount = 23; // the number of alphabetic keys
    let sortedGifts: Gift[] = [];

    let thisGiftKey = '';
    let questionsForThisGift: Question[] = [];
    for (let i = 0; i < _keyCount; i++) {
      try {
        if (this._quiz.gifts[i]) {
          thisGiftKey = this._quiz.gifts[i].key;
          this._quiz.gifts[i].score = 0;
          questionsForThisGift = this._quiz.questions.filter(q => q.gift === thisGiftKey);
          questionsForThisGift.forEach((q) => { this._quiz.gifts[i].score += q.score; });
        }
      } catch (error) {
        console.log('gift not found; key: ' + thisGiftKey);
      }
    }
    sortedGifts = this._quiz.gifts.sort((g1, g2) => g2.score - g1.score); // sorted numerically, with scores in descending order
    sortedGifts.forEach(g => g.band = this.calculateBand(g.score));
    return sortedGifts;
  }

  private calculateBand(score: number): string {
    let band = '';
    switch (score) {
      case 15:
      case 14: {
        band = 'Highly gifted';
        break;
      }
      case 13:
      case 12:
      case 11:
      case 10:
      case 9:
      case 8: {
        band = 'Gifted';
        break;
      }
      case 7:
      case 6:
      case 5:
      case 4:
      case 3:
      case 2: {
        band = 'Moderately gifted';
        break;
      }
      case 1:
      case 0: {
        band = 'Not gifted';
        break;
      }
    }
    return band;
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
