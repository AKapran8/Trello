import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IConfirmDialogData } from './dialog-data.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) {}
}
