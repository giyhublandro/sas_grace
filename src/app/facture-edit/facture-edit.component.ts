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
  selector: 'app-facture-edit',
  templateUrl: './facture-edit.component.html',
  styleUrls: ['./facture-edit.component.css']
})
export class FactureEditComponent {
  
  id_profil !: number ;
  
  isUpdate : boolean = false;
  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;

  affectations !: Affectation[];

  administration !: number;

  id_affectation !: number;
  id_facturation !: number;
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
  
  missions !: Mission[];
  clients !: Client[];

  nom_profil !:string;

  id_utilisateur_connecte !:number;

  tarif_horaire_personnel !: number;
  tarif_horaire_client !: number;
  tarif_horaire_option !:number;
  total_facture !:number;
  montant_option !:number;
  
  source_id !:number;
  
  jour_1 !:number;
  jour_2 !:number;
  jour_3 !:number;
  jour_4 !:number;
  jour_5 !:number;
  jour_6 !:number;
  jour_7 !:number;
  
  heure_1 !:any;
  heure_2 !:any;
  heure_3 !:any;
  heure_4 !:any;
  heure_5 !:any;
  heure_6 !:any;
  heure_7 !:any;
  
  id_affectation_frequence !: number;
  
  jour_11 :boolean = true;
  jour_12 :boolean = true;
  jour_13 :boolean = true;
  jour_14 :boolean = true;
  jour_15 :boolean = true;
  jour_16 :boolean = true;
  jour_10 :boolean = true;

  jour_21 :boolean = true;
  jour_22 :boolean = true;
  jour_23 :boolean = true;
  jour_24 :boolean = true;
  jour_25 :boolean = true;
  jour_26 :boolean = true;
  jour_20 :boolean = true;

  jour_31 :boolean = true;
  jour_32 :boolean = true;
  jour_33 :boolean = true;
  jour_34 :boolean = true;
  jour_35 :boolean = true;
  jour_36 :boolean = true;
  jour_30 :boolean = true;

  jour_41 :boolean = true;
  jour_42 :boolean = true;
  jour_43 :boolean = true;
  jour_44 :boolean = true;
  jour_45 :boolean = true;
  jour_46 :boolean = true;
  jour_40 :boolean = true;

  jour_51 :boolean = true;
  jour_52 :boolean = true;
  jour_53 :boolean = true;
  jour_54 :boolean = true;
  jour_55 :boolean = true;
  jour_56 :boolean = true;
  jour_50 :boolean = true;

  jour_61 :boolean = true;
  jour_62 :boolean = true;
  jour_63 :boolean = true;
  jour_64 :boolean = true;
  jour_65 :boolean = true;
  jour_66 :boolean = true;
  jour_60 :boolean = true;

  jour_71 :boolean = true;
  jour_72 :boolean = true;
  jour_73 :boolean = true;
  jour_74 :boolean = true;
  jour_75 :boolean = true;
  jour_76 :boolean = true;
  jour_70 :boolean = true;
  
  administration_edit :number = -1
  validations :boolean =false
  readingOnly : boolean = false
  
  numero_facture :string =""

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
     private _authService: AuthService,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {

      this.listeDesMissions();

      this.createAffectationForm();

      this.listeDesPersonnels();

      this.listeDesClients();

      this.id_utilisateur_connecte = this.routes.snapshot.params['id_utilisateur'];

      this.infoUtilisateur()

      if (this.routes.snapshot.params['id_affectation']){
        this.id_affectation = this.routes.snapshot.params['id_affectation']
        this.detailMission = true
        
        this.infoDetailAffectation(this.id_affectation)
        
      }else if (true) {
        
      }
      
      this.routes.params.subscribe(routeParams => {
  
        this.id_facturation = routeParams['id_facturation']
        
        if(Number(this.id_facturation) > 0 ){

          this.listeDesAffectations(this.id_facturation)

          this.infoFacture(this.id_facturation)

        }
  
      });

    }
    
    listeDesAffectations(id_facturation:number){
      
      this._utilisateurService.getAffectationsByFacturationId(id_facturation).subscribe((data:Affectation[]) => {
        this.affectations = data;
        this.resumeDesAffectations()

      });

    }

    delete(affectation:any){
      this.comboBox(affectation);
    }
    
