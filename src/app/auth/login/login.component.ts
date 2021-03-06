import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { UserValidator } from 'src/app/shared/validators/user-uniqueness.validator';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
        private authService: AuthService) {}

    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, passwordValidator]),
    });

    get email(): AbstractControl {
        return this.form.get('email');
    }

    get password(): AbstractControl {
        return this.form.get('password');
    }

    ngOnInit(): void {
        if (this.authService.getUser()) {
            this.authService.signOut();
        }
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        const { email, password } = this.form.getRawValue();
        this.authService
            .login(email, password)
            .pipe(take(1))
            .subscribe(response => {
                    if (response.status !== 200) {
                        this.form.controls.password.setErrors({ required: true });
                        return;
                    }

                    this.router.navigateByUrl('/');
                },
                () => this.form.controls.password.setErrors({ invalidPassword: true })
            );
    }

}
