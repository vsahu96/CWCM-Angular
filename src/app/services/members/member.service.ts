import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }
  wssApiBaseUrl: string = 'http://dev-wss2.cex.uk.webuy.ws/';
  getAppsettings(): Observable<any> {
    const platformId = 11;
    const url = this.wssApiBaseUrl + 'v3/appsettings/prelogin?platformId=' + platformId;
    return this.http.get(url);
  }

  memberRegistration(userData: any): Observable<any> {
    console.log(userData);
    // return;
    const url = this.wssApiBaseUrl + 'v3/members';
    return this.http.post(url, userData);
  }
}
