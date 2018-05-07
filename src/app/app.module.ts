import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingProviders, routing} from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecruiterdashboardComponent } from './recruiterdashboard/recruiterdashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesrepdashboardComponent } from './salesrepdashboard/salesrepdashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecruiterdashboardComponent,
    DashboardComponent,
    SalesrepdashboardComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
