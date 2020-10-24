import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { take } from 'rxjs/operators';
import { Contacts } from '../shared/interfaces';
import { ContactsService } from '../shared/services';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
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
    contacts: Contacts[] = [];
    constructor(private contactsService: ContactsService) {}

    ngOnInit(): void {
        this.map = tt.map({
            key: 'RhLL7hssA5Ku2uziA9KuddClqHQHWrGL',
            container: 'gMap',
            style: '/assets/map.json',
            center: new tt.LngLat(this.coords[0], this.coords[1]),
            zoom: 12
        });

        this.contactsService.getAll()
            .pipe(take(1))
            .subscribe(contacts => {
                this.contacts = contacts;
                for (const pos of this.contacts) {
                    this.marker = new tt.Marker({
                            draggable: false,
                            scale: 2,
                            width: 20,
                            height: 25
                        })
                        .setLngLat([pos.longitude, pos.latitude])
                        .addTo(this.map);
                }

            });
    }

    ngAfterViewInit(): void {
        if (document.documentElement.clientWidth > 1265) {
            this.MapElement.nativeElement.style.width = this.width;
        }
        this.MapElement.nativeElement.style.height = this.height;
    }

    ngOnChanges(): void {
        this.map = tt.map({
            key: 'RhLL7hssA5Ku2uziA9KuddClqHQHWrGL',
            container: 'gMap',
            style: '/assets/map.json',
            center: new tt.LngLat(this.coords[0], this.coords[1]),
            zoom: 12
        });
        for (const pos of this.contacts) {
            this.marker = new tt.Marker({
                    draggable: false,
                    scale: 2,
                    width: 20,
                    height: 25
                })
                .setLngLat([pos.longitude, pos.latitude])
                .addTo(this.map);
        }
    }
}
