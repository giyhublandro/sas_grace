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
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Client } from '../models/client';
import { Affectation } from '../models/affectation';
import { data } from 'jquery';

@Component({
  selector: 'app-affectation-special',
  templateUrl: './affectation-special.component.html',
  styleUrls: ['./affectation-special.component.css']
})
export class AffectationSpecialComponent {
  
  missions !: Mission[];
  clients !: Client[];

  frequence : number = 1;

  isUpdate : boolean = false;
  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;

  utilisateurs !: Utilisateurs[];

  nom_profil !:string;
  
  date_mission !:Date;

  tarif_horaire_personnel :number = 0;
  tarif_horaire_client :number  = 0;
  commisions :number  = 0;
  montant :number  = 0;
  duree :number = 0;
  
  montant_option :number=0;
  tarif_horaire_option :number=0;

  id_client !:number;
  frais_option : number = 0
  
  total_facture :number= 0
  
  source_id : number = 0
  frequence_client :number = 0;
  
  affectations :Affectation[]=[]

  jour_1 :number = -1;
  jour_2 :number = -1
  jour_3 :number = -1
  jour_4 :number = -1
  jour_5 :number = -1
  jour_6 :number = -1
  jour_7 :number = -1
  
  heure_1 :string ="00:00:00";
  heure_2 :string ="00:00:00";
  heure_3 :string ="00:00:00";
  heure_4 :string ="00:00:00";
  heure_5 :string ="00:00:00";
  heure_6 :string ="00:00:00";
  heure_7 :string ="00:00:00";
  
