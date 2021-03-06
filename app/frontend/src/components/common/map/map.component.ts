import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { tt } from '@tomtom-international/web-sdk-maps';
import { Contacts } from 'app/frontend/src/interfaces';
import { ContactsService } from 'app/frontend/src/services';

import { MapController } from './controller';

import { Config } from 'app/frontend/src/config';
const MapConfig = Config.components.map;
const MapMarkerConfig = Config.components.map.marker;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./styles/map.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() coords: number[];
    @Input() width: string;
    @Input() height: string;

    @ViewChild('map')
    MapElement: ElementRef;

    map: any;
    marker: any;
    controller: MapController;

    constructor(contactsService: ContactsService) {
        this.controller = new MapController(contactsService);
    }

    ngOnInit(): void {
        this.controller.onInit.subscribe({
            next: contacts => this.setPins(contacts)
        });

        this.controller.init();

        this.createMap();
    }

    ngAfterViewInit(): void {
        this.checkWidth();
    }

    ngOnChanges(): void {
        this.createMap();

        const contacts = this.controller.getContacts();
        this.setPins(contacts);
    }

    checkWidth(): void {
        if (document.documentElement.clientWidth > MapConfig.scaleWidth) {
            this.MapElement.nativeElement.style.width = this.width;
        }
        this.MapElement.nativeElement.style.height = this.height;
    }

    setPins(contacts: Contacts[]): void {
        for (const contactsData of contacts) {
            this.createPin(contactsData);
        }
    }

    createPin(contactsData: Contacts): void {
        const htmlElem = document.createElement('div');
        htmlElem.id = 'marker';

        this.marker = new tt.Marker({
                draggable: MapMarkerConfig.draggable,
                scale: MapMarkerConfig.scale,
                width: MapMarkerConfig.width,
                height: MapMarkerConfig.height,
                element: htmlElem
            })
            .setLngLat([contactsData.longitude, contactsData.latitude])
            .addTo(this.map);
    }

    createMap(): void {
        this.map = tt.map({
            key: MapConfig.apiKey,
            container: 'gMap',
            style: '/assets/map.json',
            center: new tt.LngLat(this.coords[0], this.coords[1]),
            zoom: MapConfig.zoom
        });
    }
}
