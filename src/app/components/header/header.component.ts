import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../shared/magic-links.scss'],
})
export class HeaderComponent implements OnInit {
  public links = [];

  constructor(public authService: AuthService, private router: Router) {
    this.links = [
      {
        name: 'All',
        link: ['/', 'todos'],
      },
      {
        name: 'Done',
        link: ['/', 'todos', 'done'],
      },
      {
        name: 'Active',
        link: ['/', 'todos', 'active'],
      },
      {
        name: 'Archive',
        link: ['/', 'todos', 'archive'],
      },
    ];
  }

  public ngOnInit(): void {}

  private logout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(({ success }) => {
      if (success) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
