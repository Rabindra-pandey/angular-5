import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-totalscore',
  templateUrl: './totalscore.component.html',
  styleUrls: ['./totalscore.component.css']
})
export class TotalscoreComponent implements OnInit {

  @Input() progressbarscores: any;
  @Output() emittedwidth = new EventEmitter<number>();

  constructor() { };

  ngOnInit() {
    this.emittedwidth.emit(document.querySelector('#totalscore .progressbar').clientWidth);
  }

}
