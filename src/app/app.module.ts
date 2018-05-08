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
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecruiterdashboardComponent,
    DashboardComponent,
    SalesrepdashboardComponent,
    RepsignupComponent,
    FrontheaderComponent,
    FrontfooterComponent,
    FooterComponent,
    HeaderComponent,
    RecruitersignupComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
