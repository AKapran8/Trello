import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-workspace-dialog',
  templateUrl: './add-workspace-dialog.component.html',
  styleUrls: ['./add-workspace-dialog.component.scss'],
})
export class AddWorkspaceDialogComponent implements OnInit {
  public form: FormGroup | null = null;

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
    });
  }

  public onSubmit(): void {}
}
