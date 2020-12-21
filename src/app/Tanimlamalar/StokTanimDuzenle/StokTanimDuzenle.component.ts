import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StokTanimService } from '../../../Services/StokTanim.service';
import { StokTanim } from 'src/Model/StokTanim';
import { Message } from 'primeng/api';
import { timer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';

@Component({
  selector: 'app-StokTanimDuzenle',
  templateUrl: './StokTanimDuzenle.component.html',
  styleUrls: ['./StokTanimDuzenle.component.scss']
})
export class StokTanimDuzenleComponent implements OnInit {

  constructor(
    private service: StokTanimService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService
  ) { }

  model: StokTanim = new StokTanim();
  msgs: Message[] = [];
  ngOnInit() {
    this.spinner.show();
    this.service.getBydId(this.config.data.id).subscribe(x => {
      this.model = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu");
    })
  }

  updateStokTanim() {
    this.service.update(this.model).subscribe(x => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Mesaj', detail: 'Güncelleme Başarılı' });
      timer(5000).subscribe(x => {
        this.msgs = [];
      })
    })
  }

}
