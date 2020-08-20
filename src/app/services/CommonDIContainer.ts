import { Router } from "@angular/router";
import {Injectable, NgZone} from "@angular/core";

@Injectable()
export class CommonDIContainer {
    inject: any = [
        'router',
        'ngZone',
    ];

    constructor(
        public router: Router,
        public ngZone: NgZone,
    ) {}
}
