import {NgModule, NgZone} from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CommonDIContainer} from "./services/CommonDIContainer";
import {TrimPipe} from "./reusable/pipes/trim.pipe";
import { TranslateToChinesePipe } from "./reusable/pipes/translateToChinese.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TrimPipe,
        TranslateToChinesePipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,

        TrimPipe,
        TranslateToChinesePipe,
    ],
    providers: [
        {
            provide: CommonDIContainer,
            useFactory: (
                Router,
                NgZone,
            ) => {
                return new CommonDIContainer(
                    Router,
                    NgZone,
                )
            },
            deps: [
                Router,
                NgZone,
            ]
        },
    ],
})
export class AppCommonModule {
}
