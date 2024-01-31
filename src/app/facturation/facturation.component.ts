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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent {
  
  missions !: Mission[];
  clients !: Client[];

  isUpdate : boolean = false;
  facturationForm! : FormGroup;

  id_utilisateur : number = 0 ;
  id_client !:number;
  date_facturation !:Date 
  affectations !: Affectation[];

  utilisateurs !: Utilisateurs[];

  nom_profil !:string;

  tarif_horaire_personnel !:number;
  tarif_horaire_client !:number;
  commisions !:number;
  montant !:number;
  duree !:number;

  montant_facture :number = 0;

  factureExist : boolean= false;
  
  filtrer_client : string = ""
  
  date_du !: Date
  date_au !: Date

  resume_duree :number = 0     
  resume_montant_option :number = 0     
  resume_montant :number = 0    
  resume_total_facture :number = 0          
  resume_commisions :number = 0
  resume_marge :number = 0
  nombreDeMission :number = 0

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
     private datepipe :DatePipe,
    private router:Router,
    private _notificationService : NotificationService) { 

    }

    _id: any;

    ngOnInit(): void {
      
      this.listeDesMissions()

      this.createFactureForm();

      this.listeDesPersonnels()

      this.listeDesClients()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    listeDesFacturesProduites(){
      this.router.navigate(['/facturation-list',this.id_utilisateur]);
    }

    createFactureForm() {

      this.facturationForm = this.formBuilder.group({
       
        'id_client' :['',Validators.compose([Validators.required])],
        'date_facturation':['',Validators.compose([Validators.required])],
        'date_du' :[''],
        'date_au' :['']

        
      });

    }

    listeDesClients(){

      this._utilisateurService.getClients().subscribe((data:Client[]) => {
        this.clients = data;
      });

    }

    listeDesMissions(){

      this._utilisateurService.getMissions().subscribe((data:any[]) => {
        
        this.missions = data;

      });

    }

    listeDesPersonnels(){

      this._utilisateurService.getPersonnels().subscribe((data:any[]) => {
        
        this.utilisateurs = data;

      });

    }

    titreFenetre  : string ="Facturation"
    titreButton : string = "Afficher"
    
    delete(utilisateur:any){

      this.comboBox(utilisateur)
    }

  
    edit(utilisateur:any){

      //this.router.navigate(['update-utilisateur',this.id_utilisateur, utilisateur.id_utilisateur]);
      
    }

    onClientChange(){
      this.affectations = [];
    }

    filtrerAffectation(values:any){
      
      console.log(values)

      this._utilisateurService.getAffectationByClientId(values).subscribe((data:any) => {
        this.affectations = data;

        if(this.affectations.length > 0){
          this.factureExist =true
          this.resumeDesAffectations()
        }else{
          this.factureExist =false
        }

      });
      
    }

    facturer(){

      this.montant_facture = 0;
      
      for (let index = 0; index < this.affectations.length; index++) {

        this.id_client = this.affectations[index]['id_client'];
          this.montant_facture += Number(this.affectations[index]['total_facture']);

          this._utilisateurService.updateEtat(this.affectations[index], 2).subscribe((data) => {
            
          });

      } 

        let libelle : string = this.affectations[0]['nom_client'] + " [" + this.date_facturation  + "]" ;
        this._utilisateurService.createFacture(this.affectations, this.montant_facture, this.id_client, this.date_facturation, libelle, this.date_du, this.date_au).subscribe((data) => {
        
        });
      
      let title : string = "Facture produite avec succès"
      this._notificationService.createNotification(2, title);

      this.affectations= [];
      this.resumeDesAffectations()
      //this.router.navigate(['/facturation-list',this.id_utilisateur]);
      
    }

    comboBox(utilisateur:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteUser(utilisateur.id_utilisateur).subscribe(data => {
            this.utilisateurs = this.utilisateurs.filter(u => u !== utilisateur);
          });

          let title : string = "Utilisateur supprimé avec succès";

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

    filtrerClient(){

      this._utilisateurService.getClientsFiltre(this.filtrer_client).subscribe((data:Client[]) => {
        
        this.clients = data;
        
        if(this.clients != null){
          this.id_client = this.clients[0]['id_client']
        }

      });

    }

    resumeDesAffectations(){

      this.resume_duree = 0        
      this.resume_montant_option = 0     
      this.resume_montant = 0        
      this.resume_total_facture = 0         
      this.resume_commisions = 0	 
      this.nombreDeMission = 0
      
      for (let index = 0; index < this.affectations.length; index++) {

        const element = this.affectations[index];
 
        this.resume_duree += Number(element.duree)        
        this.resume_montant_option += Number(element.montant_option )    
        this.resume_montant += Number(element.montant)        
        this.resume_total_facture += Number(element.total_facture)          
        this.resume_commisions += Number(element.commisions)

        this.nombreDeMission += 1
        
      }

      this.resume_marge = this.resume_total_facture - this.resume_commisions

    }

}
