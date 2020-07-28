import { Component, Inject, OnDestroy } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: [
    './todo-delete.component.scss',
    '../../../shared/magic-links.scss',
  ],
})
export class TodoDeleteComponent implements OnDestroy {
  private sub: Subscription;
  constructor(
    public dialogRef: MatDialogRef<TodoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
  ) {}

  public deleteTodo(): void {
    this.sub = this.todoService.deleteTodo(this.data._id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
