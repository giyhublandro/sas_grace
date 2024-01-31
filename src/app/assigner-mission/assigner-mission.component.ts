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

@Component({
  selector: 'app-assigner-mission',
  templateUrl: './assigner-mission.component.html',
  styleUrls: ['./assigner-mission.component.css']
})
export class AssignerMissionComponent {

  missions !: Mission[];
  clients !: Client[];

  frequence !: number;

  isUpdate : boolean = false;
  assignForm! : FormGroup;

  id_utilisateur : number = 0 ;

  utilisateurs !: Utilisateurs[];

  nom_profil !:string;

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

        'id_utilisateur_binom':[],
        'commisions_binom':[],
        'duree_binom':[]

   
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
      this.total_facture = 0

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
      
      this._utilisateurService.createAffectation(values).subscribe((data) => {

        console.log(values)

        //this.ngOnInit()

        let title : string = "Affectation réalisée avec succès";

        this.toastAlertSuccess(title)
        
        this.montant=0
        this.commisions=0
        this.tarif_horaire_client=0
        this.tarif_horaire_personnel=0
        this.duree = 0
        this.total_facture = 0
        this.montant_option = 0

        //this.router.navigate(['/assigner-mission',this.id_utilisateur]);

      });

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
        this.frequence = this.frequence_client;

      });
    
    }

    onDateMissionChange(e:Event){
        
      let date : Date = new Date((<HTMLInputElement>e.target).value);
      let day = Number(date.getDay());
      let month = Number(date.getMonth())

      this.jour_1 = day;

    }

    onHeureMissionChange(e:Event){
       this.heure_1 = (<HTMLInputElement>e.target).value
    }

    dupliquer(){
      
      let date_a_cloturer :Date = new Date();
      let date_a_cloturerString : any = this.datepipe.transform(date_a_cloturer, 'yyyy-MM-dd')

      this._utilisateurService.getAffectationsADupliquer(date_a_cloturerString).subscribe((data:Affectation[]) => {
        this.affectations = data;

        this.affectations.forEach(element => {
          
          let id_affectation : number = Number(element.id_affectation);

          if(Number(element.frequence) >= 2 && Number(element.frequence) <= 4){

            this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{
              
              let jour_1 = data.jour_1
              let jour_2 = data.jour_2
              let jour_3 = data.jour_3
              let jour_4 = data.jour_4
              let jour_5 = data.jour_5
              let jour_6 = data.jour_6
              let jour_7 = data.jour_7
              
              let heure_1 =data.heure_1
              let heure_2 =data.heure_2
              let heure_3 =data.heure_3
              let heure_4 =data.heure_4
              let heure_5 =data.heure_5
              let heure_6 =data.heure_6
              let heure_7 =data.heure_7
              
              let j :number = 7
              
              let start = element.date_mission + 'T' + element.heure_mission + '.000Z';
    
              for (let i = 1; i <= j; i++) {
                  
                  let weekNumber :number = -1;
                    
                  if (jour_1 >= 0 && i==1){
                    start = element.date_mission + 'T' + heure_1 + '.000Z';
                    weekNumber = jour_1
                  }
    
                  if (jour_2 >= 0 && i==2){
                    start = element.date_mission + 'T' + heure_2 + '.000Z';
                    weekNumber = jour_2
                  }
    
                    if (jour_3 >= 0 && i==3){
                      start = element.date_mission + 'T' + heure_3 + '.000Z';
                      weekNumber = jour_3
                    }
    
                    if (jour_4 >= 0 && i==4){
                      start = element.date_mission + 'T' + heure_4 + '.000Z';
                      weekNumber = jour_4
                    }
    
                    if (jour_5 >= 0 && i==5){
                      start = element.date_mission + 'T' + heure_5 + '.000Z';
                      weekNumber = jour_5
                    }
    
                    if (jour_6 >= 0 && i==6){
                      start = element.date_mission + 'T' + heure_6 + '.000Z';
                      weekNumber = jour_6
                    }
    
                    if (jour_7 >= 0 && i==7){
                      start = element.date_mission + 'T' + heure_7 + '.000Z';
                      weekNumber = jour_7
                    }
    
                  const startDateFormat : Date = new Date(start);
    
                  let numberOfDaysOfTheWeek = 7;
                  
                  if(weekNumber >= 0){
                      
                    for (let index = 0; index <= numberOfDaysOfTheWeek; index++) {
                      
                      let plannedDay : boolean = false;

                      let startingDate : Date = this.addDays(startDateFormat,index);
                      let actualDate : Date = new Date();
                      
                      if(this.datepipe.transform(startingDate, 'yyyy-MM-dd') == this.datepipe.transform(actualDate, 'yyyy-MM-dd')){
                        plannedDay =true;
                      }
                      
                      let startingDateString = startingDate.toISOString()

                      let actualWeekNumber : number = actualDate.getDay()
                      
                      if(actualWeekNumber == weekNumber){
                        
                        if(plannedDay){
                          this._utilisateurService.dupliquerAffectation(element, startingDateString).subscribe((data:any)=>{
                            //console.log(startingDate.toISOString() + " - " + actualDate.toISOString());
                          });
                        }

                      }
                      
                    }
    
                  }
    
              }
    
    
            });
            
          }else if(Number(element.frequence) == 5 && Number(element.statut) == 0){
                
            // 5= UNE FOIS TOUTES LES DEUX SEMAINES
  
            this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{
  
              let start = element.date_mission + 'T' + element.heure_mission + '.000Z';
  
              const startDateFormat : Date = new Date(start);
             
              let weekNumber :number = startDateFormat.getDay()
              let actualMonth :number = startDateFormat.getMonth()+1
              let actualYear :number = startDateFormat.getFullYear()
              let day :number = startDateFormat.getDate()
              
              //let firstDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth(), 1)
              //let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
              
              //let dayDiff = (lastDay.getTime() - firstDay.getTime()) / (1000*60*60*24)
              
              let numberOfDays = 30;
              
              let j = -1;
  
              for (let index = 0; index <= numberOfDays; index++) {
                
                j += 1;
                
                let plannedDay : boolean = false;

                let startingDate : Date = this.addDays(startDateFormat,index);
                let actualDate : Date = new Date();
                
                if(this.datepipe.transform(startingDate, 'yyyy-MM-dd') == this.datepipe.transform(actualDate, 'yyyy-MM-dd')){
                    plannedDay =true;
                }
  
                let startingDateString = startingDate.toISOString()
  
                if(index % 14 == 0){
                  //console.log(startingDate.toISOString() + " - " + actualDate.toISOString());
                  if(plannedDay){
                    this._utilisateurService.dupliquerAffectation(element, startingDateString).subscribe((data:any)=>{
                      //console.log(startingDate.toISOString() + " - " + actualDate.toISOString());
                    });
                  }
                  
                }
                
              }
  
            });
   
          }else if(Number(element.frequence) == 6 && Number(element.statut) == 0){
              
            // 6= UNE FOIS PAR MOIS

            this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{
          
              let start = element.date_mission + 'T' + element.heure_mission + '.000Z';
  
              const startDateFormat : Date = new Date(start);
  
              let weekNumber :number = startDateFormat.getDay()
              let actualMonth :number = startDateFormat.getMonth()+1
              let actualYear :number = startDateFormat.getFullYear()
              let day :number = startDateFormat.getDate()
              
              //let firstDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth(), 1)
              //let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
              
              let numberOfDays = 32;
  
              for (let index = 0; index <= numberOfDays; index++) {
                
                let plannedDay : boolean = false;
                let startingDate : Date = this.addDays(startDateFormat,index)
                let actualDate : Date = new Date();
                
                if(this.datepipe.transform(startingDate, 'yyyy-MM-dd') == this.datepipe.transform(actualDate, 'yyyy-MM-dd')){
                    plannedDay =true;
                }
                
                //console.log(startingDate.toISOString() + " - " + actualDate.toISOString());

                let startingDateString = startingDate.toISOString() //Nouvelle date de la nouvelle mission
                let actualDay: number = startingDate.getDate()
                
                if(actualDay == day){
                  
                  //console.log(startingDate.toISOString() + " - " + actualDate.toISOString());

                  if(plannedDay){
                    this._utilisateurService.dupliquerAffectation(element, startingDateString).subscribe({
                      
                    });
                  }
                  
                }
                
              }
  
            });
   
          }
          
        });
  
      });

      //let date_a_cloturer :Date = new Date();
      //let date_a_cloturerString : any = this.datepipe.transform(date_a_cloturer, 'yyyy-MM-dd')
        
      this.cloture(date_a_cloturerString);
  
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

    cloture(date_cloture:any){
      
      this._utilisateurService.getClotures(date_cloture).subscribe((data:any[])=>{
        //On ne peut cloturer que si cela n'a pas deja été fait
        
        if(data.length <= 0){
          this._utilisateurService.cloturer(date_cloture, this.id_utilisateur).subscribe((data:any)=>{
            console.log('Donne')
          });
        }else{
          console.log('Already Donne')
        }

      });

    }

}
