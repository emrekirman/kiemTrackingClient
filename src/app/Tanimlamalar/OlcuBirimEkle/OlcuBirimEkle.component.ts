import { Component, OnInit } from '@angular/core';
import { DepoOlcuBirim } from '../../../Model/DepoOlcuBirim';
import { OlcuBirimService } from '../../../Services/OlcuBirim.service';
import { Message } from 'primeng/api';
import { timer } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { OlcuBirimDuzenleComponent } from '../OlcuBirimDuzenle/OlcuBirimDuzenle.component';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-OlcuBirimEkle',
  templateUrl: './OlcuBirimEkle.component.html',
  styleUrls: ['./OlcuBirimEkle.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class OlcuBirimEkleComponent implements OnInit {

  constructor(
    private service: OlcuBirimService,
    public dialog: DialogService,
    private confirm: ConfirmationService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private title: Title
  ) { }

  model: DepoOlcuBirim = new DepoOlcuBirim();
  data: DepoOlcuBirim[];
  msgs: Message[] = [];
  ngOnInit() {
    this.verileriGetir();
    this.title.setTitle("Ölçü Birimi Ekle");
  }
  olcuBirimEkle() {  
    this.model.eklenmeTarih = Date.now();
    this.spinner.show();
    this.service.addOlcuBirim(this.model).subscribe(x => {
      this.verileriGetir();
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Ekleme başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Eksik veya hatalı alan girdiniz.");
    })
  }

  olcuBirimSil(id: number) {
    this.spinner.show();
    this.service.delete(id).subscribe(x => {
      this.verileriGetir();
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Silme işlemi başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu.");
    })
  }

  confirmDialog(id: number) {
    this.confirm.confirm({
      message: "Silmek istediğinize emin misiniz ?",
      accept: () => {
        this.olcuBirimSil(id);
      },
      rejectLabel: "Hayır",
      acceptLabel: "Evet"
    })
  }

  verileriGetir() {
    this.spinner.show();
    this.service.getOlcuBirims().subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu");
    })
  }

  dialogAc(olcuId: number) {
    const ref = this.dialog.open(OlcuBirimDuzenleComponent, {
      data: {
        id: olcuId
      },
      header: "Düzenle",
      width: "auto"
    })
  }
}
