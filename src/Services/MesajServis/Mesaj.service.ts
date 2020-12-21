import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MesajTipi } from './MesajTipi.enum';

@Injectable({
  providedIn: 'root'
})
export class MesajService {

  constructor(
    private message: MessageService
  ) { }

  mesajBas(key: string = "toast", tipi: MesajTipi, durum: string, detay: string) {
    let mesajTipi: string;
    switch (tipi) {
      case MesajTipi.Basarili:
        mesajTipi = "success"
        break;
      case MesajTipi.Hata:
        mesajTipi = "error"
        break;
      case MesajTipi.Uyari:
        mesajTipi = "warning"
        break;
      default:
        mesajTipi = "error";
        break;
    }
    this.message.add({ key: key, severity: mesajTipi, summary: durum, detail: detay });
  }

}
