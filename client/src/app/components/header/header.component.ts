import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/dialog/dialog.component';
import { AuthService } from '../auth/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthorized: boolean = false;

  private _authSub: Subscription | null = null;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getUserAuthStatus();
  }

  private _getUserAuthStatus(): void {
    this.isAuthorized = this._authService.getAuthStatus();
    this._authService.authInfoStream().subscribe((res) => {
      this.isAuthorized = res;
      this._cdr.markForCheck();
    });
    this._cdr.markForCheck();
  }

  logoutHandler(): void {
    const dialogRef = this._dialog.open(ConfirmDialog, {
      data: {
        title: 'Logout',
        text: `Are you sure want to logout?`,
      },
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) this._authService.logout();
    });
  }

  ngOnDestroy(): void {
    this._authSub?.unsubscribe();
  }
}
