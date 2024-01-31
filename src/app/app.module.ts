import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StripeModule } from "stripe-angular"

import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";

import { HomeComponent } from './home/home.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfilesListeComponent } from './profiles-liste/profiles-liste.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { Utilisateurs } from './models/utilisateur';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ChangeCredentialsComponent } from './change-credentials/change-credentials.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ClientComponent } from './client/client.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MissionComponent } from './mission/mission.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { AssignerMissionComponent } from './assigner-mission/assigner-mission.component';
import { AssignerMissionListComponent } from './assigner-mission-list/assigner-mission-list.component';
import { AssignerMissionEditComponent } from './assigner-mission-edit/assigner-mission-edit.component';
import { PaiementListComponent } from './paiement-list/paiement-list.component';
import { PlanningComponent } from './planning/planning.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SourceListComponent } from './source-list/source-list.component';
import { SourceComponent } from './source/source.component';
import { MesValidationsListComponent } from './mes-validations-list/mes-validations-list.component';
import { ConfigComponent } from './config/config.component';
import { FacturationComponent } from './facturation/facturation.component';
import { DatePipe } from '@angular/common';
import { FacturationListComponent } from './facturation-list/facturation-list.component';
registerLocaleData(localeFr, 'fr');

import { RapportsComponent } from './rapports/rapport.component';

import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { OptionsSupComponent } from './options-sup/options-sup.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { EspaceClientComponent } from './espace-client/espace-client.component';
import { AppheaderClientComponent } from './appheader-client/appheader-client.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AffectationSpecialComponent } from './affectation-special/affectation-special.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { AttestationFiscaleComponent } from './attestation-fiscale/attestation-fiscale.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppheaderComponent,
    DashboardComponent,
    AppfooterComponent,
    ProfileEditComponent,
    ProfilesComponent,
    ProfilesListeComponent,
    UpdateUtilisateurComponent,
    UtilisateursComponent,
    ChangeCredentialsComponent,
    ClientComponent,
    ClientEditComponent,
    ClientListComponent,
    MissionComponent,
    MissionListComponent,
    MissionEditComponent,
    AssignerMissionComponent,
    AssignerMissionListComponent,
    AssignerMissionEditComponent,
    PaiementListComponent,
    PlanningComponent,
    SourceListComponent,
    SourceComponent,
    MesValidationsListComponent,
    ConfigComponent,
    FacturationComponent,
    FacturationListComponent,
    RapportsComponent,
    PieChartComponent,
    BarChartComponent,
    OptionsSupComponent,
    ReservationComponent,
    ForgotPasswordComponent,
    CreerCompteComponent,
    EspaceClientComponent,
    AppheaderClientComponent,
    CheckoutComponent,
    AffectationSpecialComponent,
    FactureEditComponent,
    AttestationFiscaleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ReactiveFormsModule,
    StripeModule.forRoot("...YOUR-STRIPE-KEY-HERE..."),
    NgxStripeModule.forRoot("...YOUR-STRIPE-KEY-HERE..."),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SweetAlert2Module,
    
  ],
  providers: [DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
