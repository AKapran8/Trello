import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { INewWorkspace, IWorkspaceResponse } from '../workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesService {
  private _url: string = '/table';

  constructor(private _http: HttpClient) {}

  public createWorkspace(workspace: INewWorkspace): Observable<any> {
    return this._http.post<any>(this._url, workspace);
  }

  public getWorkspaces(): Observable<IWorkspaceResponse> {
    return this._http.get<IWorkspaceResponse>(this._url);
  }

  public removeWorkspace(id: number): Observable<any> {
    return this._http.delete<IWorkspaceResponse>(`${this._url}/${id}`);
  }

  public editWorkspace(id: number, body: any): Observable<any> {
    return this._http.put<IWorkspaceResponse>(`${this._url}/${id}`, body);
  }
}
