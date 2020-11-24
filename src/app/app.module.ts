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
    MatFormFieldModule, MatGridListModule,
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
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        MessageDialogComponent,
        AddNewLabelDialogComponent,
        ConfirmDialogComponent
    ]
})
export class AppModule {
}
