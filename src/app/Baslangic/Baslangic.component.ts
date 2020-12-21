import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Baslangic',
  templateUrl: './Baslangic.component.html',
  styleUrls: ['./Baslangic.component.css']
})
export class BaslangicComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Başlangıç");
  }

}
