import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Todo } from '../shared/interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TodoService {
  constructor(private http: HttpService) {}

  public addTodo(todo: Todo): Observable<Todo> {
    return this.http.post(`/todos/create`, todo);
  }

  public getNotArchiveTodos(
    limit: number,
    skip: number,
    sort: string,
    search?: string,
  ): Observable<Todo[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search);
    }
    return this.http.get(
      `/todos/unarchive?sort=${sort}&skip=${skip}&limit=${limit}`,
      { params },
    );
  }

  public getArchiveTodos(
    limit: number,
    skip: number,
    sort: string,
    search?: string,
  ): Observable<Todo[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search);
    }
    return this.http.get(
      `/todos/archive?sort=${sort}&skip=${skip}&limit=${limit}`,
      { params },
    );
  }

  public getActiveTodos(
    limit: number,
    skip: number,
    sort: string,
    search?: string,
  ): Observable<Todo[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search);
    }
    return this.http.get(
      `/todos/active?sort=${sort}&skip=${skip}&limit=${limit}`,
      { params },
    );
  }

  public getDoneTodos(
    limit: number,
    skip: number,
    sort: string,
    search?: string,
  ): Observable<Todo[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search);
    }
    return this.http.get(
      `/todos/done?sort=${sort}&skip=${skip}&limit=${limit}`,
      { params },
    );
  }

  public deleteTodo(id: string): Observable<void> {
    return this.http.delete(`/todos/delete/${id}`);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put(`/todos/update/${todo._id}`, todo);
  }

  public getTodoStatistics(): Observable<any> {
    return this.http.get(`/todos/statistic`);
  }
}
