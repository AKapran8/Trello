import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.url}/api/auth`;

  constructor(private _http: HttpClient) {}

  public login(user: IUser): Observable<any> {
    return this._http.post<any>(`${this.url}/login`, { body: user });
  }
}
