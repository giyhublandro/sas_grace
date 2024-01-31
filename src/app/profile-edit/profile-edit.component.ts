import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Profiles } from '../models/profils';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  id_profil !: number
  nom_profil !: string
   profil !: boolean
   mission !: boolean
   agence !: boolean
   utilisateurs !: boolean
   paiements !: boolean
   mes_paiements !: boolean
   clients !: boolean
   mes_missions !: boolean
   mon_planning !: boolean
   rapports !: boolean
   validations !: boolean
   administration !: boolean
   
   contact !: boolean
      source !: boolean

   profilChk !: string
   missionChk !: string
   agenceChk !: string
   utilisateursChk !: string
   paiementsChk !: string
   mes_paiementsChk !: string
   clientsChk !: string
   mes_missionsChk !: string
   mon_planningChk !: string
   rapportsChk !: string
   validationsChk !: string
   administrationChk !: string
   contactChk !: string
   sourceChk !: string

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router,
   private _notificationService:NotificationService) { }

   profils !: Profiles[];
   profilForm !: FormGroup;

  id_utilisateur : number = 0 ;

   updateProfileForm() {

    this.profilForm = this.formBuilder.group({
     
      'id_profil':[''],
      'nom_profil' :['',Validators.compose(
        [Validators.required, Validators.minLength(5)])],
       'profil' :[''],
       'mission' :[''],
       'agence' :[''],
       'utilisateurs' :[''],
       'paiements' :[''],
       'mes_paiements' :[''],
       'clients' :[''],
       'mes_missions' :[''],
       'mon_planning' :[''],
       'rapports' :[''],
       'validations' :[''],
       'administration' :[''],
       'contact' :[''],
       'source' :['']

    });

  }

   ngOnInit(): void {

    this.id_profil = this.routes.snapshot.params['id_profile'];
    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
    this.updateProfileForm()

    if(this.id_profil >= 1 ) {
      this.infoProfile(this.id_profil)
    }

  }

  infoProfile(id_profile : any){

    this._utilisateurService.getProfilById(id_profile).subscribe((data:any) => {

      this.utilisateurs = data.utilisateurs
      this.profil = data.profil
      this.paiements = data.paiements
      this.mes_paiements = data.mes_paiements
      this.clients = data.clients
      this.mes_missions = data.mes_missions
      this.mon_planning = data.mon_planning
      this.rapports = data.rapports
      this.agence = data.agence
      this.mission = data.mission
      this.validations = data.validations
      this.administration = data.administration

      this.source = data.source
      this.contact = data.contact

      this.id_profil= data.id_profil
      this.nom_profil = data.nom_profil

      if (data.source == 1){
        this.source = true
        this.sourceChk= "checked"
      }else{
        this.source = false
        this.sourceChk= ""
      }

      if (data.contact == 1){
        this.contact = true
        this.contactChk= "checked"
      }else{
        this.contact = false
        this.contactChk= ""
      }

      if (data.profil == 1){
        this.profil = true
        this.profilChk= "checked"
      }else{
        this.profil = false
        this.profilChk= ""
      }

      if (data.utilisateurs == 1){
        this.utilisateurs = true
        this.utilisateursChk= "checked"
      }else{
        this.utilisateurs = false
        this.utilisateursChk= ""
      }

      if (data.validations == 1){
        this.validations = true
        this.validationsChk= "checked"
      }else{
        this.validations = false
        this.validationsChk= ""
      }

      if (data.administration == 1){
        this.administration = true
        this.administrationChk= "checked"
      }else{
        this.administration = false
        this.administrationChk= ""
      }

      if (data.paiements == 1){
        this.paiements = true
        this.paiementsChk= "checked"
      }else{
        this.paiements = false
        this.paiementsChk= ""
      }

      if (data.mes_paiements == 1){
        this.mes_paiements = true
        this.mes_paiementsChk= "checked"
      }else{
        this.mes_paiements = false
        this.mes_paiementsChk= ""
      }
      console.log(this.mes_paiements)

      if (data.clients == 1){
        this.clients = true
        this.clientsChk= "checked"
      }else{
        this.clients = false
        this.clientsChk= ""
      }

      console.log(this.clients)

      if (data.mes_missions == 1){
        this.mes_missions = true
        this.mes_missionsChk= "checked"
      }else{
        this.mes_missions = false
        this.mes_missionsChk= ""
      }

      if (data.mon_planning == 1){
        this.mon_planning = true
        this.mon_planningChk= "checked"
      }else{
        this.mon_planning = false
        this.mon_planningChk= ""
      }

      if (data.rapports == 1){
        this.rapports = true
        this.rapportsChk= "checked"
      }else{
        this.rapports = false
        this.rapportsChk= ""
      }

      if (data.agence == 1){
        this.agence = true
        this.agenceChk= "checked"
      }else{
        this.agence = false
        this.agenceChk= ""
      }

      if (data.mission == 1){
        this.mission = true
        this.missionChk= "checked"
      }else{
        this.mission = false
        this.missionChk= ""
      }

    });
  
  }

  ListeProfil(){
    this.router.navigate(['/profiles-liste/'+this.id_utilisateur]);
  }

  edit(data:any){

    this._utilisateurService.updateProfil(data, data.id_profil).subscribe((data:any) => {
      //alert("Profil mise à jours")
      this.router.navigate(['/profiles-liste',this.id_utilisateur]);

      let title : string = "Profil mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });
  }

}
