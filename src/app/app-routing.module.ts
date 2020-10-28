import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {RegisterComponent} from './views/register/register.component';


const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'sender/sign-up', component: RegisterComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
