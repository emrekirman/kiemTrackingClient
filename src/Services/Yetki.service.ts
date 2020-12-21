import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Yetki } from 'src/Model/Yetki';
import { HttpReq } from 'src/Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class YetkiService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getYetkis() {
    return this.http.get<Yetki[]>(this.httpModel.getRequestUrl('/rest/yetki/getAll'), { headers: { "token": this.token } });
  }

}
