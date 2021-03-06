import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Question } from 'app/frontend/src/interfaces';
import { QuestionsService, AlertService } from 'app/frontend/src/services';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {

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

}
