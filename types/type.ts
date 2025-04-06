export type Topic = {
    _id: string;
    name: string;
}

export type Quiz = {
    _id: string;
    question: string;
    options: Array<string>;
    answer: number
}