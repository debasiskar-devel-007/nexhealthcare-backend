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
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AutologinComponent } from './autologin/autologin.component';
import { CgxComponent } from './cgx/cgx.component';


const appRoutes: Routes = [
    // { path: '/**',component: AppComponent},
    // { path: '/*',component: AppComponent},
    { path: 'log-in', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'recruiterdashboard', component: RecruiterdashboardComponent},
    { path: 'rep-dashboard', component: SalesrepdashboardComponent},
    { path: 'sign-up', component: RepsignupComponent},
    { path: 'sign-up/:id', component: RepsignupComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'recrutersignup', component: RecruitersignupComponent},
    { path: 'employment-agreement', component: RepcontractComponent},
    { path: 'trainingstep', component: TrainingstepComponent},
    { path: 'frontheader', component: FrontheaderComponent},
    { path: 'frontfooter', component: FrontfooterComponent},
    { path: 'patient-list', component: PateintsComponent},
    { path: 'patientquestionire', component: PateintquestionireComponent},
    { path: 'add-patient', component: PateintdetailComponent},
    { path: 'compensationmodifier', component: CompensationmodifierComponent},
    { path: 'myaccount', component: MyaccountComponent},
    { path: 'patientrecord/:id', component: PatientrecordComponent},
    { path: 'userrecruiterlist/:id', component: UserrecruiterlistComponent},
    { path: 'userrecruiteredit/:id', component: UserrecruitereditComponent},
    { path: 'userrecruiterdetail/:id', component: UserrecruiterdetailComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'resetpassword/:id', component: ResetpasswordComponent},
    { path: 'autologin/:id', component: AutologinComponent},
    { path: 'cgx', component: CgxComponent},


   // { path: 'content', component: ContentComponent,outlet:'content'},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
