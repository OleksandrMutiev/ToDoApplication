import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../shared/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss', '../../../shared/magic-links.scss'],
})
export class TodoAddComponent implements OnInit {
  public form: FormGroup;
  public minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private todoService: TodoService,
  ) {
    this.minDate = new Date();
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      text: [this.data ? this.data.text : '', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const time = this.form.value.time.split(':');
    const deadline = moment(new Date(this.form.value.date))
      .add(time[0], 'h')
      .add(time[1], 'm')
      .toDate();

    const todo: Todo = {
      deadline,
      title: this.form.value.title,
      text: this.form.value.text,
      active: this.data ? this.data.active : true,
      archive: this.data ? this.data.archive : false,
      _id: this.data ? this.data._id : null,
    };

    if (this.data) {
      this.todoService.updateTodo(todo).subscribe(() => {
        this.form.reset();
        this.dialogRef.close(true);
      });
    } else {
      this.todoService.addTodo(todo).subscribe((response) => {
        this.form.reset();
        this.dialogRef.close(response);
      });
    }
  }
}
