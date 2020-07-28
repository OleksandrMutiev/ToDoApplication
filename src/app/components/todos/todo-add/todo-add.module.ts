import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoAddComponent } from './todo-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { TodoService } from '../../../services/todo.service';

@NgModule({
  declarations: [TodoAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  exports: [TodoAddComponent],
  providers: [TodoService, MatDatepickerModule],
  entryComponents: [TodoAddComponent],
})
export class TodoAddModule {}
