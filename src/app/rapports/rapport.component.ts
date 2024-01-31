import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { Client } from '../models/client';

import { RapportService } from '../services/rapport.service';
import { Pays } from '../models/pays';
import { Source } from '../models/source';
import { UtilisateurService } from '../services/utilisateur.service';
import { Profiles } from '../models/profils';
import { Facture } from '../models/facture';
import { NotificationService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { Affectation } from '../models/affectation';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent {

  sources !: Source[];
  affectations !:Affectation[];
  utilisateurs !:Utilisateurs[];

  rapportForm !: FormGroup
  rapport !:number
  selectedFiltre !: number;
  selectedFiltreFacture !:number;
  selectedFiltreAffectation !: number;

  assignForm! : FormGroup;

  formValueAfterFiltre !: any[];

  h1Title !: string;
  selectedRapport !:any
  rapportMembres : boolean =false
  rapportPrevisions : boolean =false
  rapportEntrees : boolean =false
  rapportsSorties : boolean =false
  showDate : boolean =true

  showButton :boolean =true;
  administration !: number;

  profils !: Profiles[];
  clients !: Client[];
  facturesList !: Facture[];

  client : boolean =false;
  utilisateur : boolean = false;
  factures : boolean =false;
  affectation :boolean = false
  etat : number = 0;

  id_utilisateur !: number;
  id_profil !: number;
  
  total_facture :number = 0;
  chiffresAffaires =false;
  
  selectedFiltreCA : number = -1
  
  CA : any[] = [];
  clientsList :any[] = []
  users :any[]=[]
  
  resume_duree :number = 0     
  resume_montant_option :number = 0     
  resume_montant :number = 0    
  resume_total_facture :number = 0          
  resume_commisions :number = 0
  resume_marge :number = 0
  nombreMission :number = 0;
  statut :number = -1
  
  nombreClient  :number = 0;
  nombreUsers :number = 0;
  
  online = true;

  total_chiffres_affaires :number= 0;

  constructor(private formBuilder:FormBuilder,
    private _rapportService : RapportService,
    private routes:ActivatedRoute,
    private _notificationService:NotificationService,
    private _authService:AuthService,
    private _utilisateurService:UtilisateurService,
   private router:Router) { }
   

  ngOnInit() : void {

    this.etat = 0;

    this.createRapportForm();

    this.listeDesSources();

    this.lesProfils();

    this.lesClients();

    //this.listeDesAffectations()

    this.createFactureForm();

    this.listeDesUtilisateurs();

    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    this.infoUtilisateur();

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

  onChangeRapport(e:Event){
    
    this.facturesList = [];
    this.affectations = [];
    this.users =[];

    //SELECTION DES ARRONDISSEMENTS DU DEPARTEMENT
    this.selectedRapport = (<HTMLInputElement>e.target).value;
    this.rapport = Number(parseInt(this.selectedRapport));
    
    if(this.rapport == 2 || this.rapport == 3 || this.rapport == 4){
      this.resumeDesAffectations();
    }

    this.infoRapport(this.rapport);

  }

  createFactureForm() {

    this.assignForm = this.formBuilder.group({
     
      'id_client' :['',Validators.compose([Validators.required])],
      'date_du' :[''],
      'date_au' :['']

    });

  }

  listeDesFactures(){

    this._utilisateurService.getFactures().subscribe((data:Facture[])=>{
      this.facturesList = data
    })

  }

  onChangeFactureState(){

    this.h1Title = "Factures Produites Réglées"

      this._utilisateurService.getFacturesPeriodique(this.formValueAfterFiltre).subscribe( (data:Facture[]) => {
      this.facturesList = data;
      this.total_facture = 0;
      
      for (let index = 0; index < this.facturesList.length; index++) {
        const element = this.facturesList[index];

        if (this.etat == Number(element.etat)){
          this.total_facture += Number(element.montant)
        }
        
      }

      });

  }

  onChangeFiltre(e:Event){
    //CLIENTS = RAPPORT 1
    this.selectedFiltre = parseInt((<HTMLInputElement>e.target).value);
    this.clientsList = []

  }

  onChangeFiltreAffectation(e:Event){
    this.selectedFiltreAffectation = parseInt((<HTMLInputElement>e.target).value);
  }

  onChangeFiltreFacture(e:Event){

    this.facturesList = [];
    this.selectedFiltreFacture = parseInt((<HTMLInputElement>e.target).value);

  }

  onChangeFiltreCA(e:Event){
    this.CA = []  
    this.total_chiffres_affaires = 0;
    this.selectedFiltreCA = Number(parseInt((<HTMLInputElement>e.target).value));
  }

  createRapportForm(){

    this.rapportForm = this.formBuilder.group({
       
      'rapports' :['',Validators.compose([Validators.required])],
      'date_du' :['',Validators.compose([Validators.required])],
      'date_au' :['',Validators.compose([Validators.required])],
      'type_client':[''],
      'id_source':[''],
      'filtre':[''],
      'frequence':[''],
      'id_profil':[''],
      'filtre_facture':[''],
      'id_client':[''],
      'filtre_affectation':[''],
      'id_utilisateur':['']
      
     });

  }

  imprimer(data:any){

    //let rapport : number = parseInt(data.rapports)

    let rapport : number = 1

    let nom_rapport : string =""

    let baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm";
    let baseUrlOffline:string="http://localhost/angular/coup_de_balai";
    
    let baseUrl :string = baseUrlOffline;
    //let baseUrl :string = baseUrlOnline;

    if (this.online){
      baseUrl = baseUrlOnline;
    }

    let urlString : string = ""

    if(rapport == 1){
      nom_rapport ="facture_client"
      urlString  = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?id_facturation="+data.id_facturation+"&date_facturation="+data.date_facturation+"&numero_facture="+data.numero_facture+"&nom_client="+data.nom_client+"&adresse_client="+data.adresse_client+"&telephone_1="+data.telephone_1+"&telephone_2="+data.telephone_2+"&email_client="+data.email_client+"&numero_siret="+data.numero_siret+"&type_client="+data.type_client;
    }
  
    if (rapport > 0){
      window.open(urlString, "_blank")
    }else{

    }
    
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

        this._utilisateurService.getFacturesPeriodique(this.formValueAfterFiltre).subscribe((data:any[]) => {
          this.facturesList =data;
        });
  
    });

  }

  listeDesUtilisateurs(){

    this._utilisateurService.getUsers().subscribe((data:Utilisateurs[]) => {
      this.utilisateurs = data;

    });

  }

  listeDesSources(){

    this._utilisateurService.getSources().subscribe((data:any[]) => {
      
      this.sources = data;

    });
 }

 listeDesAffectations(){

  this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
    this.affectations = data;

  });

}

  infoRapport(rapport : number){
    

    if(rapport == 9){
      this.showDate = true
    }else {
      
      this.showDate = true

      if(rapport == 1){
        this.client = true;
        this.utilisateur =false;
        this.factures =false;
        this.showButton =true;
        this.affectation = false;
        this.chiffresAffaires =false;
      }else if(rapport == 2){
        this.client = false;
        this.selectedFiltre = -1;
        this.utilisateur =false;
        this.factures =false;
        this.showButton =true;
        this.affectation = true;
        this.chiffresAffaires =false;
      }else if(rapport == 3){
        this.client = false;
        this.selectedFiltre = -1;
        this.utilisateur =false;
        this.factures =false;
        this.showButton =true;
        this.affectation = true;
        this.chiffresAffaires =false;
      }else if(rapport == 5){
        this.client = false;
        this.selectedFiltre = -1;
        this.utilisateur =false;
        this.factures =true;
        this.showButton =false;
        this.affectation = false;
        this.chiffresAffaires =false;
      }else if(rapport == 4){
        this.client = false;
        this.selectedFiltre = -1;
        this.utilisateur =false;
        this.factures =false;
        this.showButton =true;
        this.affectation = true;
        this.chiffresAffaires =false;
      }else if(rapport == 6){
        this.utilisateur =true;
        this.factures =false;
        this.client = false;
        this.selectedFiltre = -1;
        this.showButton =true;
        this.affectation = false;
        this.chiffresAffaires =false;
      }else if(rapport == 7){
        this.utilisateur =false;
        this.factures =false;
        this.chiffresAffaires =true;
        this.client = false;
        this.selectedFiltre = -1;
        this.showButton =false;
        this.affectation = false;
        this.client =false;
      }
      
    }

    if(this.rapport == 2 || this.rapport == 3 || this.rapport == 4){
        if(this.rapport == 2){
          this.statut = 0
        }else if(this.rapport == 3){
          this.statut = 1
        }else if(this.rapport == 4){
          this.statut = 2
        }
    }else{
      this.statut = -1
    }

  }

  lesProfils(){

    this._utilisateurService.getListesProfil().subscribe((data:any[]) =>{
      this.profils = data;
    });

  }

  lesClients(){

    this._utilisateurService.getClients().subscribe((data:any) =>{
      this.clients = data
    });

  }

  afficher(data:any){

    let rapport : number = parseInt(data.rapports)
    
    let nom_rapport : string =""

    let baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm";
    let baseUrlOffline:string="http://localhost/angular/coup_de_balai";

    let baseUrl = baseUrlOffline;

    if (this.online){
      baseUrl = baseUrlOnline;
    }
    
    let date_au : Date = data.date_au
    let date_du : Date = data.date_du

    let urlString !: string;

    if(rapport == 1){

      nom_rapport ="clients"

      if (this.selectedFiltre == 0) {
         urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au
      }else if(this.selectedFiltre == 1){
        urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&type_client="+data.type_client;
      }else if(this.selectedFiltre == 2){
        urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&source="+data.id_source;
      }else if(this.selectedFiltre == 3){
        urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&frequence="+data.id_source;
      }
    
    }else if(rapport == 2 || rapport == 3 || rapport == 4){
      
        nom_rapport ="affectation"

        if (data.filtre_affectation == 0 ){
          urlString  = baseUrlOffline + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&id_rapport="+data.rapports+"&filtre_affectation="+data.filtre_affectation;
        }else if (data.filtre_affectation == 1 ){
          urlString  = baseUrlOffline + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&id_rapport="+data.rapports+"&filtre_affectation="+data.filtre_affectation+"&id_client="+data.id_client;
        }else if (data.filtre_affectation == 2 ){
          urlString  = baseUrlOffline + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&id_rapport="+data.rapports+"&filtre_affectation="+data.filtre_affectation+"&id_utilisateur="+data.id_utilisateur;
        }

      }else if(rapport == 5){
      nom_rapport ="factures";
      urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&id_profil="+data.id_profil;
    }else if(rapport == 6){
      nom_rapport ="utilisateurs";
      urlString = baseUrl + "/html2pdf/rapports/"+nom_rapport+".php?date_du="+date_du+"&date_au="+date_au+"&id_profil="+data.id_profil;
    }

    if (rapport > 0){
      window.open(urlString, "_blank")
    }else{

    }

  }
  
  afficherFacture(data:any){

    this.formValueAfterFiltre = data;

    this.facturesList = [];

    this._utilisateurService.getFacturesPeriodique(data).subscribe( (data:Facture[]) => {
      this.facturesList = data;
      this.total_facture = 0;
      for (let index = 0; index < this.facturesList.length; index++) {
        const element = this.facturesList[index];

        if (this.etat == Number(element.etat)){
          this.total_facture += Number(element.montant)
        }
        
      }

    });

  }

  visualiserRapport(value:any){
    
    if(this.rapport == 7){
      
      this._rapportService.rapportChiffresAffaires(value.filtre, value.date_du, value.date_au).subscribe((data:any[]) => {
      
        this.CA =data
        
        this.total_chiffres_affaires = 0;
  
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.total_chiffres_affaires += Number(element.total_facture)
        }
  
      });

    }else if(this.rapport == 1){

      this._rapportService.rapportClients(value, this.selectedFiltre).subscribe((data:any[]) => {
      
        this.clientsList = data
        this.nombreClient = data.length

      });
      
    }else if(this.rapport == 6){

      this._rapportService.rapportUtilisateurs(value).subscribe((data:any[]) => {
        this.users = data
        this.nombreUsers =data.length

      });
      
    }else if(this.rapport == 2 || this.rapport == 3 || this.rapport == 4){
      
      this._rapportService.rapportAffectations(value).subscribe((data:any[]) => {
        this.affectations = data
        console.log(this.affectations)
        this.resumeDesAffectations()
      });
      
    }

  }

  resumeDesAffectations(){

    this.resume_duree = 0        
    this.resume_montant_option = 0     
    this.resume_montant = 0        
    this.resume_total_facture = 0         
    this.resume_commisions = 0	 
    this.nombreMission = 0

    this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {

      this.id_profil = data.id_profil;
  
      this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{

        this.administration = Number(data.administration);
        
        for (let index = 0; index < this.affectations.length; index++) {

          const element = this.affectations[index];
          
          if(this.rapport == 2 || this.rapport == 3 ){

            if(Number(element.statut) == this.statut){
              this.resume_duree += Number(element.duree)        
              this.resume_montant_option += Number(element.montant_option )    
              this.resume_montant += Number(element.montant)        
              this.resume_total_facture += Number(element.total_facture)          
              this.resume_commisions += Number(element.commisions)
              this.nombreMission += 1
            }
          }else if(this.rapport == 4) {

            if(Number(element.statut) >= 2){
              this.resume_duree += Number(element.duree)        
              this.resume_montant_option += Number(element.montant_option )    
              this.resume_montant += Number(element.montant)        
              this.resume_total_facture += Number(element.total_facture)          
              this.resume_commisions += Number(element.commisions)
              this.nombreMission += 1
            }

          }
          
        }
  
        this.resume_marge = this.resume_total_facture - this.resume_commisions

      });

    });


  }

}
