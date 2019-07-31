
export class GiftScore {
  key: string;
  gift: string;
  score: number;

  constructor() {
  }
}

export class Score {
  giftScoreList: GiftScore[];
  totalScore: number;
  key: string;
  giftName: string;

  constructor() {
  }
}
