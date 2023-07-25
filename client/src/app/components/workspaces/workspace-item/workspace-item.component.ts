import { take } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspacesService } from '../service/workspaces-service.service';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
  styleUrls: ['./workspace-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceItemComponent implements OnInit, OnDestroy {
  private _workspaceId: number = 0;
  private _routerSub: Subscription | null = null;

  constructor(
    private _workspaceService: WorkspacesService,
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
        console.log(res);
      });
  }

  public addFolderHandler(): void {

  }

  ngOnDestroy(): void {
    this._routerSub?.unsubscribe();
  }
}
