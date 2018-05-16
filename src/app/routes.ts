/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecruiterdashboardComponent } from './recruiterdashboard/recruiterdashboard.component';
import { SalesrepdashboardComponent } from './salesrepdashboard/salesrepdashboard.component';
import { RepsignupComponent } from './repsignup/repsignup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { TrainingstepComponent } from './trainingstep/trainingstep.component';
import { RepcontractComponent } from './repcontract/repcontract.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { PateintsComponent } from './pateints/pateints.component';
import { PateintquestionireComponent } from './pateintquestionire/pateintquestionire.component';
import { PateintdetailComponent } from './pateintdetail/pateintdetail.component';
import { CompensationmodifierComponent } from './compensationmodifier/compensationmodifier.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { UserrecruiterlistComponent } from './userrecruiterlist/userrecruiterlist.component';
import { UserrecruitereditComponent } from './userrecruiteredit/userrecruiteredit.component';
import { UserrecruiterdetailComponent } from './userrecruiterdetail/userrecruiterdetail.component';


const appRoutes: Routes = [
    // { path: '/**',component: AppComponent},
    // { path: '/*',component: AppComponent},
    { path: '', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'recruiterdashboard', component: RecruiterdashboardComponent},
    { path: 'rep-dashboard', component: SalesrepdashboardComponent},
    { path: 'repsignup', component: RepsignupComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'recrutersignup', component: RecruitersignupComponent},
    { path: 'employment-agreement', component: RepcontractComponent},
    { path: 'trainingstep', component: TrainingstepComponent},
    { path: 'frontheader', component: FrontheaderComponent},
    { path: 'frontfooter', component: FrontfooterComponent},
    { path: 'patient-list', component: PateintsComponent},
    { path: 'pateintquestionire', component: PateintquestionireComponent},
    { path: 'add-pateint', component: PateintdetailComponent},
    { path: 'compensationmodifier', component: CompensationmodifierComponent},
    { path: 'myaccount', component: MyaccountComponent},
    { path: 'patientrecord/:id', component: PatientrecordComponent},
    { path: 'userrecruiterlist', component: UserrecruiterlistComponent},
    { path: 'userrecruiteredit', component: UserrecruitereditComponent},
    { path: 'userrecruiterdetail', component: UserrecruiterdetailComponent},


   // { path: 'content', component: ContentComponent,outlet:'content'},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
