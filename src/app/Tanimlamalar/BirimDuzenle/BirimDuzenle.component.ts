import { Message } from 'primeng/api/message'; 
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { timer } from 'rxjs';
import { Birim } from 'src/Model/Birim';
import { BirimService } from 'src/Services/Birim.service';

@Component({
  selector: 'app-BirimDuzenle',
  templateUrl: './BirimDuzenle.component.html',
  styleUrls: ['./BirimDuzenle.component.scss']
})
export class BirimDuzenleComponent implements OnInit {

  constructor(
    private service: BirimService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  model: Birim = new Birim();
  msgs: Message[] = [];

  ngOnInit() {
    this.service.getById(this.config.data.id).subscribe(x => {
      this.model = x;
    })
  }

  update() {
    this.service.update(this.model).subscribe(x => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Mesaj', detail: 'Güncelleme Başarılı' });
      timer(5000).subscribe(x => {
        this.msgs = [];
      })
    });
  }
}
