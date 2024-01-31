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
import { Client } from '../models/client';

@Component({
  selector: 'app-assigner-mission-edit',
  templateUrl: './assigner-mission-edit.component.html',
  styleUrls: ['./assigner-mission-edit.component.css']
})
export class AssignerMissionEditComponent {

  
  missions !: Mission[];
  clients !: Client[];

  isUpdate : boolean = false;
  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;
  id_affectation !:number;
  utilisateurs !: Utilisateurs[];

  id_client !:number;
  id_mission !:number;
  duree !: number;
  montant !:number;
  commisions !:number;
  frequence !:number;
  date_mission !:Date;
  heure_mission !:Time;

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

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    _id: any;

    ngOnInit(): void {
      
      this.listeDesMissions();

      this.createAffectationForm();

      this.listeDesPersonnels();

      this.listeDesClients();

      this.id_affectation = this.routes.snapshot.params['id_affectation'];
      
      if(this.routes.snapshot.params['administration']){

        this.administration_edit = Number(this.routes.snapshot.params['administration'])
        this.validations = true
        if(this.administration_edit == 1){
          this.readingOnly = false
        }else{
          this.readingOnly = true
        }

      }else{
        this.validations = false
      }

      this.infoAffectation(this.id_affectation)

      this.id_utilisateur_connecte = this.routes.snapshot.params['id_utilisateur'];

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

    infoAffectation(id_affectation: any){
      
      this._utilisateurService.getAffectationById(id_affectation).subscribe((data:any) => {
        
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

    titreFenetre  : string ="Création d'utilisateur"
    titreButton : string = "Enregistrer"
  
    calculationOfValues(){
        
      this.commisions = this.duree * this.tarif_horaire_personnel

      this.montant_option = this.duree * this.tarif_horaire_option

      this.montant = this.duree * this.tarif_horaire_client

      this.total_facture = this.montant + this.montant_option

    }

  updateAffectation(affectation:any){
    
    this._utilisateurService.updateAffectation(affectation).subscribe((data) => {
      
      let title : string = "Affectation mise à jours avec succès";

      this._notificationService.createNotification(2, title)

      if(this.validations){
        this.router.navigate(['/mes-validations-list', this.id_utilisateur_connecte]);
      }else{
        this.router.navigate(['/assigner-mission-list', this.id_utilisateur_connecte]);
      }

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


}
