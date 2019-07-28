import { Option } from './option';

export class Question {
    id: number;
    key: string;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    gift: string;
    score: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.gift = data.gift;
        this.score = 0;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
