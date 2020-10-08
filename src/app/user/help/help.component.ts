import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Question } from 'src/app/shared/interfaces';
import { QuestionsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject();
    private questions$ = new Subject();

    questions: Question[] = [];
    loading = true;

    constructor(
        private questionsService: QuestionsService,
        private alert: AlertService,
        private loaderService: LoaderService) {}

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

        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
