import { FormControl } from "@angular/forms";

export default interface RegisterFormModel {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
