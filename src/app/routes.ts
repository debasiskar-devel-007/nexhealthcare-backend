/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { LoginComponent }  from './login/login.component';
import { RecruiterdashboardComponent }  from './recruiterdashboard/recruiterdashboard.component';
import { SalesrepdashboardComponent }  from './salesrepdashboard/salesrepdashboard.component';
import { RepsignupComponent }  from './repsignup/repsignup.component';
import { HeaderComponent }  from './header/header.component';
import { FooterComponent }  from './footer/footer.component';
import { RecruitersignupComponent }  from './recruitersignup/recruitersignup.component';


const appRoutes: Routes = [
    // { path: '/**',component: AppComponent},
    // { path: '/*',component: AppComponent},
    { path: '', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'recruiterdashboard', component: RecruiterdashboardComponent},
    { path: 'salesrepdashboard', component: SalesrepdashboardComponent},
    { path: 'repsignup', component: RepsignupComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'recrutersignup', component: RecruitersignupComponent},


   // { path: 'content', component: ContentComponent,outlet:'content'},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
