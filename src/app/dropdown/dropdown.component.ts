import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

interface DataToSelect {
    title: string;
    id: string;
}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() dataToSelect: DataToSelect[];
    @Input() title = '';
    @Output() elemChoosed = new EventEmitter < DataToSelect > ();

    choose(elem: DataToSelect): void {
        this.elemChoosed.emit(elem);
    }

    constructor() {}

    ngOnInit(): void {
        $('.dropdown').on('click', function(): void {
            $(this).attr('tabindex', 1).trigger('focus');
            $(this).toggleClass('active');
            $(this).find('.dropdown-menu').slideToggle(300);
        });
        $('.dropdown').on('focusout', function(): void {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').slideUp(300);
        });
        $('body').on('click', '.dropdown-menu li', function(): void {
            $('.dropdown').find('.result').text($(this).text());
        });
    }
}
