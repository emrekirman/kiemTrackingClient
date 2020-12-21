import { Component, OnInit } from '@angular/core';
import { OlcuBirimService } from '../../../Services/OlcuBirim.service';
import { DepoOlcuBirim } from 'src/Model/DepoOlcuBirim';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Message } from 'primeng/api/message';
import { timer } from 'rxjs';

@Component({
  selector: 'app-OlcuBirimDuzenle',
  templateUrl: './OlcuBirimDuzenle.component.html',
  styleUrls: ['./OlcuBirimDuzenle.component.scss'],

})
export class OlcuBirimDuzenleComponent implements OnInit {

  constructor(
    private service: OlcuBirimService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  model: DepoOlcuBirim = new DepoOlcuBirim();
  msgs: Message[] = [];
  ngOnInit() {
    this.service.getById(this.config.data.id).subscribe(x => {
      this.model = x;
    })
  }

  updateDepoOlcuBirim() {
    this.service.update(this.model).subscribe(x => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Mesaj', detail: 'Güncelleme Başarılı' });
      timer(5000).subscribe(x => {
        this.msgs = [];
      })
    });
  }

}
