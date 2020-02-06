import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quantverbalscore',
  templateUrl: './quantverbalscore.component.html',
  styleUrls: ['./quantverbalscore.component.css']
})
export class QuantverbalscoreComponent implements OnInit {

  @Input() qvprogressbarscores: any;
  @Output() qemittedwidth = new EventEmitter<number>();
  @Output() vemittedwidth = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.qemittedwidth.emit(document.querySelector('#quant_score .progressbar').clientWidth);
    this.vemittedwidth.emit(document.querySelector('#verbal_score .progressbar').clientWidth);
  }

}
