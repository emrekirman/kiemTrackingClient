import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor() { }

  //Servisten dönen blob tipindeki dosyanın client tarafında download edilmesini sağlar.
  //Servise bağlanırken http modülünde dönüş tipi blob ayarlanmalıdır.
  downloadToLocal(blob: Blob, dosyaAdi: string) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.href = url;
    a.download = dosyaAdi;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
