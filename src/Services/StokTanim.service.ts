import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StokTanim } from 'src/Model/StokTanim';
import { HttpReq } from 'src/Model/HttpReq';
import { FisHareketDto } from 'src/Dto/FisHareketDto';

@Injectable({
  providedIn: 'root'
})
export class StokTanimService {

  constructor(private http: HttpClient) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getStokTanims() {
    return this.http.get<StokTanim[]>(this.httpModel.getRequestUrl('rest/stokTanim/getStokTanims'), { headers: { "token": this.token } });
  }

  getLastDepoKod() {
    return this.http.get<string>(this.httpModel.getRequestUrl('rest/stokTanim/depoKod'), { headers: { "token": this.token } });
  }

  addStokTanim(model: StokTanim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/stokTanim/ekle'), model, { headers: { "token": this.token } });
  }

  deleteStokTanim(id: number) {
    return this.http.get(this.httpModel.getRequestUrl('rest/stokTanim/sil/' + id), { headers: { "token": this.token } });
  }

  getBydId(id: number) {
    return this.http.get<StokTanim>(this.httpModel.getRequestUrl('rest/stokTanim/getById/' + id), { headers: { "token": this.token } });
  }

  update(model: StokTanim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/stokTanim/update'), model, { headers: { "token": this.token } });
  }

  getStokMiktarById(id: number) {
    return this.http.get<number>(this.httpModel.getRequestUrl('rest/stokTanim/getStokMiktar/' + id), { headers: { "token": this.token } });
  }

  getGirisCikislar(stokTanimId: number, baslangic: string, bitis: string) {
    return this.http.get<FisHareketDto[]>(this.httpModel.getRequestUrl('rest/stokTanim/getGirisCikislar/' + stokTanimId), { headers: { "baslangic": baslangic, "bitis": bitis, "token": this.token } });
  }

  downloadGirisCikislar(data: FisHareketDto[], baslangic: string, bitis: string) {
    return this.http.post(this.httpModel.getRequestUrl('rest/stokTanim/getGirisCikisRapor'), data, { headers: { "baslangic": baslangic, "bitis": bitis, "token": this.token }, responseType: 'blob' });
  }
}
