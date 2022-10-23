import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";
import cloud from "d3-cloud";

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit {
  @Input() words: { text: string; value: number; }[] = [{ 'text': 'said', 'value': 22 }, { 'text': 'end', 'value': 13 }, { 'text': 'look', 'value': 18 }, { 'text': 'consider', 'value': 16 }, { 'text': 'after', 'value': 12 }, { 'text': 'under', 'value': 11 }, { 'text': 'story', 'value': 11 }, { 'text': 'over', 'value': 17 }, { 'text': 'up', 'value': 33 }, { 'text': 'got', 'value': 19 }, { 'text': 'weeks', 'value': 11 }, { 'text': 'few', 'value': 12 }, { 'text': 'conclusion', 'value': 11 }, { 'text': 'seen', 'value': 12 }, { 'text': 'risk', 'value': 19 }, { 'text': 'country', 'value': 16 }, { 'text': 'states', 'value': 17 }, { 'text': 'being', 'value': 13 }, { 'text': 'president', 'value': 18 }, { 'text': 'out', 'value': 15 }, { 'text': 'back', 'value': 15 }, { 'text': 'people', 'value': 24 }, { 'text': 'speak', 'value': 12 }, { 'text': 'everyone', 'value': 18 }];

  private svg: any;
  private margin = 100;
  private width = 500 - (this.margin * 2);
  private height = 500 - (this.margin * 1.2);
  constructor() { }

  private createSvg(): void {
    this.svg = d3.select("figure#cloud")
      .append("svg")
      .attr("width", this.width + (this.margin * 1.2))
      .attr("height", this.height + (this.margin * 2))
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");
  }

  private drawCloud(): void {
    // var hello = this.words
    // .trim()
    // .split(/[\s.]+/g)
    // .map((w) => w.replace(/^[“‘"\-—()[\]{}]+/g, ""))
    // .map((w) => w.replace(/[;:.!?()[\]{},"'’”\-—]+$/g, ""))
    // .map((w) => w.replace(/['’]s$/g, ""))
    // .map((w) => w.substring(0, 30))
    // .map((w) => w.toLowerCase());

    // var data = d3
    // .rollups(
    //   hello,
    //   (group) => group.length,
    //   (w) => w
    // )
    // .sort(([, a], [, b]) => d3.descending(a, b))
    // .slice(0, 250)
    // .map(([text, value]) => ({ text, value }));

    const w_cloud = cloud()
      .size([this.width, this.height])
      .words(this.words.map((d) => Object.create(d)))
      .padding(0)
      .rotate(0)
      .font("sans-serif")
      .fontSize((d: any) => d.value**2 * 0.1)
      .on("word", ({ size, x, y, rotate, text }: any) => {
        this.svg
          .append("text")
          .attr("font-size", size)
          .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
          .text(text);
      });

    w_cloud.start();
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawCloud();
  }

}
