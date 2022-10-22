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
  public portfolio: Array<Portfolio> = [
    { name: 'Consumer Discretionary', percent: this.percents[0] },
    { name: 'Consumer Staples', percent: this.percents[1] },
    { name: 'Energy', percent: this.percents[2] },
    { name: 'Financials', percent: this.percents[3] },
    { name: 'Health', percent: this.percents[4] },
    { name: 'Industrials', percent: this.percents[5] },
    { name: 'Materials', percent: this.percents[6] },
    { name: 'Real Estate', percent: this.percents[7] },
    { name: 'Technology', percent: this.percents[8] },
    { name: 'Communication Services', percent: this.percents[9] },
    { name: 'Utilities', percent: this.percents[10] }
  ];

  public sum = (arr: number[]) => {
    this.total = 0;
    for (let i = 0; i < arr.length; i++) {
      this.total += arr[i];
    }
  }

  public onSubmit(form: NgForm) {

    if (this.type === 'percent') {
      this.sum(this.percents);
      if (this.total !==  100) {
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
        this.portfolio[i].percent = this.percents[i];
      }
      console.log(this.portfolio);
      this.submitted = true;
    }
  }
}
