import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class GlobalService {
  private pageTitle: string;
  private userId: string;

  set page_title(title: string) {
    this.pageTitle = title;
    this.titleService.setTitle(title);
  }

  get page_title(): string {
    return this.pageTitle;
  }

  set user_id(value: string) {
    this.userId = value;
  }

  get user_id(): string {
    return this.userId;
  }

  constructor(private titleService: Title) {}
}
