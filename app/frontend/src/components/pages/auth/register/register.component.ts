import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PasswordValidator, UserValidator } from 'app/frontend/src/validators';
import { AuthService } from 'app/frontend/src/services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    constructor(private router: Router,
        private authService: AuthService,
        private userValidator: UserValidator) {}

    form: FormGroup = new FormGroup({
        fullname: new FormControl('', [Validators.required]),
        email: new FormControl('',
            [Validators.required, Validators.email],
            this.userValidator.validate.bind(this.userValidator)),
        password: new FormControl('', [Validators.required, PasswordValidator]),
        role: new FormControl('', [Validators.required]),
    });

    get fullname(): AbstractControl {
        return this.form.get('fullname');
    }

    get email(): AbstractControl {
        return this.form.get('email');
    }

    get password(): AbstractControl {
        return this.form.get('password');
    }

    get role(): AbstractControl {
        return this.form.get('role');
    }

    ngOnInit(): void {
        if (this.authService.getUser()) {
            this.authService.signOut();
        }

        this.form.patchValue({ role: 'user' });
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        const { fullname, email, password, role } = this.form.getRawValue();

        this.authService
            .register(fullname, email, password, role)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }

    toggle(): void {
        document.querySelector('.back').classList.toggle('back_hidden');
    }

}
