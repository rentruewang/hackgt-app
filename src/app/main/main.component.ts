import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public inputs = [
    { name: 'input1', placeholder: 'Input 1' },
    { name: 'input2', placeholder: 'Input 2' },
    { name: 'input3', placeholder: 'Input 3' },
    { name: 'input4', placeholder: 'Input 4' },
    { name: 'input5', placeholder: 'Input 5' },
    { name: 'input6', placeholder: 'Input 6' },
    { name: 'input7', placeholder: 'Input 7' },
    { name: 'input8', placeholder: 'Input 8' },
    { name: 'input9', placeholder: 'Input 9' },
    { name: 'input10', placeholder: 'Input 10' },
    { name: 'input11', placeholder: 'Input 11' }
  ];
  public type: string = 'percent';
  public dollars: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public percents: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
      if (this.total !== 100) {
        alert('Percentages must add up to 100%');
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
