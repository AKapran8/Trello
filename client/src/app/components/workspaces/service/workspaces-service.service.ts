import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {
  private _url: string = `${environment.url}/api/table`;

  constructor(private _http: HttpClient) { }

  public getWorkspaces(): Observable<any> {
    return this._http.get(this._url)
  }
}
