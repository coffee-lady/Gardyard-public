import { ElementRef } from '@angular/core';

export interface Classes {
    boxClassOut: string;
    boxClassEnter: string;
    targetClassFocus: string;
}

export class DragAndDrop {
    protected dropBox: ElementRef = null;
    protected classes: Classes;

    constructor() {}

    init(dropBox: ElementRef | null): void {
        this.dropBox = dropBox;

        dropBox.nativeElement.addEventListener('dragenter', this.dragEnter.bind(this));
        dropBox.nativeElement.addEventListener('dragleave', this.dragLeave.bind(this));
        dropBox.nativeElement.addEventListener('dragover', this.dragOver.bind(this));
        dropBox.nativeElement.addEventListener('drop', this.drop.bind(this));
    }

    setClasses(boxClassOut: string, boxClassEnter: string, targetClassFocus: string): void {
        this.classes = { boxClassOut, boxClassEnter, targetClassFocus };
    }

    makeDraggable(elem: ElementRef): void {
        elem.nativeElement.setAttribute('draggable', 'true');
        elem.nativeElement.addEventListener('dragstart', this.dragStart.bind(this));
        elem.nativeElement.addEventListener('drag', this.drag.bind(this));
        elem.nativeElement.addEventListener('dragend', this.dragEnd.bind(this));
    }

    protected dragStart(event: DragEvent): void {
        event.dataTransfer.effectAllowed = 'move';
        (event.target as HTMLElement).classList.add(this.classes.targetClassFocus);
        this.dropBox.nativeElement.classList.add(this.classes.boxClassOut);
    }

    protected drag(event: DragEvent): void {}

    protected dragEnd(event: DragEvent): void {
        (event.target as HTMLElement).classList.remove(this.classes.targetClassFocus);
        this.dropBox.nativeElement.classList.remove(this.classes.boxClassEnter);
        this.dropBox.nativeElement.classList.remove(this.classes.boxClassOut);
    }

    protected dragEnter(event: DragEvent): void {
        this.dropBox.nativeElement.classList.remove(this.classes.boxClassOut);
    }

    protected dragLeave(event: DragEvent): void {
        this.dropBox.nativeElement.classList.remove(this.classes.boxClassEnter);
        this.dropBox.nativeElement.classList.add(this.classes.boxClassOut);
    }

    protected dragOver(event: DragEvent): void {
        event.preventDefault();
        this.dropBox.nativeElement.classList.add(this.classes.boxClassEnter);
        this.dropBox.nativeElement.classList.add(this.classes.boxClassOut);
    }

    protected drop(event: DragEvent): void {}
}
