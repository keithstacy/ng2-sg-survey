export class Gift {
  id: number;
  name: string;
  description: string;
  score: number;
  key: string;
  band: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.score = data.score;
      this.key = data.key;
      this.band = '';
    }
  }
}
