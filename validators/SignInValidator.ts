import { ValidationStatus } from "../types";

export default class SignInValidator {
  message?: string;
  validationError?: boolean = false;

  constructor(private email?: string, private password?: string) {}

  private emailValidator(): void {
    if (!this.email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      this.message = "Please provide email in correct format";
      this.validationError = true;
    }

    if (!this.email || this.email?.trim().length! < 1) {
      this.message = "Please provide a email";
      this.validationError = true;
    }
  }

  private passwordValidator(): void {
    if (!this.password || this.password?.trim().length! < 1) {
      this.message = "Please provide a password";
      this.validationError = true;
    }
  }

  public getValidationStatus(): ValidationStatus {
    this.emailValidator();
    this.passwordValidator();

    return {
      validationError: this.validationError,
      message: this.message,
    };
  }
}
