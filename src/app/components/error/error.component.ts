import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  public error: string;

  constructor(private router: Router, private meta: Meta) {
    this.error = router.url.split('/').pop();
    this.meta.addTag({ 'http-equiv': 'refresh', content: '3;url=/' });
  }
}
