import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { AuthenticationService } from "../../../core/services/authentication/authentication.service";

@Component({
  standalone: true,
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  ngOnInit(): void {
    const role = this.authenticationService.getUserLoggedIn().role;

    if (role) {
      this.router.navigateByUrl(`${role}-dashboard`, {replaceUrl: true});
    }
  }

  onSubmit = (): void => {
    const {email, password} = this.loginForm.value;

    this.authenticationService.login({email, password});
  };
}
