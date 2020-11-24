import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {RegisterComponent} from './views/register/register.component';
import {LoginComponent} from './views/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';


const routes: Routes = [
    {path: 'sender/dashboard', component: DashboardComponent},
    {path: 'sender/register', component: RegisterComponent},
    {path: 'sender/login', component: LoginComponent},
    {path: 'sender/logout', component: LogoutComponent},
    {path: '**', redirectTo: 'sender/login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
