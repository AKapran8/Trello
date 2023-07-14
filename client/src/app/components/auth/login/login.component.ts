import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { IUser } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public form: FormGroup | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      login: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  public submitFormHandler(): void {
    if (!this.form?.valid) return;

    const user: IUser = {
      login: this.form?.getRawValue()?.login.trim(),
      password: this.form?.getRawValue()?.login.trim(),
    };

    this._authService
      .login(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {},
        error: (err) => {},
      });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this._cdr.markForCheck();
  }
}
