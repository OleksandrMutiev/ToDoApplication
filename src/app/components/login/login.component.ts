import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/magic-links.scss'],
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  public submitted = false;
  public hidePassword = true;
  constructor(
    public authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  ngOnInit() {
    this.globalService.page_title = 'Login Page';

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  private submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe(
      ({ success }) => {
        if (success) {
          this.form.reset();
          this.router.navigate(['/', 'todos']);
        }

        this.submitted = false;
      },
      (error) => (this.submitted = false),
    );
  }
}
