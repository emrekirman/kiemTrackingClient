import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, Message } from 'primeng/api';
import { CariTanimService } from 'src/Services/CariTanim.service';
import { CariTanim } from 'src/Model/CariTanim';
import { CariTanimDuzenleComponent } from '../CariTanimDuzenle/CariTanimDuzenle.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-CariTanimEkle',
  templateUrl: './CariTanimEkle.component.html',
  styleUrls: ['./CariTanimEkle.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class CariTanimEkleComponent implements OnInit {

  constructor(
    private service: CariTanimService,
    public dialog: DialogService,
    private confirm: ConfirmationService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private title: Title
  ) { }

  model: CariTanim = new CariTanim();
  data: CariTanim[] = [];
  msgs: Message[] = [];
  ngOnInit() {
    this.verileriGetir();
    this.title.setTitle("Cari Tanım Ekle");
  }

  verileriGetir() {
    this.spinner.show();
    this.service.getAll().subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu.");
    })
  }

  cariTanimEkle() {
    this.model.eklenmeTarih = Date.now();
    this.spinner.show();
    this.service.addCariTanim(this.model).subscribe(x => {
      this.verileriGetir();
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Ekleme başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Eksik veya hatalı giriş.");
    })
  }

  dialogAc(cariId: number) {
    const ref = this.dialog.open(CariTanimDuzenleComponent, {
      data: {
        id: cariId
      },
      header: "Düzenle",
      width: "auto"
    })
  }

  confirmDialog(id: number) {
    this.confirm.confirm({
      message: "Silmek istediğinize emin misiniz ?",
      accept: () => {
        this.cariTanimSil(id);
      },
      rejectLabel: "Hayır",
      acceptLabel: "Evet"
    })
  }

  cariTanimSil(id: number) {
    this.spinner.show();
    this.service.delete(id).subscribe(x => {
      this.verileriGetir();
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Silme işlemi başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Silme işlemi sırasında bir sorun oluştu.");
    })
  }

}
