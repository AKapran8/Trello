import { Component } from '@angular/core';
import { WorkspacesService } from '../service/workspaces-service.service';

@Component({
  selector: 'app-workspaces-list',
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.scss']
})
export class WorkspacesListComponent {
  public workspace: any[] = [
    {
      title: 'Workspace 1',
    },
    {
      title: 'Workspace 2',
    },
    {
      title: 'Workspace 3',
    },
    {
      title: 'Workspace 4',
    },
    {
      title: 'Workspace 5',
    },
  ]

  constructor(private _workspacesService: WorkspacesService) {

  }

  getWorspaces(): void {
    this._workspacesService.getWorkspaces().subscribe(res => {
      console.log(res);
    })
  }

}
