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
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { PateintdetailComponent } from './pateintdetail/pateintdetail.component';
import { PateintsComponent } from './pateints/pateints.component';
import { PateintquestionireComponent } from './pateintquestionire/pateintquestionire.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersearchPipe } from './search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { CompensationmodifierComponent } from './compensationmodifier/compensationmodifier.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { UserrecruiterdetailComponent } from './userrecruiterdetail/userrecruiterdetail.component';
import { UserrecruitereditComponent } from './userrecruiteredit/userrecruiteredit.component';
import { UserrecruiterlistComponent } from './userrecruiterlist/userrecruiterlist.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ClipboardModule } from 'ngx-clipboard';

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
    TrainingstepComponent,
      FrontheaderComponent,
      FrontfooterComponent,
    PateintquestionireComponent,
    PateintsComponent,
    PateintdetailComponent,
      UsersearchPipe,
      CompensationmodifierComponent,
      MyaccountComponent,
      PatientrecordComponent,
      UserrecruiterdetailComponent,
      UserrecruitereditComponent,
      UserrecruiterlistComponent,
      ResetpasswordComponent,
      ForgetpasswordComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    BsDropdownModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
    AccordionModule.forRoot(),
      ModalModule.forRoot(),
      NgxPaginationModule,
      ClipboardModule
  ],
  providers: [appRoutingProviders, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
