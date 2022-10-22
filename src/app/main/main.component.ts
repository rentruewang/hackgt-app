import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public inputs = [
    { name: 'input1', placeholder: 'Consumer Discretionary' },
    { name: 'input2', placeholder: 'Consumer Staples' },
    { name: 'input3', placeholder: 'Energy' },
    { name: 'input4', placeholder: 'Financials' },
    { name: 'input5', placeholder: 'Health' },
    { name: 'input6', placeholder: 'Industrials' },
    { name: 'input7', placeholder: 'Materials' },
    { name: 'input8', placeholder: 'Real Estate' },
    { name: 'input9', placeholder: 'Technology' },
    { name: 'input10', placeholder: 'Communication Services' },
    { name: 'input11', placeholder: 'Utilities' }
  ];
  public type: string = 'percent';
  public dollars: Array<number> = [];
  public percents: Array<number> = [];
  public total: number = 0;

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
      console.log(this.percents);
    }
  }
}
