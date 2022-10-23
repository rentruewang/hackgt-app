import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Portfolio } from '../portfolio/portfolio.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public type: string = 'percent';
  public dollars: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public percents: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public total: number = 0;
  public submitted: boolean = false;
  public words = [{ 'text': 'said', 'value': 22 }, { 'text': 'end', 'value': 13 }, { 'text': 'look', 'value': 18 }, { 'text': 'consider', 'value': 16 }, { 'text': 'after', 'value': 12 }, { 'text': 'under', 'value': 11 }, { 'text': 'story', 'value': 11 }, { 'text': 'over', 'value': 17 }, { 'text': 'up', 'value': 33 }, { 'text': 'got', 'value': 19 }, { 'text': 'weeks', 'value': 11 }, { 'text': 'few', 'value': 12 }, { 'text': 'conclusion', 'value': 11 }, { 'text': 'seen', 'value': 12 }, { 'text': 'risk', 'value': 19 }, { 'text': 'country', 'value': 16 }, { 'text': 'states', 'value': 17 }, { 'text': 'being', 'value': 13 }, { 'text': 'president', 'value': 18 }, { 'text': 'out', 'value': 15 }, { 'text': 'back', 'value': 15 }, { 'text': 'people', 'value': 24 }, { 'text': 'speak', 'value': 12 }, { 'text': 'everyone', 'value': 18 }];
  public portfolio: Array<Portfolio> = [
    { name: 'Consumer Discretionary', percent: this.percents[0], type: '1' },
    { name: 'Consumer Staples', percent: this.percents[1], type: '1' },
    { name: 'Energy', percent: this.percents[2], type: '1' },
    { name: 'Financials', percent: this.percents[3], type: '1' },
    { name: 'Health', percent: this.percents[4], type: '1' },
    { name: 'Industrials', percent: this.percents[5], type: '1' },
    { name: 'Materials', percent: this.percents[6], type: '1' },
    { name: 'Real Estate', percent: this.percents[7], type: '1' },
    { name: 'Technology', percent: this.percents[8], type: '1' },
    { name: 'Communication Services', percent: this.percents[9], type: '1' },
    { name: 'Utilities', percent: this.percents[10], type: '1' }
  ];

  public sum = (arr: number[]) => {
    this.total = 0;
    for (let i = 0; i < arr.length; i++) {
      this.total += arr[i];
    }
    this.submitted = false;
  }

  public onSubmit(form: NgForm) {

    if (this.type === 'percent') {
      this.sum(this.percents);
      if (this.total !== 100) {
        alert('Percentages must be equal to 100%');
        return;
      }
    } else {
      this.sum(this.dollars);
      console.log(this.total);
      for (let i = 0; i < this.percents.length; i++) {
        this.percents[i] = this.dollars[i] / this.total * 100;
      }
    }

    if (form.valid) {
      for (let i = 0; i < this.portfolio.length; i++) {
        this.portfolio[i].percent = this.percents[i] | 0;
      }
      this.submitted = true;
    }
  }
}
