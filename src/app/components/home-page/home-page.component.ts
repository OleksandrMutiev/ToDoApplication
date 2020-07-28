import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', '../../shared/magic-links.scss'],
})
export class HomePageComponent {
  constructor(private globalService: GlobalService) {
    this.globalService.page_title = 'ToDoApp';
  }
}
