import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoService } from '../../services/todo.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { TodoDeleteComponent } from './todo-delete/todo-delete.component';
import { Todo } from '../../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss', '../../shared/magic-links.scss'],
})
export class TodosComponent implements OnInit, AfterViewInit, OnDestroy {
  public todoData;

  public todos = [];
  public statistic: {
    total: number;
    archive: number;
    active: number;
    done: number;
    deadline: number;
  };

  public search$: Subscription;
  public todoSub: Subscription;
  public statisticSub: Subscription;

  public checked: boolean;
  public statisticFieldName: string;
  public paginationValue: 5 | 10 | 25 | 50 = 5;
  public skip = 0;
  public page = 1;
  public sort: string;

  public now = new Date();
  public panelValue = new FormControl('date');

  @ViewChild('search', { static: false }) public search: ElementRef;

  constructor(
    private dialog: MatDialog,
    private todosService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.todoData = this.route.snapshot.data;
  }

  public ngOnInit(): void {
    this.globalService.page_title =
      this.todoData.title.charAt(0).toUpperCase() +
      this.todoData.title.substr(1);

    this.getTodosDataAndStatistic();
  }

  public ngAfterViewInit(): void {
    this.createSearch();
  }

  // Get todos
  public getTodos(search?: string): void {
    this.todoSub = this.selectTodoMethod(
      this.paginationValue,
      (this.page - 1) * this.paginationValue,
      this.sort,
      search,
    ).subscribe(({ success, response }) => {
      if (success) {
        this.todos = response;
      }
    });
  }

  // Get statistic
  public getTodoStatistics(): void {
    this.statisticSub = this.todosService
      .getTodoStatistics()
      .subscribe(({ success, response }) => {
        if (success) {
          this.statistic = response;
        }
      });
  }

  // Create task
  public createTodo(): void {
    this.dialog
      .open(TodoAddComponent, { width: '600px' })
      .afterClosed()
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/', 'todos', 'active']);
          this.getTodosDataAndStatistic();
        }
      });
  }

  // Check task as done/active
  public checkTodo(todo: Todo): void {
    this.checked = true;
    todo.active = !todo.active;

    if (todo.archive) {
      todo.archive = false;
      todo.active = false;
    }

    this.todosService.updateTodo(todo).subscribe(() => {
      this.getTodosDataAndStatistic();
      this.checked = false;
    });
  }

  // Archive task
  public archiveTodo(todo: Todo): void {
    todo.archive = !todo.archive;

    this.todosService.updateTodo(todo).subscribe(() => {
      this.getTodosDataAndStatistic();
      this.checked = false;
    });
  }

  // Edit task
  public editTodo(todo: Todo): void {
    this.dialog
      .open(TodoAddComponent, {
        width: '600px',
        data: todo,
      })
      .afterClosed()
      .subscribe((success) => {
        if (success) {
          this.getTodosDataAndStatistic();
        }
      });
  }

  // Delete task
  // tslint:disable-next-line:variable-name
  public deleteTodo(_id: string): void {
    this.dialog
      .open(TodoDeleteComponent, { width: '600px', data: { _id } })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.getTodosDataAndStatistic();
        }
      });
  }

  // Select which tasks to get according to the route
  // data and set statisticFieldName for paginator length
  public selectTodoMethod(
    limit: number,
    skip: number,
    sort: string,
    search?: string,
  ): Observable<any> {
    if (this.todoData.archive) {
      this.statisticFieldName = 'archive';
      return this.todosService.getArchiveTodos(limit, skip, sort, search);
    } else if (this.todoData.active === undefined) {
      this.statisticFieldName = 'total';
      return this.todosService.getNotArchiveTodos(limit, skip, sort, search);
    } else if (this.todoData.active) {
      this.statisticFieldName = 'active';
      return this.todosService.getActiveTodos(limit, skip, sort, search);
    } else if (this.todoData.active === false) {
      this.statisticFieldName = 'done';
      return this.todosService.getDoneTodos(limit, skip, sort, search);
    } else {
      this.statisticFieldName = 'total';
      return this.todosService.getNotArchiveTodos(limit, skip, sort, search);
    }
  }

  // Change sort and get data
  public changeSort(sortName: string): void {
    this.sort = sortName;
    this.getTodos();
  }

  // Change pagination and get data
  public paginate(pageNumber: number): void {
    this.page = pageNumber;
    this.getTodos();
  }

  // Change limit and get data
  public changeLimit(limit: 5 | 10 | 25 | 50): void {
    this.paginationValue = limit;
    const maxPage = Math.ceil(
      this.statistic[this.statisticFieldName] / this.paginationValue,
    );
    if (this.page > maxPage) {
      this.page = maxPage;
    }
    this.getTodos();
  }

  // Create search on input
  public createSearch(): void {
    this.search$ = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((text: string) => this.getTodos(text));
  }

  // Get both tododata and statistic
  public getTodosDataAndStatistic() {
    this.getTodoStatistics();
    this.getTodos();
  }

  public ngOnDestroy(): void {
    if (this.statisticSub) {
      this.statisticSub.unsubscribe();
    }
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
    if (this.search$) {
      this.search$.unsubscribe();
    }
  }
}
