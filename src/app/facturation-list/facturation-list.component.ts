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
import { Facture } from '../models/facture';
import { Affectation } from '../models/affectation';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-facturation-list',
  templateUrl: './facturation-list.component.html',
  styleUrls: ['./facturation-list.component.css']
})
export class FacturationListComponent {

  factures !: Facture[];

  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;

  administration !: number;
  id_profil !:number;
  tarif_horaire_personnel !:number;
  tarif_horaire_client !:number;
  commisions !:number;
  montant !:number;
  duree !:number;

  etat : number = 0;
  h1Title : string = "Factures Produites Non Réglées"
  factureExist : boolean= false;
  
  filtrer_affectation :string =""
  filtrer_affectation_date : boolean =false
  filtrer_affectation_du !:Date
  filtrer_affectation_au !:Date

  resume_reglee :number = 0     
  resume_non_reglee  :number = 0     
  resume_total :number = 0
  nombreDeFacture :number = 0
  nombreDeFactureNonReglee :number = 0
  
  online : boolean = true

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
     private _authService :AuthService,
    private router:Router,
    private _notificationService : NotificationService) { }

    _id: any;

    ngOnInit(): void {

      this.etat = 0;

      this.createFactureForm();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      this.infoUtilisateur();

      
      this.filtrerFacture();
      
      //this.listeDesFacturesPersonnel();
   

    }

    createFactureForm() {

      this.assignForm = this.formBuilder.group({
       
        'id_client' :['',Validators.compose([Validators.required])],
        'date_du' :[''],
        'date_au' :['']

      });

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

    listeDesFactures(){

      this._utilisateurService.getFactures().subscribe((data:Facture[]) => {
        this.factures = data;

      });

    }

    listeDesFacturesPersonnel(){

      this._utilisateurService.getFacturesPersonnel().subscribe((data:Facture[]) => {
        this.factures = data;

      });

    }

    titreFenetre  : string ="Factures"
    titreButton : string = "Afficher"
    
    delete(utilisateur:any){

      this.comboBox(utilisateur)
    }

  
    edit(facture:any){
      
      this.router.navigate(['edit-facture',this.id_utilisateur, facture.id_facturation]);
      
    }

    imprimer(data:any){

      //let rapport : number = parseInt(data.rapports)
      
      let rapport : number = 1

      let nom_rapport : string =""

      let baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm";
      let baseUrlOffline:string="http://localhost/angular/coup_de_balai";
      let baseUrl :string = baseUrlOffline
      let urlString : string = ""
      
      if(this.online){
        baseUrl = baseUrlOnline
      }

      if(rapport == 1){
        nom_rapport ="facture_client"
        urlString  = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?id_facturation="+data.id_facturation+"&date_facturation="+data.date_facturation+"&numero_facture="+data.numero_facture+"&nom_client="+data.nom_client+"&adresse_client="+data.adresse_client+"&telephone_1="+data.telephone_1+"&telephone_2="+data.telephone_2+"&email_client="+data.email_client+"&numero_siret="+data.numero_siret+"&type_client="+data.type_client;
      }else if(rapport == 2){
        nom_rapport ="entrees"
      }else if(rapport == 3){
        
      }else if(rapport == 5){
        
      }

      if (rapport > 0){
        window.open(urlString, "_blank")
      }else{

      }

    }

    deleteFactureNull(){

     // this._utilisateurService.deleteFactureNull().subscribe((data) => {

      //});

    }

    onChangeEtatFacture(){

      this.h1Title = "Factures Produites Réglées"

      //this.listeDesFactures()
      this.filtrerFacture()

    }

    regler(facture:any, regle:any){

      let title : string = "";

      if (regle == 1){
        title = "Facture réglée avec succès";
      }else if(regle == 0){
        title = "Annulation de règlement avec succès";
      }

      this._utilisateurService.updateFactureEtat(facture, regle).subscribe((data) => {

          this._notificationService.createNotification(2, title);
    
          //this.router.navigate(['/facturation-list',this.id_utilisateur]);

          //this.listeDesFactures()
          this.filtrerFacture()
    
      });

    }

    comboBox(id_facturation:number){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteFacture(id_facturation).subscribe((data:any[]) => {
          this.filtrerFacture()
        });
  

          let title : string = "Facture supprimé avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })

      
    }

    toastAlertSuccess(title : string){
        
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: title
      })
  
    }

    facturation(){
      this.router.navigate(['/facturation',this.id_utilisateur]);
    }
    
    assignationDesSourcesAuxFacture(){
      
      let value : number = 0
      this._utilisateurService.assignerSourceAuxFactures(value).subscribe((data:any) => {
      
      });
      

    }

    filtrerFacture(){
      
      this.assignationDesSourcesAuxFacture()

      if (this.filtrer_affectation_date){

        if (this.filtrer_affectation !== "") {
          
          this._utilisateurService.getFacturesParFiltreIncluDate(this.filtrer_affectation, this.filtrer_affectation_du, this.filtrer_affectation_au).subscribe((data:Facture[]) => {
            this.factures = data;
            this.resumeDesFactures()
          });

        }else{
          this._utilisateurService.getFacturesParFiltreDate(this.filtrer_affectation_du, this.filtrer_affectation_au).subscribe((data:Facture[]) => {
            this.factures = data;
            this.resumeDesFactures()
          });
        }
      }else{

        if (this.filtrer_affectation !== "" ) {
          
          this._utilisateurService.getFacturesParFiltre(this.filtrer_affectation).subscribe((data:Facture[]) => {
            this.factures = data;
            this.resumeDesFactures()
          });

        }else{

          this._utilisateurService.getFactures().subscribe((data:Facture[]) => {
            this.factures = data;
            this.resumeDesFactures()
          });
          
        }

      }
      
    }

    resumeDesFactures(){

      this.nombreDeFacture = 0
      this.nombreDeFactureNonReglee = 0
      this.resume_reglee = 0
      this.resume_non_reglee = 0

      this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {

        this.id_profil = data.id_profil;
    
        this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{

          this.administration = Number(data.administration);
          
          for (let index = 0; index < this.factures.length; index++) {

            const element = this.factures[index];
    
            if (Number(this.administration) === 1){
              
              if(Number(element.etat) == 1 ){
                this.resume_reglee += Number(element.montant)  
                this.nombreDeFacture += 1      
              }else{
                this.resume_non_reglee += Number(element.montant)
                this.nombreDeFactureNonReglee += 1
              }
              
            }else{
    
              if(Number(element.etat) == 1 ){
                this.resume_reglee += Number(element.montant)        
                this.nombreDeFacture += 1
              }else{
                this.resume_non_reglee += Number(element.montant)
                this.nombreDeFactureNonReglee += 1
              }
    
            }
            
          }
    
          this.resume_total = this.resume_reglee + this.resume_non_reglee

        });

      });


    }

    annulerFacturation(id_facturation :number){
   
      this.comboBox(id_facturation)

    }


}
