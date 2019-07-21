export class Gift {
  id: number;
  name: string;
  score: number;
  key: string;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.name = data.name;
    this.score = data.score;
    this.key = data.key;
  }
}
