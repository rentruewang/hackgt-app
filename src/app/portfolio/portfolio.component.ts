import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { Portfolio } from './portfolio.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  // @Input() portfolio: Array<Portfolio> = [{ name: 'hi', percent: 0, type: "1" }, { name: 'hi', percent: 0, type: "2" }];
  @Input() portfolio: Array<Portfolio> = [];
  private svg: any;
  private margin = 100;
  private width = 900 - (this.margin * 2);
  private height = 500 - (this.margin * 1.2);
  constructor() { }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin / 5 + ")");
  }

  private drawBars(data: Array<Portfolio>): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const z = d3.scaleBand()
      .range([0, x.bandwidth()])
      .domain(data.map(d => d.type))
      .padding(0.1);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: Portfolio) => (x(d.name) as number) + (z(d.type) as number))
      .attr("y", (d: Portfolio) => y(d.percent))
      .attr("width", z.bandwidth())
      .attr("height", (d: Portfolio) => this.height - y(d.percent))
      .attr("fill", (d: Portfolio) => d.type === '1' ? "#363535" : "#3F51B5");
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.portfolio);
  }
}
