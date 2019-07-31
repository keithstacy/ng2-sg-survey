import { Option } from './option';

export class Question {
  id: number;
  key: string;
  text: string;
  questionTypeId: number;
  options: Option[];
  answered: boolean;
  gift: string;
  score: number;
  sequenceNumber: number;

  constructor(data: any) {
    if (data) {
      // console.log(data);
      this.id = data.id;
      this.key = data.key;
      this.text = data.text;
      this.questionTypeId = data.questionTypeId;
      this.gift = data.gift;
      this.score = 0;
      this.options = [];
      data.options.forEach(o => {
        this.options.push(new Option(o));
      });
    }
  }
}
