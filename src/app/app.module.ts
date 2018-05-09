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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { RepcontractComponent } from './repcontract/repcontract.component';
import { TrainingstepComponent } from './trainingstep/trainingstep.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecruiterdashboardComponent,
    DashboardComponent,
    SalesrepdashboardComponent,
    RepsignupComponent,
      HeaderComponent,
      FooterComponent,
      RecruitersignupComponent,
    RepcontractComponent,
    TrainingstepComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BsDropdownModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
    AccordionModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
