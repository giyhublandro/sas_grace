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
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.css']
})
export class PaiementListComponent {

  
  id_profil !: number ;
  
  isUpdate : boolean = false;
  missionForm! : FormGroup;

  id_utilisateur : number = 0 ;

  affectations !: Affectation[];

  administration !: number;
  
  filtrer_affectation :string =""
  filtrer_affectation_date : boolean =false
  filtrer_affectation_du !:Date
  filtrer_affectation_au !:Date
  
  resume_duree :number = 0     
  resume_montant_option :number = 0     
  resume_montant :number = 0    
  resume_total_facture :number = 0 
  resume_commisions :number = 0
  resume_marge :number = 0
  
  nombreDeMission :number = 0
  
  sources : Source[]=[];

  filtrer_affectation_source :number = -1
  filtrer_affectation_source_filtre :boolean =false

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
     private _authService: AuthService,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      this.infoUtilisateur()

      if (this.routes.snapshot.params['id_utilisateur_edit']){

      }else if (true) {

      }

      this.filtrerAffectation()

      this.listeDesSources()

    }

    listeDesAffectations(){

      this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
        this.affectations = data;
        
        this.resumeDesAffectations()

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
  
          this.id_profil = data.id_profil
  
          this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
  
            this.administration = data.administration
            
          });
          
  
        }
  
      });

    }

    payer(affectation:any){

      let payer : number = 3;

      this._utilisateurService.updateEtat(affectation, payer).subscribe((data) => {

        let title : string = "";

          title = "Mission payée avec succès";
    
          this._notificationService.createNotification(2, title);
    
          this.router.navigate(['/paiement-list', this.id_utilisateur]);
          
          this.filtrerAffectation()
          //this.listeDesAffectations()
    
      });
      
    }

    validerAnnuler(affectation:any, etat:number){

      let title : string = "";

      if (etat == 3)  {
        title = "Mission Annulée avec succès";
      }else if (etat == 1)  {
        title = "Mission Validée avec succès";
      }

      this._utilisateurService.updateEtat(affectation, etat).subscribe((data) => {
        
          this._notificationService.createNotification(2, title);
    
          this.router.navigate(['/assigner-mission-list', this.id_utilisateur]);
          
          this.filtrerAffectation()

          //this.listeDesAffectations()
    
      });

    }

    edit(affectation:any){

      this.router.navigate(['/assigner-mission-edit',this.id_utilisateur, affectation.id_affectation]);

    }
    
    createAffectation(){
      this.router.navigate(['/assigner-mission',this.id_utilisateur]);
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
      //SI LES DATES SONT ACTIVES ON FOUILLE PAR APPORT AU DATE ET FILTRE SI LES SOURCES NE SONT PAS ACTIFS
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

              if(Number(element.statut) === 2 || Number(element.statut) === 3){
                this.resume_duree += Number(element.duree)        
                this.resume_montant_option += Number(element.montant_option )    
                this.resume_montant += Number(element.montant)        
                this.resume_total_facture += Number(element.total_facture)          
                this.resume_commisions += Number(element.commisions)
                
                this.nombreDeMission +=1

              }
              
            }else{
    
              if((Number(element.id_utilisateur) === Number(this.id_utilisateur)) && Number(element.statut) > 0){
                this.resume_duree += Number(element.duree)        
                this.resume_montant_option += Number(element.montant_option )    
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
