export class Option {
    id: number;
    questionId: number;
    name: string;
    value: number;
    isAnswer: boolean;
    selected: boolean;
    gift: string;
    weight: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.value = data.value;
        this.isAnswer = data.isAnswer;
        this.gift = data.gift;
        this.weight = data.weight;
    }
}
