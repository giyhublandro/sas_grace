import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Profiles } from '../models/profils';
import { NotificationService } from '../services/notifications.service';
import { Mission } from '../models/mission';
import { Time } from '@angular/common';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Client } from '../models/client';
import { Affectation } from '../models/affectation';
import { AuthService } from '../services/auth.service';
import { Source } from '../models/source';

@Component({
  selector: 'app-assigner-mission-list',
  //template:'<ejs-schedule> </ejs-schedule>',
  templateUrl: './assigner-mission-list.component.html',
  styleUrls: ['./assigner-mission-list.component.css']
})
export class AssignerMissionListComponent {

  id_profil !: number ;
  
  isUpdate : boolean = false;
  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;

  affectations !: Affectation[];

  administration !: number;

  id_affectation !: number;
  detailMission : boolean =false;

  utilisateurs !: Utilisateurs[];

  id_client !:number;
  id_mission !:number;
  duree !: number;
  montant !:number;
  commisions !:number;
  frequence !:number;
  date_mission !:Date;
  heure_mission !:Time;

  nom_client !: string;
  adresse_client !: string;
  code_acces_1 !:string;
  code_acces_2 !:string;
  mission !:string;
  description !:string;
  
  filtrer_affectation :string = ""
  filtrer_affectation_date :boolean =false
  filtrer_affectation_du !:Date
  filtrer_affectation_au !:Date
  
  resume_duree :number = 0     
  resume_montant_option :number = 0     
  resume_montant :number = 0    
  resume_total_facture :number = 0          
  resume_commisions :number = 0
  resume_marge :number = 0
  nombreDeMission : number= 0;
  
  sources !: Source[];
  filtrer_affectation_source :number = 0
  filtrer_affectation_source_filtre :boolean =false
  
  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
     private _authService: AuthService,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {

      this.createAffectationForm();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      this.infoUtilisateur()

      if (this.routes.snapshot.params['id_utilisateur_edit']){


      }else if (true) {

      }

      if (this.routes.snapshot.params['id_affectation']){

        this.id_affectation = this.routes.snapshot.params['id_affectation']

        this.infoDetailAffectation(this.id_affectation)

      }

      this.filtrerAffectation();
      this.listeDesSources()
      

    }
    
