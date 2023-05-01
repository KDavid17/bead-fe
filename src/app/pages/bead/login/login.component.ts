import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

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

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private readonly authenticationService: AuthenticationService) {}

  onSubmit = (): void => {
    const {email, password} = this.loginForm.value;

    this.authenticationService.login({email, password});
  };
}
