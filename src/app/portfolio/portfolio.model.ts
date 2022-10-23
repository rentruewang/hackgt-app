export class Portfolio {
  name: string = 'hi';
  percent: number = 0;
  type: string = '1';
  scale: number = 20;

  constructor(d: any) {
    this.name = d.name;
    this.percent = d.percent;
    this.type = d.type;
  }
}
