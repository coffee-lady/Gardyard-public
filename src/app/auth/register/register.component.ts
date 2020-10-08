import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { UserValidator } from 'src/app/shared/validators/user-uniqueness.validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../../../assets/styles/auth.scss'],
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
        password: new FormControl('', [Validators.required, passwordValidator]),
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
        console.log(this.form.controls.email);

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
