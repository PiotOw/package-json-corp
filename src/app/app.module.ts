import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './modules/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './views/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MessageDialogComponent } from './modules/message-dialog/message-dialog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreditCardInfoComponent } from './views/dashboard/components/credit-card-info/credit-card-info.component';
import { ShipmentTrackerComponent } from './views/dashboard/components/shipment-tracker/shipment-tracker.component';
import { ShipmentInfoComponent } from './views/dashboard/components/shipment-info/shipment-info.component';
import { AccountBalanceComponent } from './views/dashboard/components/account-balance/account-balance.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { DealsComponent } from './views/dashboard/components/deals/deals.component';
import { DealInfoComponent } from './views/dashboard/components/deal-info/deal-info.component';
import { ClosestDeliveryComponent } from './views/dashboard/components/closest-delivery/closest-delivery.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddNewLabelDialogComponent } from './views/dashboard/components/shipment-tracker/add-new-label-dialog/add-new-label-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { ConfirmDialogComponent } from './modules/confirm-dialog/confirm-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {AuthInterceptor} from './auth/auth.interceptor';
import {UnauthorizedInterceptor} from './auth/unauthorized.interceptor';
import {AuthModule} from '@auth0/auth0-angular';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        RegisterComponent,
        MessageDialogComponent,
        SidebarComponent,
        DashboardComponent,
        FooterComponent,
        CreditCardInfoComponent,
        ShipmentTrackerComponent,
        ShipmentInfoComponent,
        AccountBalanceComponent,
        DealsComponent,
        DealInfoComponent,
        ClosestDeliveryComponent,
        LoginComponent,
        LogoutComponent,
        AddNewLabelDialogComponent,
        ConfirmDialogComponent,
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
        MatGridListModule,
        NgApexchartsModule,
        MatSelectModule,
        MatMenuModule,

        AuthModule.forRoot({
            domain: 'powczarczyk.eu.auth0.com',
            clientId: '94PvYqz6e7DF8UoeiMLMsf4qQfQdGMVs'
        }),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        MessageDialogComponent,
        AddNewLabelDialogComponent,
        ConfirmDialogComponent
    ]
})
export class AppModule {
}
