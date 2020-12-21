import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { StokMevcuduDto } from 'src/Dto/StokMevcuduDto';
import { FaturaGirisService } from 'src/Services/FaturaGiris.service';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { FileDownloadService } from '../../../Services/FileService/FileDownload.service';

@Component({
  selector: 'app-StokMevcudu',
  templateUrl: './StokMevcudu.component.html',
  styleUrls: ['./StokMevcudu.component.css']
})
export class StokMevcuduComponent implements OnInit {

  @Input() maxKayitSayisi: number = 8;

  constructor(
    private service: FaturaGirisService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private fileDownloadService: FileDownloadService,
    private title: Title
  ) { }

  data: StokMevcuduDto[] = [];
  ngOnInit() {
    this.title.setTitle("Stok Mevcudu");
    this.spinner.show();
    this.service.getStokMevcudu().subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu.");
    });
  }

  download() {
    this.spinner.show();
    this.service.download(this.data).subscribe(x => {
      this.fileDownloadService.downloadToLocal(x, "StokMevcudu.xlsx");
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Rapor indirildi.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Rapor indirilmede bir hata oluştu.");
    })
  }

}
