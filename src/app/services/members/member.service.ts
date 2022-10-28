import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  private wssApiBaseUrl: string = 'http://dev-wss2.cex.uk.webuy.test:81/';

  getAppsettings(): Observable<any> {
    const platformId = 11;
    const url = this.wssApiBaseUrl + 'v3/appsettings/prelogin?platformId=' + platformId;
    return this.http.get(url);
  }

  memberRegistration(userData: any): Observable<any> {
    const url = this.wssApiBaseUrl + 'v3/rabbitmq';
    return this.http.post(url, userData);
  }

  memberBulkRegistration(file: File): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('BulkMemberRegister', file, file.name);

    let headers = {
      'Content-Type': 'multipart/form-data',
      'charset': 'utf-8',
      'boundary': Math.random().toString().substr(2),
      'Accept': 'application/json',
      'reportProgress': true
    };

    const url = this.wssApiBaseUrl + 'v3/rabbitmq';

    return this.http.post(url, formData, headers);
  }

}