    infoFacture(id_facturation :number){

      this._utilisateurService.getFactureById(id_facturation).subscribe((data: any) => {
    
        if (data == null){
          this._authService.logout();
        }else{
  
          this.numero_facture= data.numero_facture;
  
        }
  
      });

    }

    infoUtilisateur(){

      this._utilisateurService.getUserById(this.id_utilisateur_connecte).subscribe((data: any) => {
    
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
    
          this.router.navigate(['/edit-facture', this.id_utilisateur_connecte]);
          
          this.listeDesAffectations(this.id_facturation)    
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
    
          this.router.navigate(['/edit-facture', this.id_utilisateur_connecte]);
          
          this.listeDesAffectations(this.id_facturation)    
    
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

        this.tarif_horaire_personnel = data.tarif_horaire_personnel
        this.tarif_horaire_client = data.tarif_horaire_client

        this.total_facture = data.total_facture
        this.montant_option =data.montant_option
        this.tarif_horaire_option =data.tarif_horaire_option
        
        this.source_id = data.source_id

        this.getDetailFrequence(id_affectation)

      });

    }

    edit(affectation:any){

      this.router.navigate(['/edit-facture',this.id_utilisateur_connecte, this.id_facturation, affectation.id_affectation]);

    }

    createAffectationForm() {

      this.assignForm = this.formBuilder.group({
       
       'id_affectation' :['',Validators.compose([Validators.required])],
       'id_mission' :['',Validators.compose([Validators.required])],
       'id_utilisateur':['',Validators.compose([Validators.required])],
        'id_client' :['',Validators.compose([Validators.required])],
        'duree' :['',Validators.compose([Validators.required])],
        'montant' :['',Validators.compose([Validators.required])],
        'commisions' :['',Validators.compose([Validators.required])],      
        'frequence' :['',Validators.compose([Validators.required])],
        'date_mission' :[''],     
        'heure_mission' :[''],
        'tarif_horaire_personnel' :['',Validators.compose([Validators.required])],
        'tarif_horaire_client' :['',Validators.compose([Validators.required])],
        'jour_1':[''],
        'heure_1':[''],
        'jour_2':[''],
        'heure_2':[''],
        'jour_3':[''],
        'heure_3':[''],
        'jour_4':[''],
        'heure_4':[''],
        'jour_5':[''],
        'heure_5':[''],
        'jour_6':[''],
        'heure_6':[''],
        'jour_7':[''],
        'heure_7':[''],
        'source_id':[''],
        'montant_option':[],
        'tarif_horaire_option':[],
        'id_affectation_frequence':[],
        'total_facture':[]

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

    resumeDesAffectations(){

      this.resume_duree = 0        
      this.resume_montant_option = 0     
      this.resume_montant = 0        
      this.resume_total_facture = 0         
      this.resume_commisions = 0	 
      this.nombreDeMission = 0

      this._utilisateurService.getUserById(this.id_utilisateur_connecte).subscribe((data: any) => {

        this.id_profil = data.id_profil;
    
        this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{

          this.administration = Number(data.administration);
          
          for (let index = 0; index < this.affectations.length; index++) {

            const element = this.affectations[index];
    
            if (Number(this.administration) === 1){
              
              this.resume_duree += Number(element.duree)        
                this.resume_montant_option += Number(element.montant_option)    
                this.resume_montant += Number(element.montant)        
                this.resume_total_facture += Number(element.total_facture)          
                this.resume_commisions += Number(element.commisions)
                
                this.nombreDeMission +=1
              
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

     getDetailFrequence(id_affectation:number){

      this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{
  
        this.id_affectation_frequence =data.id_affectation_frequence
  
        this.jour_1 =data.jour_1
        this.jour_2 =data.jour_2
        this.jour_3 =data.jour_3
        this.jour_4 =data.jour_4
        this.jour_5 =data.jour_5
        this.jour_6 =data.jour_6
        this.jour_7 =data.jour_7
        
        this.heure_1 =data.heure_1
        this.heure_2 =data.heure_2
        this.heure_3 =data.heure_3
        this.heure_4 =data.heure_4
        this.heure_5 =data.heure_5
        this.heure_6 =data.heure_6
        this.heure_7 =data.heure_7
        
      });
  
    }

    onChangeClient(e:Event){
      this.montantFraisOption(this.id_client)
    }
  
    montantFraisOption(id_client:number){
      
      this._utilisateurService.getClientOptions(id_client).subscribe((data:any) => {
        
        this.montant_option = 0
        this.tarif_horaire_option = 0
        this.tarif_horaire_option = Number(data.montant_option_1) + Number(data.montant_option_2) + Number(data.montant_option_3) + Number(data.montant_option_4)
        
        this.calculationOfValues();
  
      });
  
    }
  
    onTarifHoraireOptionChange(){
  
      this.montant_option = 0;
      this.montant_option = this.duree * this.tarif_horaire_option
  
      this.calculationOfValues();
  
    }
  
    onDateMissionChange(e:Event){
          
      let date : Date = new Date((<HTMLInputElement>e.target).value);
      let day = Number(date.getDay());
      let month = Number(date.getMonth())
  
      this.jour_1 = day;
  
      if (this.frequence == 2 || this.frequence == 5){
  
        this.jour_2 = 0;
        this.jour_3 = 0;
        this.jour_4 = 0;
        this.jour_5 = 0;
        this.jour_6 = 0;
        this.jour_7 = 0;
  
        this.heure_2 = "";
        this.heure_3 = "";
        this.heure_4 = "";
        this.heure_5 = "";
        this.heure_6 = "";
        this.heure_7 = "";
        
      }
  
      if (this.frequence == 3){
  
        this.jour_3 = 0;
        this.jour_4 = 0;
        this.jour_5 = 0;
        this.jour_6 = 0;
        this.jour_7 = 0;
  
        this.heure_3 = "";
        this.heure_4 = "";
        this.heure_5 = "";
        this.heure_6 = "";
        this.heure_7 = "";
        
      }
  
    }
  
    onHeureMissionChange(e:Event){
       this.heure_1 = (<HTMLInputElement>e.target).value
    }

    calculationOfValues(){
        
      this.commisions = this.duree * this.tarif_horaire_personnel

      this.montant_option = this.duree * this.tarif_horaire_option

      this.montant = this.duree * this.tarif_horaire_client

      this.total_facture = this.montant + this.montant_option

    }

  updateAffectation(affectation:any){
    
    let inserer : boolean = false;

    let duree :number = Number(affectation.duree)
    let montant :number = Number(affectation.montant)
    let tarif_horaire_client :number = Number(affectation.tarif_horaire_client)
    let tarif_horaire_option :number = Number(affectation.tarif_horaire_option)
    let montant_option :number = Number(affectation.montant_option)
    let tarif_horaire_personnel :number = Number(affectation.tarif_horaire_personnel)
    let total_facture :number = Number(affectation.total_facture)
    
    if (duree * (tarif_horaire_client + tarif_horaire_option) === total_facture){
      if((tarif_horaire_personnel*duree) <= total_facture){
        if((tarif_horaire_option*duree) <= montant_option){
          if((tarif_horaire_personnel) <= tarif_horaire_client){
            inserer = true
          }
        }
      }
    }

    if (inserer){
      
      this._utilisateurService.updateAffectation(affectation).subscribe((data) => {
      
        let title : string = "Mission mise à jours avec succès";
  
        this._notificationService.createNotification(2, title)
        
        this.listeDesAffectations(this.id_facturation)
        
        this._utilisateurService.miseAjoursDeFactureApresEditionDeMission(this.id_facturation).subscribe((data) => {

        });

        this.router.navigate(['edit-facture', this.id_utilisateur_connecte, this.id_facturation]);

      });
      
    }else{
      
      let title : string = "Bien vouloir vérifier les montants saisies";
      this._notificationService.createNotification(1, title)

    }

  }

  onDureeChange(){
    
    this.total_facture = 0

    this.montant = this.duree * this.tarif_horaire_client
    this.montant_option = this.duree * this.tarif_horaire_option
    this.commisions = this.duree * this.tarif_horaire_personnel
    this.total_facture = this.montant_option + this.montant

  }

  onTarifHorairePersonnelChange(){

    this.calculationOfValues();
  }

  onTarifHoraireClientChange(){

    this.calculationOfValues();

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

}
