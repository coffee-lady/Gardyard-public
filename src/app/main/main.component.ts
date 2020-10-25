import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewChecked, OnDestroy {
    private unsubscribe$ = new Subject();

    loading = true;

    constructor(private loaderService: LoaderService,
        private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });
    }

    ngAfterViewChecked(): void {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
