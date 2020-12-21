import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Birim } from 'src/Model/Birim';
import { BirimService } from 'src/Services/Birim.service';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { BirimDuzenleComponent } from '../BirimDuzenle/BirimDuzenle.component';

@Component({
  selector: 'app-BirimEkle',
  templateUrl: './BirimEkle.component.html',
  styleUrls: ['./BirimEkle.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class BirimEkleComponent implements OnInit {

  constructor(
    private service: BirimService,
    public dialog: DialogService,
    private confirm: ConfirmationService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private title: Title
  ) { }

  model: Birim = new Birim();
  data: Birim[] = [];
  msgs: Message[] = [];


  ngOnInit() {
    this.verileriGetir();
    this.title.setTitle("Birim Ekle");
  }

  verileriGetir() {
    this.spinner.show();
    this.service.getAll().subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu");
    })
  }

  sil(id: number) {
    this.spinner.show();
    this.service.delete(id).subscribe(x => {
      this.spinner.hide();
      this.verileriGetir();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Silme işlemi başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu");
    })
  }


  confirmDialog(id: number) {
    this.confirm.confirm({
      message: "Silmek istediğinize emin misiniz ?",
      accept: () => {
        this.sil(id);
      },
      rejectLabel: "Hayır",
      acceptLabel: "Evet"
    })
  }

  dialogAc(Id: number) {
    const ref = this.dialog.open(BirimDuzenleComponent, {
      data: {
        id: Id
      },
      header: "Düzenle",
      width: "auto"
    })
  }

  ekle() {
    this.model.eklenmeTarih = Date.now().toString();
    this.spinner.show();
    this.service.create(this.model).subscribe(x => {
      this.verileriGetir();
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Ekleme başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Eksik veya hatalı alan girdiniz.");
    })
  }

}
