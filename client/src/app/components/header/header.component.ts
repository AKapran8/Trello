import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/dialog/dialog.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isAuthorized: boolean = false;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._checkUserValidity();
  }

  private _checkUserValidity(): void {
    const userId: string = JSON.parse(
      JSON.stringify(localStorage.getItem('userId'))
    );
    if (userId && Number(userId)) {
      this.isAuthorized = true;
    }
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
}
