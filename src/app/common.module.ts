import {NgModule, NgZone} from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CommonDIContainer} from "./services/CommonDIContainer";
import {TrimPipe} from "./reusable/pipes/trim.pipe";
import { CharacterDataService } from "./services/character-data.service";
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
                CharacterDataService,
            ) => {
                return new CommonDIContainer(
                    Router,
                    NgZone,
                    CharacterDataService,
                )
            },
            deps: [
                Router,
                NgZone,
                CharacterDataService,
            ]
        },
    ],
})
export class AppCommonModule {
}