    listeDesAffectations(){

      this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
        this.affectations = data;

      });

    }

    delete(affectation:any){
      this.comboBox(affectation);
    }

    infoUtilisateur(){

      this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {
    
        if (data == null){
          this._authService.logout();
        }else{
  
          this.id_profil = data.id_profil;
  
          this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
  
            this.administration = data.administration;
            
          });
          
  
        }
  
      });

    }

    payer(affectation:any){

      let payer : number = 2;

      this._utilisateurService.updateEtat(affectation, payer).subscribe((data) => {

        let title : string = "";

          if (payer == 2)  {
             title = "Mission payée avec succès";
          }
         
          this._notificationService.createNotification(2, title);
    
          this.router.navigate(['/assigner-mission-list', this.id_utilisateur]);
          
          this.filtrerAffectation()

          //this.listeDesAffectations()
    
      });
    }

    validerAnnuler(affectation:any, etat:number){

      let title : string = "";

      if (etat == -1)  {
        title = "Mission Annulée avec succès";
      }else if (etat == 1)  {
        title = "Mission Validée avec succès";
      }

      this._utilisateurService.updateEtat(affectation, etat).subscribe((data) => {
        
          this._notificationService.createNotification(2, title);
    
          this.router.navigate(['/assigner-mission-list', this.id_utilisateur]);
          
          //this.ngOnInit()
          this.filtrerAffectation()
          //this.listeDesAffectations()
    
      });

    }
    
    infoDetailAffectation(id_affectation:number){
      
      this._utilisateurService.getAffectationCompleteInfoById(id_affectation).subscribe((data:any) => {

        this.id_mission = data.id_mission
        this.id_client = data.id_client
        this.id_utilisateur = data.id_utilisateur
        this.duree = data.duree
        this.montant = data.montant
        this.commisions = data.commisions
        this.frequence = data.frequence
        this.date_mission  = data.date_mission
        this.heure_mission = data.heure_mission

        this.nom_client = data.nom_client
        this.adresse_client = data.adresse_client
        this.code_acces_1 = data.code_acces_1;
        this.code_acces_2 = data.code_acces_2;
        this.mission = data.mission
        this.description = data.description;
        
        this.detailMission = true;

      });

    }

    edit(affectation:any){

      this.router.navigate(['/assigner-mission-edit',this.id_utilisateur, affectation.id_affectation]);

    }
    
    createAffectation(){
      this.router.navigate(['/assigner-mission',this.id_utilisateur]);
    }

    createAffectationForm() {

      this.assignForm = this.formBuilder.group({
       
       'id_mission' :['',Validators.compose([Validators.required])],
       'id_utilisateur':['',Validators.compose([Validators.required])],
        'id_client' :['',Validators.compose([Validators.required])],
        'duree' :['',Validators.compose([Validators.required])],
        'montant' :['',Validators.compose([Validators.required])],
        'commisions' :['',Validators.compose([Validators.required])], 
        'frequence' :['',Validators.compose([Validators.required])],
        'date_mission' :['',Validators.compose([Validators.required])],
        'heure_mission' :['',Validators.compose([Validators.required])],
        'nom_client' : [''],
        'adresse_client' : [''],
        'code_acces_1' : [''],
        'code_acces_2' : [''],
        'mission' : [''],
        'description' : [''],

      });

    }

    comboBox(affectation:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteAffectation(affectation.id_affectation).subscribe(data => {
            this.affectations = this.affectations.filter(u => u !== affectation);
          });

          let title : string = "Affectation supprimée avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })
      
    }

    filtrerAffectation(){
      
      if (this.filtrer_affectation_date && !this.filtrer_affectation_source_filtre){

        if (this.filtrer_affectation !== "") {

          this._utilisateurService.getAffectationsParFiltreIncluDate(this.filtrer_affectation, this.filtrer_affectation_du, this.filtrer_affectation_au).subscribe((data:Affectation[]) => {
            this.affectations = data;
            this.resumeDesAffectations()
          });

        }else{

          this._utilisateurService.getAffectationsParFiltreDate(this.filtrer_affectation_du, this.filtrer_affectation_au).subscribe((data:Affectation[]) => {
            this.affectations = data;
            this.resumeDesAffectations()
          });
        }
      }else{
        
        if(this.filtrer_affectation_source_filtre && this.filtrer_affectation_source >= 0){
          
          this._utilisateurService.getAffectationsParFiltreSourceDate(this.filtrer_affectation_source,this.filtrer_affectation_du,this.filtrer_affectation_au).subscribe((data:Affectation[]) => {
            this.affectations = data;
            this.resumeDesAffectations()
          });

        }else{
          
          if (this.filtrer_affectation !== "" ) {

            this._utilisateurService.getAffectationsParFiltre(this.filtrer_affectation).subscribe((data:Affectation[]) => {
              this.affectations = data;
              this.resumeDesAffectations()
            });

          }else{
            this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
              this.affectations = data;
              this.resumeDesAffectations()
            });
            
          }

        }

      }
      
    }

    resumeDesAffectations(){

      this.resume_duree = 0        
      this.resume_montant_option = 0     
      this.resume_montant = 0        
      this.resume_total_facture = 0         
      this.resume_commisions = 0	 
      this.nombreDeMission = 0

      this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {

        this.id_profil = data.id_profil;
    
        this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{

          this.administration = Number(data.administration);
          
          for (let index = 0; index < this.affectations.length; index++) {

            const element = this.affectations[index];
    
            if (Number(this.administration) === 1){
              
              if(Number(element.statut) === 0 || Number(element.statut) === -1){

                this.resume_duree += Number(element.duree)        
                this.resume_montant_option += Number(element.montant_option)    
                this.resume_montant += Number(element.montant)        
                this.resume_total_facture += Number(element.total_facture)          
                this.resume_commisions += Number(element.commisions)
                
                this.nombreDeMission +=1

              }
              
            }else{
    
              if((Number(element.id_utilisateur) === Number(this.id_utilisateur)) && Number(element.statut) === 0){
                this.resume_duree += Number(element.duree)        
                this.resume_montant_option += Number(element.montant_option)    
                this.resume_montant += Number(element.montant)        
                this.resume_total_facture += Number(element.total_facture)          
                this.resume_commisions += Number(element.commisions)
                this.nombreDeMission +=1
              }
    
            }
            
          }
    
          this.resume_marge = this.resume_total_facture - this.resume_commisions

        });

      });


    }

    listeDesSources(){

      this._utilisateurService.getSources().subscribe((data:any[]) => {
 
        this.sources = data;
  
      });
     }

     afficherSource(){

      this.affectations = []
      this.resume_duree = 0        
      this.resume_montant_option = 0     
      this.resume_montant = 0        
      this.resume_total_facture = 0         
      this.resume_commisions = 0	 
      this.nombreDeMission = 0
      this.resume_marge = 0
      
      if(!this.filtrer_affectation_source_filtre){
        this.filtrer_affectation_source = -1
      }

      this.filtrerAffectation()

     }

}
