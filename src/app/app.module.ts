import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import {appRoutingProviders, routing} from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecruiterdashboardComponent } from './recruiterdashboard/recruiterdashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesrepdashboardComponent } from './salesrepdashboard/salesrepdashboard.component';
import { RepsignupComponent } from './repsignup/repsignup.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecruiterdashboardComponent,
    DashboardComponent,
    SalesrepdashboardComponent,
    RepsignupComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BsDropdownModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
