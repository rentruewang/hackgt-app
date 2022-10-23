import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { wordcloud, wordlist } from './wordcloud.model';
import vixWords from '../../../GT_Datasets/vix_word_list.json';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent implements OnInit {
  private words: wordcloud[] = [];
  private date: Date = new Date();
  public minDate: Date = new Date(2014, 0, 1);
  public today: Date = new Date();
  private svg: any;
  private margin = 100;
  private width = 500 - this.margin * 2;
  private height = 500 - this.margin * 1.2;
  private count = {};
  constructor() {
    var key = this.today.toISOString().split('T')[0];
    let wl: wordlist = vixWords as wordlist;
    if (key in wl) {
      this.words = wl[key].Count;
    } else {
      this.width = 500 - this.margin * 2;
      this.height = 500 - this.margin * 1.2;
      this.words = [
        { text: 'Closed', value: 25 },
        { text: 'fermé', value: 15 },
        { text: 'gesloten', value: 15 },
        { text: 'مغلق', value: 15 },
        { text: 'abgeschlossen', value: 15 },
        { text: '閉まっている', value: 15 },
        { text: 'Chiuso', value: 12 },
        { text: 'cerrado', value: 12 },
        { text: 'बंद', value: 24 },
        { text: 'закрыто', value: 12 },
        { text: 'Stock', value: 16 },
        { text: 'Market', value: 16 },
        { text: 'Index', value: 16 },
        { text: 'VIX', value: 16 },
      ];
    }
  }

  onDateChange(event: any) {
    interface Dic {
      [key: string]: Object[];
    }
    console.log(vixWords);
    let wl: wordlist = vixWords as wordlist;
    this.date = event;
    // get the date from this.date and update the wordcloud
    var key = this.date.toISOString().split('T')[0];
    if (key in wl) {
      this.words = wl[key]['Count'];
      this.width = 500 - this.margin * 2;
      this.height = 500 - this.margin * 1.2;
    } else {
      this.width = 500 - this.margin * 2;
      this.height = 500 - this.margin * 1.2;
      this.words = [
        { text: 'Closed', value: 24 },
        { text: 'fermé', value: 15 },
        { text: 'gesloten', value: 15 },
        { text: 'مغلق', value: 15 },
        { text: 'abgeschlossen', value: 15 },
        { text: '閉まっている', value: 15 },
        { text: 'Chiuso', value: 12 },
        { text: 'cerrado', value: 12 },
        { text: 'बंद', value: 24 },
        { text: 'закрыто', value: 12 },
      ];
    }
    // this.words = this.count["Count"] as wordcloud[];
    console.log(this.words);

    const element = document.getElementById('svg');
    element!.remove();
    this.createSvg();
    this.drawCloud();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#cloud')
      .append('svg')
      .attr('id', 'svg')
      .attr('width', this.width + this.margin * 1.2)
      .attr('height', this.height + this.margin * 2)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');
  }

  private drawCloud(): void {
    const w_cloud = cloud()
      .size([this.width, this.height])
      .words(this.words.map((d) => Object.create(d)))
      .padding(0)
      .rotate(0)
      .font('sans-serif')
      .fontSize((d: any) => d.value ** 2 * 0.1)
      .on('word', ({ size, x, y, rotate, text }: any) => {
        this.svg
          .append('text')
          .attr('font-size', size)
          .attr('transform', `translate(${x},${y}) rotate(${rotate})`)
          .text(text);
      });

    w_cloud.start();
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawCloud();
  }
}
