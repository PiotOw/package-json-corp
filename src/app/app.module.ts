import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './modules/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './components/register/register.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MessageDialogComponent } from './modules/message-dialog/message-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        RegisterComponent,
        MessageDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatRadioModule,
        MatProgressBarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        MessageDialogComponent
    ]
})
export class AppModule {
}
