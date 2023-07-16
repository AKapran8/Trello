import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IUserAuthResponse, IUser, INewUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.url}/api/auth`;

  constructor(private _http: HttpClient) {}

  public login(user: IUser): Observable<IUserAuthResponse> {
    return this._http.post<IUserAuthResponse>(`${this.url}/login`, user);
  }

  public register(newUser: INewUser): Observable<IUserAuthResponse> {
    return this._http.post<IUserAuthResponse>(`${this.url}/register`, newUser);
  }

  public logout(): void {
    this._http.get<any>(`${this.url}/logout`);
  }
}
