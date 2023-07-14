import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public isSignUp: boolean = false;
  public form: FormGroup | null = null;

  private _paramsSub: Subscription | null = null;
  private _repeatPasswordSub: Subscription | undefined = undefined;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._paramsSub = this._route.params.subscribe((res: Params) => {
      this.isSignUp = res['key'] === 'sign-up';
      this._initForm();
    });
  }

  private _initForm(): void {
    if (this.isSignUp) {
      this.form = new FormGroup({
        username: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        repeatPassword: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });

      this._setRepeatPassSubscription();
    } else {
      this.form = new FormGroup({
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('', [Validators.required]),
      });
    }

    this._cdr.markForCheck();
  }

  private _setRepeatPassSubscription(): void {
    if (!this.form) return;

    this._repeatPasswordSub = this.form
      .get('repeatPassword')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        const repeatPasswordControl = this.form?.get('repeatPassword');
        const passwordControl = this.form?.get('password');

        if (value !== passwordControl?.value) {
          repeatPasswordControl!.setErrors({ passwordMismatch: true });
        } else {
          repeatPasswordControl!.setErrors(null);
        }

        this._cdr.markForCheck();
      });
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    const formValue = this.form?.getRawValue();

    if (this.isSignUp) {
      const newUser = {
        username: formValue.username.trim(),
        email: formValue.username.trim().toLowerCase(),
        password: formValue.username.trim(),
        repeatPassword: formValue.username.trim(),
      };
      this._signUp(newUser);
    } else {
      const user = {
        username: formValue.email.trim(),
        password: formValue.password.trim(),
      };
      this._login(user);
    }
  }

  private _login(user: any): void {
    this._authService
      .login(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {},
        error(err) {},
      });
  }

  private _signUp(user: any): void {
    this._authService
      .signup(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {},
        error(err) {},
      });
  }

  ngOnDestroy(): void {
    this._paramsSub?.unsubscribe();
    this._repeatPasswordSub?.unsubscribe();
  }
}
