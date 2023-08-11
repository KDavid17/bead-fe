import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { AlertService } from "../../../core/services/alert/alert.service";
import { AuthenticationService } from "../../../core/services/authentication/authentication.service";

import RegisterFormModel from "../../../shared/models/forms/register-form.model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  hide = true;
  registerForm = new FormGroup<RegisterFormModel>({
    firstName: new FormControl("", {validators: [Validators.required], nonNullable: true}),
    lastName: new FormControl("", {validators: [Validators.required], nonNullable: true}),
    email: new FormControl("", {validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl("", {
      validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d\\W]).{8,}$')],
      nonNullable: true
    }),
    confirmPassword: new FormControl("", {
      validators: [Validators.required, this.passwordMatchValidator()],
      nonNullable: true
    }),
  });

  ngOnInit(): void {
    const role = this.authenticationService.getUserLoggedIn().role;

    if (role) {
      this.router.navigateByUrl(`${role}-dashboard`, {replaceUrl: true});
    }
  }

  onSubmit = (): void => {
    const values = this.registerForm.value;

    if (this.registerForm.valid) {
      this.authenticationService.register({
        firstName: values.firstName as string,
        lastName: values.lastName as string,
        email: values.email as string,
        password: values.password as string,
      })
    } else {
      this.alertService.handleErrorMessage("Not all fields have valid inputs!");
    }
  };

  private passwordMatchValidator() {
    return () => {
      if (this.registerForm?.controls.password.value !== this.registerForm?.controls.confirmPassword.value) {
        return {passwordMismatch: 'Passwords do not match'};
      }

      return null;
    }
  }
}
