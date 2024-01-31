import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppfooterComponent } from './appfooter/appfooter.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfilesListeComponent } from './profiles-liste/profiles-liste.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { ChangeCredentialsComponent } from './change-credentials/change-credentials.component';
import { ClientComponent } from './client/client.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MissionComponent } from './mission/mission.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { AssignerMissionComponent } from './assigner-mission/assigner-mission.component';
import { AssignerMissionEditComponent } from './assigner-mission-edit/assigner-mission-edit.component';
import { AssignerMissionListComponent } from './assigner-mission-list/assigner-mission-list.component';
import { PaiementListComponent } from './paiement-list/paiement-list.component';
import { PlanningComponent } from './planning/planning.component';
import { SourceComponent } from './source/source.component';
import { SourceListComponent } from './source-list/source-list.component';
import { MesValidationsListComponent } from './mes-validations-list/mes-validations-list.component';
import { ConfigComponent } from './config/config.component';
import { FacturationComponent } from './facturation/facturation.component';
import { FacturationListComponent } from './facturation-list/facturation-list.component';
import { RapportsComponent } from './rapports/rapport.component';
import { OptionsSupComponent } from './options-sup/options-sup.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { EspaceClientComponent } from './espace-client/espace-client.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AffectationSpecialComponent } from './affectation-special/affectation-special.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { AttestationFiscaleComponent } from './attestation-fiscale/attestation-fiscale.component';
const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch:'full'},
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: '*', redirectTo:'/home', pathMatch:'full'},
  { path:'dashboard/:id_utilisateur', component:DashboardComponent, pathMatch:'full'},
  { path:'home', component:HomeComponent},
  { path:'profiles/:id_utilisateur', component:ProfilesComponent },
  { path:'profiles-liste/:id_utilisateur', component: ProfilesListeComponent},
  { path:'profile-edit/:id_utilisateur/:id_profile', component: ProfileEditComponent},
  { path:'utilisateurs/:id_utilisateur', component:UtilisateursComponent },
  { path:'update-utilisateur/:id_utilisateur/:id_utilisateur_edit', component:UpdateUtilisateurComponent },
  { path: '*', redirectTo: 'home', pathMatch: 'full'},
  { path:'mon-profil/:id_utilisateur', component:ChangeCredentialsComponent },

  { path:'client/:id_utilisateur', component:ClientComponent },
  { path:'client-edit/:id_utilisateur/:id_client', component:ClientEditComponent },
  { path:'client-list/:id_utilisateur', component:ClientListComponent },

  { path:'mission/:id_utilisateur', component:MissionComponent },
  { path:'mission-edit/:id_utilisateur/:id_mission', component:MissionEditComponent },
  { path:'mission-list/:id_utilisateur', component:MissionListComponent },

  { path:'assigner-mission/:id_utilisateur', component:AssignerMissionComponent },
  { path:'assigner-mission-edit/:id_utilisateur/:id_affectation', component:AssignerMissionEditComponent },
  { path:'assigner-mission-edit/:id_utilisateur/:id_affectation/:administration', component:AssignerMissionEditComponent },
  { path:'assigner-mission-list/:id_utilisateur', component:AssignerMissionListComponent },

  { path:'assigner-mission-list/:id_utilisateur/:id_affectation', component:AssignerMissionListComponent },
  
  { path:'assigner-mission-duplication/:id_utilisateur', component:AffectationSpecialComponent },

  { path:'mes-validations-list/:id_utilisateur', component:MesValidationsListComponent },
  
  { path:'paiement-list/:id_utilisateur', component:PaiementListComponent },

  { path:'planning/:id_utilisateur', component:PlanningComponent },

  { path:'source/:id_utilisateur/:id_source', component:SourceComponent },
  { path:'source-list/:id_utilisateur', component:SourceListComponent },
  { path:'config/:id_utilisateur', component:ConfigComponent },
  { path:'facturation/:id_utilisateur', component:FacturationComponent},
  { path:'facturation-list/:id_utilisateur', component:FacturationListComponent},
  { path:'rapports/:id_utilisateur', component:RapportsComponent},
  { path:'options/:id_utilisateur', component:OptionsSupComponent},
  { path:'options/:id_utilisateur/:id_option', component:OptionsSupComponent},
  { path:'reservation', component:ReservationComponent},
  { path:'reservation/:id_client', component:ReservationComponent},
  { path:'forgot-password', component:ForgotPasswordComponent},
  { path:'creer-compte', component:CreerCompteComponent},
  { path:'espace-client/:id_client', component:EspaceClientComponent},
  { path:'espace-client/:id_client/:menu', component:EspaceClientComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'edit-facture/:id_utilisateur/:id_facturation', component: FactureEditComponent},
  {path:'edit-facture/:id_utilisateur/:id_facturation/:id_affectation', component: FactureEditComponent},
  {path:'attestation/:id_utilisateur', component: AttestationFiscaleComponent}

];

@NgModule({

  imports: [
    
    RouterModule.forRoot(routes, { useHash: true }),
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
    
  ],

  exports: [RouterModule]

})

export class AppRoutingModule { 
  
  cardCaptureReady = false

  onStripeInvalid( error: Error ){
    console.log('Validation Error', error)
  }

  onStripeError( error: Error ){
    console.error('Stripe error', error)
  }

  setPaymentMethod( token: stripe.paymentMethod.PaymentMethod ){
    console.log('Stripe Payment Method', token)
  }

  setStripeToken( token: stripe.Token ){
    console.log('Stripe Token', token)
  }

  setStripeSource( source: stripe.Source ){
    console.log('Stripe Source', source)
  }

}
