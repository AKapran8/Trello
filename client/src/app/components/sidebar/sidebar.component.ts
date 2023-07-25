import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { AddWorkspaceDialogComponent } from '../workspaces/add-workspace-dialog/add-workspace-dialog.component';
import { WorkspacesService } from '../workspaces/service/workspaces-service.service';
import { IWorkspace } from '../workspaces/workspace.model';
import { ConfirmDialog } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  public workspaces: IWorkspace[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _workspacesService: WorkspacesService,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._getWorkspaces();
  }

  private _getWorkspaces(): void {
    this._workspacesService
      .getWorkspaces()
      .pipe(take(1))
      .subscribe((res) => {
        console.log('res ', res.tables);
        if (res?.tables?.length) {
          this.workspaces = [...res.tables];
          this._cdr.markForCheck();
        }
      });
  }

  public addWorkspaceHandler(): void {
    const dialogRef = this._dialog.open(AddWorkspaceDialogComponent, {
      data: {
        title: 'Create Workspace',
      },
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) this._getWorkspaces();
    });
  }

  public deleteWorkspace(id: number, name: string): void {
    const dialogRef = this._dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete Workspace',
        text: `Are you sure want to delete workspace ${name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this._workspacesService
          .removeWorkspace(id)
          .pipe(take(1))
          .subscribe((_) => {
            this._getWorkspaces();
          });
      }
    });
  }

  public editWorkspace(workspace: IWorkspace): void {
    const editableWorkspace = {
      id: workspace.id,
      title: workspace.title,
      description: workspace.description,
    };
    const dialogRef = this._dialog.open(AddWorkspaceDialogComponent, {
      data: {
        title: 'Edit Workspace',
        initData: editableWorkspace,
      },
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) this._getWorkspaces();
    });
  }

  public chooseWorkspace(id: number): void {
    console.log(id)
    this._router.navigate(['workspaces', id])
  }
}
