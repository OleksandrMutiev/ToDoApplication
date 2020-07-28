import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoDeleteComponent } from './todo-delete.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [TodoDeleteComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class TodoDeleteModule {}
