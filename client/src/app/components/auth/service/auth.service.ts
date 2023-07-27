import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IUserAuthResponse, IUser, INewUser } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = '/auth';

  private _isAuth: boolean = false;
  private _authStatusListener = new Subject<boolean>();

  constructor(private _router: Router, private _http: HttpClient) {}

  public getAuthStatus(): boolean {
    const userId: string = JSON.parse(
      JSON.stringify(localStorage.getItem('userId'))
    );

    this._isAuth = !!(userId && Number(userId));
    return this._isAuth;
  }

  public authInfoStream(): Observable<boolean> {
    return this._authStatusListener.asObservable();
  }

  public login(user: IUser): void {
    this._http
      .post<IUserAuthResponse>(`${this._url}/login`, user)
      .pipe(take(1))
      .subscribe((res) => {
        if (res?.id) this._authEvent(res.id);
      });
  }

  public register(newUser: INewUser): void {
    this._http
      .post<IUserAuthResponse>(`${this._url}/register`, newUser)
      .pipe(take(1))
      .subscribe((res) => {
        if (res?.id) this._authEvent(res.id);
      });
  }

  public logout(): void {
    this._http
      .post<string>(`${this._url}/logout`, {})
      .pipe(take(1))
      .subscribe((res) => {
        this._authEvent();
      });
  }

  private _authEvent(id?: number): void {
    if (!id) {
      localStorage.removeItem('userId');
      this._authStatusListener.next(false);
      this._isAuth = false;
      return;
    }
    this._router.navigate(['']);
    localStorage.setItem('userId', JSON.stringify(id));
    this._authStatusListener.next(true);
    this._isAuth = true;
  }
}
