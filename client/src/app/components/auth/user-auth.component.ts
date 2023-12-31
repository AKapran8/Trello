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

import { AuthService } from './service/auth.service';
import { INewUser, IUser } from './user.model';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public showPassword = false;
  public showRepeatPassword = false;
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
        email: new FormControl<string>('wlyapa@qwe.com', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('wlyapa@qwe.com', [
          Validators.required,
        ]),
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

  public togglePasswordVisibility(repeatPassword?: boolean): void {
    if (repeatPassword) {
      this.showRepeatPassword = !this.showRepeatPassword;
    } else {
      this.showPassword = !this.showPassword;
    }
  }

  public onSubmit(): void {
    if (this.form?.invalid) return;

    const formValue = this.form?.getRawValue();

    const email: string = formValue.email.trim().toLowerCase();
    const password: string = formValue.password.trim();

    if (this.isSignUp) {
      const newUser: INewUser = {
        email,
        password,
        username: formValue.username.trim(),
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
    this._authService.login(user);
  }

  private _signUp(user: INewUser): void {
    this._authService.register(user);
  }

  ngOnDestroy(): void {
    this._paramsSub?.unsubscribe();
    this._repeatPasswordSub?.unsubscribe();
  }
}
