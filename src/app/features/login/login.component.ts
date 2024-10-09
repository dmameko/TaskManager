import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { passwordValidator, usernameValidator } from "../../shared/validators/user.validator";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, of, take } from "rxjs";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    HttpClient,
    Router,
    AuthService,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class LoginComponent implements OnInit {
  public registered: boolean = true;

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  public formGroup: FormGroup = this._formBuilder.group({
    username: ['', [Validators.required, usernameValidator()]],
    password: ['', [Validators.required, passwordValidator()]],
  });

  public ngOnInit(): void {
    this._route.data
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => {
        this.registered = data['registered'];
      });
  }

  public submit(): void {
    if (this.registered) {
      this._authService.login(
        this.formGroup.get('username')?.value,
        this.formGroup.get('password')?.value,
      ).pipe(
        take(1),
        catchError(err => {
          console.log(err);
          return of(null);
        }),
      ).subscribe(response => {
        if (response) {
          this._router.navigate(['/', 'home']);
        }
      });
    } else {
      this._authService.register(
        this.formGroup.get('username')?.value,
        this.formGroup.get('password')?.value,
      ).pipe(
        take(1),
        catchError(err => {
          console.log(err);
          return of(null); // Prevent further propagation of the error
        }),
      ).subscribe(response => {
        if (response) {
          this._router.navigate(['/', 'home']);
        }
      });
    }
  }

  public navigateToRegister() {
    this._router.navigate(['/', 'register']);
  }
}
