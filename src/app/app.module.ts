import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppCommonModule} from "./common.module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {
            useHash: true
        }),
        AppCommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
