import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAppsettings(): Observable<any> {
    const platformId = 11;
    const url = 'https://wss2.cex.uk.webuy.io/v3/appsettings/prelogin?platformId=' + platformId;
    return this.http.get(url);
  }

  memberRegistration(userData: any): Observable<any> {
    console.log(userData);
    // return;
    const url = 'https://wss2.cex.uk.webuy.io/v3/members';
    return this.http.post(url, userData);
  }
}
