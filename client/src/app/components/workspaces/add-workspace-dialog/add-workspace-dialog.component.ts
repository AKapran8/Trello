import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkspacesService } from '../service/workspaces-service.service';
import { INewWorkspace } from '../workspace.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

interface IData {
  title: string;
  initData?: {
    id: number;
    title: string;
    description: string;
  };
}
@Component({
  selector: 'app-add-workspace-dialog',
  templateUrl: './add-workspace-dialog.component.html',
  styleUrls: ['./add-workspace-dialog.component.scss'],
})
export class AddWorkspaceDialogComponent implements OnInit {
  public title: string = '';
  private _id: number | undefined = undefined;
  public form: FormGroup | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private _workspaceService: WorkspacesService,
    private _dialogRef: MatDialogRef<AddWorkspaceDialogComponent>
  ) {}

  ngOnInit(): void {
    this._initComponent();
    this._initForm();
  }

  private _initComponent(): void {
    this.title = this.data.title;
    this._id = this.data?.initData?.id;
  }

  private _initForm(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.data?.initData?.title || '', [
        Validators.required,
      ]),
      description: new FormControl<string>(
        this.data?.initData?.description || '',
        [Validators.required]
      ),
    });
  }

  public onSubmit(): void {
    if (this.form?.invalid) return;

    const formValues = this.form?.getRawValue();

    if (
      formValues?.title?.trim()?.length &&
      formValues?.description?.trim()?.length
    ) {
      const workspace: INewWorkspace = {
        title: formValues?.title?.trim(),
        description: formValues?.description?.trim(),
      };

      if (this._id) {
        this._workspaceService
          .editWorkspace(this._id, workspace)
          .pipe(take(1))
          .subscribe((_) => {
            this._dialogRef.close(true);
          });
      } else {
        this._workspaceService
          .createWorkspace(workspace)
          .pipe(take(1))
          .subscribe((_) => {
            this._dialogRef.close(true);
          });
      }
    }
  }
}
