import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpReq } from 'src/Model/HttpReq';
import { DepoFis } from 'src/Model/DepoFis';
import { StokMevcuduDto } from 'src/Dto/StokMevcuduDto';
import { FaturaListeVM } from 'src/Dto/FaturaListeVM';

@Injectable({
  providedIn: 'root'
})
export class FaturaGirisService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getFisNo() {
    return this.http.get<number>(this.httpModel.getRequestUrl('rest/depoFis/getFisNo'), { headers: { "token": this.token } })
  }

  createFis(model: DepoFis) {
    return this.http.post<DepoFis>(this.httpModel.getRequestUrl('rest/depoFis/create'), model, { headers: { "token": this.token } })
  }

  getAll(giris: boolean) {
    return this.http.get<FaturaListeVM[]>(this.httpModel.getRequestUrl('rest/depoFis/getAll/' + giris), { headers: { "token": this.token } })
  }

  createCikisFis(model: DepoFis) {
    return this.http.post<number>(this.httpModel.getRequestUrl('rest/depoFis/createCikisFis'), model, { headers: { "token": this.token } });
  }

  getStokMevcudu() {
    return this.http.get<StokMevcuduDto[]>(this.httpModel.getRequestUrl('rest/depoFis/getStokMevcudu'), { headers: { "token": this.token } });
  }

  getById(id: number) {
    return this.http.get<DepoFis>(this.httpModel.getRequestUrl('rest/depoFis/getById/') + id, { headers: { "token": this.token } });
  }

  update(model: DepoFis) {
    return this.http.post<DepoFis>(this.httpModel.getRequestUrl('rest/depoFis/update'), model, { headers: { "token": this.token } });
  }

  download(list: StokMevcuduDto[]) {
    return this.http.get(this.httpModel.getRequestUrl('rest/depoFis/download'), { headers: { "token": this.token }, responseType: 'blob' });
  }

}
