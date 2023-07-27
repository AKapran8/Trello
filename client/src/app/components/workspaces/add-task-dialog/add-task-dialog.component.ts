import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ITaskDialogData {
  workspaceId: number;
  folderId: number;
}
@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ITaskDialogData) {}


  // const newTask: INewTask = {
  //   title: 'Task title',
  //   description: 'Lorem ipsum',
  // };

    // this._workspaceService
    //   .addTask(this._workspaceId, folderId, newTask)
    //   .pipe(take(1))
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
}
