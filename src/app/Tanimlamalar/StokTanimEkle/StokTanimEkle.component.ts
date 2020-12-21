import { Component, OnInit } from '@angular/core';
import { StokTanim } from '../../../Model/StokTanim';
import { StokTanimService } from '../../../Services/StokTanim.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StokTanimDuzenleComponent } from '../StokTanimDuzenle/StokTanimDuzenle.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-StokTanimEkle',
  templateUrl: './StokTanimEkle.component.html',
  styleUrls: ['./StokTanimEkle.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class StokTanimEkleComponent implements OnInit {

  constructor(
    private service: StokTanimService,
    public dialog: DialogService,
    private confirm: ConfirmationService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private title: Title
  ) { }

  model: StokTanim = new StokTanim();
  data: StokTanim[] = [];
  msgs: Message[] = [];
  ngOnInit() {
    this.verileriGetir();
    this.title.setTitle("Stok Tanımı Ekle");
  }

  stokTanimEkle() {
    this.model.eklenmeTarih = Date.now();
    this.service.getLastDepoKod().subscribe(x => {
      this.model.depoKod = "Depo-" + (parseInt(x) + 1);
      this.spinner.show();
      this.service.addStokTanim(this.model).subscribe(x => {
        this.verileriGetir();
        this.spinner.hide();
        this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Ekleme başarılı.");
      }, err => {
        this.spinner.hide();
        this.mesajService.mesajBas("toast",MesajTipi.Hata,"Durum","Eksik veya hatalı alan girdiniz.");
      });
    })
  }

  sonKodGetir(): number {
    let sayi: number = 0;
    this.service.getLastDepoKod().subscribe(x => {
      sayi = parseInt(x);
    })
    return sayi;
  };


  dialogAc(stokId: number) {
    const ref = this.dialog.open(StokTanimDuzenleComponent, {
      data: {
        id: stokId
      },
      header: "Düzenle",
      width:"auto"
    })
  }

  stokTanimSil(id: number) {
    this.spinner.show();
    this.service.deleteStokTanim(id).subscribe(x => {
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
        this.stokTanimSil(id);
      },
      rejectLabel: "Hayır",
      acceptLabel: "Evet"
    })
  }

  verileriGetir() {
    this.spinner.show();
    this.service.getStokTanims().subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu");
    })
  }


}
