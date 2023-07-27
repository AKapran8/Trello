import { take } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspacesService } from '../service/workspaces-service.service';
import { INewTask, IWorkspace } from '../workspace.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AddTaskDialogComponent,
  ITaskDialogData,
} from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
  styleUrls: ['./workspace-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceItemComponent implements OnInit, OnDestroy {
  @ViewChild('folderNameInput') folderNameInput: ElementRef | null = null;

  public showAddNewFolder: boolean = false;
  public workspace: IWorkspace | null = null;
  public folderNameControl: FormControl | null = null;

  private _workspaceId: number = 0;
  private _routerSub: Subscription | null = null;

  constructor(
    private _workspaceService: WorkspacesService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._getWorkspaceId();
  }

  private _getWorkspaceId(): void {
    this._routerSub = this._route.params.subscribe((res: Params) => {
      this._workspaceId = +res['id'];

      if (this._workspaceId) this._getCurrentWorkspace();
    });
  }

  private _getCurrentWorkspace(): void {
    this._workspaceService
      .getWorkspaceById(this._workspaceId)
      .pipe(take(1))
      .subscribe((res) => {
        this.workspace = res.table;
        this._cdr.markForCheck();
      });
  }

  public addFolderBlock(): void {
    this.showAddNewFolder = true;
    this.folderNameControl = new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(2),
    ]);
    setTimeout(() => {
      this.folderNameInput?.nativeElement.focus();
    }, 0);
    this._cdr.markForCheck();
  }

  public addNewFolder(): void {
    if (this.folderNameControl?.invalid) return;

    const value: string = this.folderNameControl?.value?.trim();

    if (!value) return;

    this._workspaceService
      .addNewFolder(this._workspaceId, value)
      .pipe(take(1))
      .subscribe((res) => {
        this.folderNameControl?.setValue('');
        this.showAddNewFolder = false;
        this.workspace?.Folders?.push(res.folder);
        this._cdr.markForCheck();
      });
  }

  public deleteFolder(folderId: number): void {
    this._workspaceService
      .deleteFolder(this._workspaceId, folderId)
      .pipe(take(1))
      .subscribe((res) => {
        this.showAddNewFolder = false;
        this.workspace!.Folders =
          this.workspace?.Folders?.filter((f) => f.id !== folderId) || [];
        this._cdr.markForCheck();
      });
  }

  public addNewTask(folderId: number): void {
    const dialogRef = this._dialog.open(AddTaskDialogComponent, {
      data: {
        workspaceId: this._workspaceId,
        folderId,
      } as ITaskDialogData,
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {});
  }

  ngOnDestroy(): void {
    this._routerSub?.unsubscribe();
  }
}
