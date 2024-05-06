import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class loginValidation {
  loginFormValidation(loginForm: FormGroup, fb: FormBuilder) {
    return loginForm = fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
}