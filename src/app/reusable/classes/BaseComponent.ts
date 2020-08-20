import {NgZone, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Observer } from "rxjs";

import { CommonDIContainer } from "../../services/CommonDIContainer";

export class BaseComponent implements OnInit {
    public state: any = {
        isOnInitialize: false
    };

    protected router: Router = null;
    protected ngZone: NgZone = null;

    constructor(
        protected diContainer: CommonDIContainer
    ) {
        for (let key of diContainer.inject) {
            if (key in this) {
                this[key] = diContainer[key];
            }
        }
    }

    ngOnInit() {
        this.state.isOnInitialize = false;
    }

    onInit() {
        this.state.isOnInitialize = true;
    }

    runAfter$(returnValue: any | any[], callback: (...args: any[]) => any | void) {
        return new Observable((o: Observer<any>) => {
            if (returnValue instanceof Observable) {
                returnValue.subscribe((...args: any[]) => {
                    o.next(
                        callback(...args)
                    );

                    o.complete();
                });
            } else if (returnValue instanceof Array) {
                o.next(
                    callback(...returnValue)
                );

                o.complete();
            } else {
                o.next(
                    callback(returnValue)
                );

                o.complete();
            }
        });
    }

    log() {
        console.log.apply(arguments);
    }
}
