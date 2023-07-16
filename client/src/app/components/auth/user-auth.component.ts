import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { INewUser, IUser, IUserAuthResponse } from './user.model';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public isSubmitting: boolean = false;
  public isSignUp: boolean = false;
  public form: FormGroup | null = null;

  private _paramsSub: Subscription | null = null;
  private _repeatPasswordSub: Subscription | undefined = undefined;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router
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
        username: new FormControl<string>('' /*[Validators.required]*/),
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
    if (this.form?.invalid) return;

    this.isSubmitting = true;

    const formValue = this.form?.getRawValue();

    const email: string = formValue.email.trim().toLowerCase();
    const password: string = formValue.password.trim();

    if (this.isSignUp) {
      const newUser: INewUser = {
        email,
        password,
        // username: formValue.username.trim(),
      };
      this._signUp(newUser);
    } else {
      const user: IUser = {
        email,
        password,
      };
      this._login(user);
    }

    this._cdr.markForCheck();
  }

  private _login(user: IUser): void {
    this._authService
      .login(user)
      .pipe(
        take(1),
        catchError((error: any) => {
          this.isSubmitting = false;
          return [];
        })
      )
      .subscribe({
        next: (res: IUserAuthResponse) => {
          if (res.id) {
            this._router.navigate(['']);
            this.isSubmitting = false;
          }
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this._cdr.markForCheck();
        },
      });
  }

  private _signUp(user: INewUser): void {
    this._authService
      .register(user)
      .pipe(
        take(1),
        catchError((error: any) => {
          this.isSubmitting = false;
          return [];
        })
      )
      .subscribe({
        next: (res: IUserAuthResponse) => {
          if (res.id) {
            this._router.navigate(['']);
            this.isSubmitting = false;
          }
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this._cdr.markForCheck();
        },
      });
  }

  ngOnDestroy(): void {
    this._paramsSub?.unsubscribe();
    this._repeatPasswordSub?.unsubscribe();
  }
}
