export class Option {
  id: number;
  questionId: number;
  text: string;
  value: number;
  isAnswer: boolean;
  selected: boolean;
  gift: string;
  weight: number;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.questionId = data.questionId;
      this.text = data.text;
      this.value = data.value;
      this.isAnswer = data.isAnswer;
      this.gift = data.gift;
      this.weight = data.weight;
    }
  }
}
