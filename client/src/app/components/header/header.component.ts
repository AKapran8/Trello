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
  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
