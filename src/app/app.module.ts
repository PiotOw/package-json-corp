import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './modules/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './views/register/register.component';
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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        RegisterComponent,
        MessageDialogComponent,
        SidebarComponent,
        DashboardComponent,
        FooterComponent
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
