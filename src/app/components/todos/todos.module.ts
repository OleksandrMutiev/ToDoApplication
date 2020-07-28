import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodosComponent } from './todos.component';
import { TodosRoutingModule } from './todos-routing.module';
import {
  MatBadgeModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoAddModule } from './todo-add/todo-add.module';
import { TodoService } from '../../services/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoDeleteComponent } from './todo-delete/todo-delete.component';
import { TodoDeleteModule } from './todo-delete/todo-delete.module';
import { MatSelectModule } from '@angular/material/select';
import { CustomDatePipe } from '../../shared/customDate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [TodosComponent, CustomDatePipe],
  imports: [
    CommonModule,
    TodosRoutingModule,
    TodoAddModule,
    TodoDeleteModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [TodoService],
  entryComponents: [TodoAddComponent, TodoDeleteComponent],
})
export class TodosModule {}
