import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../../shared/magic-links.scss'],
})
export class RegistrationComponent implements OnInit {
  private form: FormGroup;
  private submitted = false;
  public hidePassword = true;
  public hideConfirm = true;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
  ) {}

  public ngOnInit(): void {
    this.globalService.page_title = 'Registration Page';

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      firstName: [''],
      lastName: [''],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', RxwebValidators.compare({ fieldName: 'password' })],
      }),
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    if (
      this.form.get('passwords.password').value ===
      this.form.get('passwords.confirm').value
    ) {
      const user: User = {
        email: this.form.value.email,
        password: this.form.value.passwords.password,
        login: this.form.value.login,
        firstName: this.form.value.firstName || '',
        lastName: this.form.value.lastName || '',
      };

      this.authService.register(user).subscribe(
        ({ success }) => {
          this.submitted = false;
          if (!success) {
            return;
          }

          this.authService.login(user).subscribe((response) => {
            if (response.success) {
              this.form.reset();
              this.router.navigate(['/']);
            }
          });
        },
        (error) => (this.submitted = false),
      );
    }
  }
}