  detailFrequence :any[]=[]

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService,
    private datepipe: DatePipe) { }

    _id: any;

    ngOnInit(): void {
      
      this.listeDesMissions();

      this.createAffectationForm();

      this.listeDesPersonnels();
      
      this.listeDesClients();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

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
        'total_facture':[],
        'date_mission_1':['',Validators.compose([Validators.required])],
        'date_mission_2':['',Validators.compose([Validators.required])],
   
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

    onFfrequenceChange(){



    }

    listeDesPersonnels(){

      this._utilisateurService.getPersonnels().subscribe((data:any[]) => {
        
        this.utilisateurs = data;

      });

    }

    titreFenetre  : string ="Création d'utilisateur"
    titreButton : string = "Créer"
    
    delete(utilisateur:any){
      this.comboBox(utilisateur)
    }
    
    calculationOfValues(){
      
      this.montant_option = 0

      this.commisions = this.duree * this.tarif_horaire_personnel

      this.montant_option = this.duree * this.tarif_horaire_option

      this.montant = this.duree * this.tarif_horaire_client

      this.total_facture = this.montant + this.montant_option

    }

    onDureeChange(){

      this.montant_option = 0;

      this.calculationOfValues()

      //this._utilisateurService.getClientById(this.id_client).subscribe((data:any)=>{
        //this.source_id = data.id_source;
      //})

    }

    onTarifHorairePersonnelChange(){
      
      this.calculationOfValues();

    }

    onTarifHoraireClientChange(){
      
      this.calculationOfValues();

    }

    createAffectation(values:any){
      
      //console.log(values)
      
      this.dupliquer(values)

        let title : string = "Duplication des affectations réalisées avec succès";

        this.toastAlertSuccess(title)
        
        this.montant=0
        this.commisions=0
        this.tarif_horaire_client=0
        this.tarif_horaire_personnel=0
        this.duree = 0
        this.total_facture = 0
        this.montant_option = 0

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
    
    onChangeClient(e:Event){
      
      this.montantFraisOption(this.id_client)
      //this.infoClient(this.id_client)
      
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

    infoClient(id_client : any){
  
      this._utilisateurService.getClientById(id_client).subscribe((data:any) => {
        
        this.frequence_client = data.frequence_client;
        //this.frequence = this.frequence_client;

      });
    
    }

    onDateMissionChange(e:Event){
        
      let date : Date = new Date((<HTMLInputElement>e.target).value);
      let day = Number(date.getDay());
      let month = Number(date.getMonth())

      this.jour_1 = day;

    }

    onDateMission1Change(e:Event){
        
      let date : Date = new Date((<HTMLInputElement>e.target).value);
      this.date_mission = new Date((<HTMLInputElement>e.target).value);

      let day = Number(date.getDay());
      this.jour_1 = day;
      
      console.log(this.date_mission)

    }

    onHeureMissionChange(e:Event){
       this.heure_1 = (<HTMLInputElement>e.target).value
    }

    dupliquer(element:any){

      let date_mission_1 : Date = new Date(element.date_mission_1)
      let date_mission_2 : Date = new Date(element.date_mission_2)

      //let date_a_cloturer :Date = new Date();
      //let date_a_cloturerString : any = this.datepipe.transform(date_a_cloturer, 'yyyy-MM-dd')
      
      var date1:any = new Date(date_mission_1);
      var date2:any = new Date(date_mission_2);
      var dayDiff:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
      
      let jour_1  !: any 
      if (element.jour_1 == ""){
        jour_1 = -1
      }else{
        jour_1 = Number(element.jour_1)
      }

      let jour_2  !: any 
      if (element.jour_2 == ""){
        jour_2 = -1
      }else{
        jour_2 = Number(element.jour_2)
      }

      let jour_3  !: any 
      if (element.jour_3 == ""){
        jour_3 = -1
      }else{
        jour_3 = Number(element.jour_3)
      }

      let jour_4  !: any 
      if (element.jour_4 == ""){
        jour_4 = -1
      }else{
        jour_4 = Number(element.jour_4)
      }

      let jour_5  !: any 
      if (element.jour_5 == ""){
        jour_5 = -1
      }else{
        jour_5 = Number(element.jour_5)
      }

      let jour_6 !: any 
      if (element.jour_6== ""){
        jour_6= -1
      }else{
        jour_6= Number(element.jour_6)
      }

      let jour_7  !: any 
      if (element.jour_7 == ""){
        jour_7 = -1
      }else{
        jour_7 = Number(element.jour_7)
      }
     
      for (let index = 0; index <= dayDiff; index++) {
        
        let firstDayMonthly : Date = this.addDays(date1,0)

        let startingDate : Date = this.addDays(date1,index)

        let startingDateString = startingDate.toISOString()
        
        let actualDate : Date = this.addDays(date1,index);

        if (Number(element.frequence) == 1){
            
         this._utilisateurService.dupliquerAffectationSpeciale(element, startingDateString).subscribe((data:any)=>{
  
         });

        }else if(Number(element.frequence) >= 2 && Number(element.frequence) <= 4){
            
            let j :number = 7
            
            for (let i = 1; i <= j; i++) {
                  
              let weekNumber :number = -1;
                
              if (jour_1 >= 0 && i==1){
                weekNumber = jour_1
              }

              if (jour_2 >= 0 && i==2){
                weekNumber = jour_2
              }

                if (jour_3 >= 0 && i==3){
                  weekNumber = jour_3
                }

                if (jour_4 >= 0 && i==4){
                  weekNumber = jour_4
                }

                if (jour_5 >= 0 && i==5){
                  weekNumber = jour_5
                }

                if (jour_6 >= 0 && i==6){
                  weekNumber = jour_6
                }

                if (jour_7 >= 0 && i==7){
                  weekNumber = jour_7
                }

              let numberOfDaysOfTheWeek = 7;
              
              if(weekNumber >= 0){
                  
                  let actualWeekNumber : number = actualDate.getDay()
                  
                  if(actualWeekNumber == weekNumber){
                    
                    this._utilisateurService.dupliquerAffectationSpeciale(element, startingDateString).subscribe((data:any)=>{

                    });

                  }
              }

          }

        }else if(Number(element.frequence) == 5 ){
              
          // 5= UNE FOIS TOUTES LES DEUX SEMAINES
            
            if(index % 14 == 0){
              this._utilisateurService.dupliquerAffectationSpeciale(element, startingDateString).subscribe((data:any)=>{
              });
            }
            
        }else if(Number(element.frequence) == 6){
            
          // 6= UNE FOIS PAR MOIS
        
            let day :number = firstDayMonthly.getDate()

            let actualDay: number = actualDate.getDate()
            
            if(actualDay == day){
              
              console.log("Day : " + day + " actualDay : " + actualDay)

              this._utilisateurService.dupliquerAffectationSpeciale(element, startingDateString).subscribe({
                  
              });
              
            }

        }

      }

    }

    addHours = (date:Date, hours:number):Date => {
  
      const result = new Date(date);
      result.setHours(result.getHours() + hours)
      return result;
    
    }
    
    addDays = (date:Date, days:number):Date => {
    
      let result :Date = new Date(date);
      result.setDate(result.getDate() + days)
      return result;
    
    }

}
