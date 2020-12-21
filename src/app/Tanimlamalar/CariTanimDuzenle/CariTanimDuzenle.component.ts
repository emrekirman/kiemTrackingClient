import { Component, OnInit } from '@angular/core';
import { CariTanimService } from 'src/Services/CariTanim.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CariTanim } from 'src/Model/CariTanim';
import { timer } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-CariTanimDuzenle',
  templateUrl: './CariTanimDuzenle.component.html',
  styleUrls: ['./CariTanimDuzenle.component.css']
})
export class CariTanimDuzenleComponent implements OnInit {

  constructor(
    private service: CariTanimService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  model: CariTanim = new CariTanim();
  msgs: Message[] = [];
  ngOnInit() {
    this.service.getById(this.config.data.id).subscribe(x => {
      this.model = x;
    })
  }

  updateCariTanim(){
    this.service.update(this.model).subscribe(x=>{
      this.msgs=[];
      this.msgs.push({ severity: 'success', summary: 'Mesaj', detail: 'Güncelleme Başarılı' });
      timer(5000).subscribe(x => {
        this.msgs = [];
      })
    })
  }

}
