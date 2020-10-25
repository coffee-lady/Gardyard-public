import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Question } from 'src/app/shared/interfaces';
import { QuestionsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-edit-help',
    templateUrl: './edit-help.component.html',
    styleUrls: ['./edit-help.component.scss']
})
export class EditHelpComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private questions$ = new Subject();

    questions: Question[] = [];

    constructor(
        private questionsService: QuestionsService,
        private alert: AlertService) {}

    form: FormGroup = new FormGroup({
        question: new FormControl('', [Validators.required]),
        answer: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.questions$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.questionsService
                    .getAll()
                    .pipe(take(1))
                    .subscribe((questions: Question[]) => {
                        this.questions = questions;
                    }, () => {
                        this.alert.fire('Error', 'Something went wrong.', false);
                    });
            });

        this.questions$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    delete(id: string): void {
        this.questionsService
            .delete(id)
            .pipe(take(1))
            .subscribe(() => {
                this.alert.fire('Successfully deleted', 'Changes have been made to the database.', false);
                this.questions$.next();
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

    create(): void {
        if (this.form.invalid) {
            return;
        }

        this.questionsService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe((res) => {
                    this.questions$.next();
                    this.alert.fire(
                        'Success',
                        'The question was created. Response status: ' + res.status,
                        true);
                },
                () => {
                    this.alert.fire(
                        'Error',
                        'The question wasn\'t created.',
                        true);
                });
    }
}
