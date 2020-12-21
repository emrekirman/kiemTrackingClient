import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpReq } from 'src/Model/HttpReq';
import { IslemCesidi } from '../Model/IslemCesidi';

@Injectable({
  providedIn: 'root'
})
export class IslemCesidiService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getAll() {
    return this.http.get<IslemCesidi[]>(this.httpModel.getRequestUrl('rest/islemCesidi/getAll'), { headers: { "token": this.token } });
  }

}
