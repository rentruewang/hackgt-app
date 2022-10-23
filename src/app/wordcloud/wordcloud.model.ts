export class wordcloud {
    text: string = '';
    value: number = 0;

    constructor(text: string, value: number) {
        this.text = text;
        this.value = value;
    }
}

export interface wordlist {
    [key: string]: {
        "Date": string,
        "VIX": number,
        "Count": wordcloud[]
    }
}