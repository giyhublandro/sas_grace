import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';

import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';

import {
  //ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';

import { Mission } from '../models/mission';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Affectation } from '../models/affectation';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';

import { EventColor } from 'calendar-utils';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  setHours,
  setMinutes,
  setMilliseconds,
} from 'date-fns';

import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEventAction, CalendarView } from 'angular-calendar';
import { Subject, elementAt } from 'rxjs';
import { AuthService } from '../services/auth.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-planning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})

export class PlanningComponent {
  
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

  id_profil !: number;
  administration !: number;
  view : CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  affectations !: Affectation[];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        console.log(event);
        this.listMissions();

      },
    }
  ];

  refresh = new Subject<void>();
  
  events: CalendarEvent[] = [
   
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  isUpdate : boolean = false;
  missionForm! : FormGroup;

  id_utilisateur : number = 0 ;

  missions !: Mission[];

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _authService:AuthService,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {
      
      this.listeDesAffectations()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      this.infoUtilisateur();

      this.planning();
      
      this.infoUtilisateur();
      
    }

    infoUtilisateur(){

      this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {
    
        if (data == null){
          this._authService.logout();
        }else{
  
          this.id_profil = data.id_profil;
  
          this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
  
            this.administration = Number(data.administration);
            
          });
          
        }
  
      });
  
    }

    listeDesAffectations(){

      this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
        this.affectations = data;

      });

    }

    listMissions(){
      this.router.navigate(['/assigner-mission-list', this.id_utilisateur]);
    }

    planning(){

      let administration !: number;

      this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
        this.affectations = data;

        this.affectations.forEach(element => {
          
          let id_affectation : number = Number(element.id_affectation);
          
          //Sur le planning ne doit figurer que les mission non validées

          if(element.frequence == 1 && element.statut == 0){

            // 1 = MISSION PONCTUELLE

            let start = element.date_mission + 'T' + element.heure_mission+'.000Z';
            let end = element.date_mission + 'T' + element.heure_mission+'.000Z';
            const date : Date = new Date(end);
            let endDate : Date = addHours(date, element.duree) 
            end = endDate.toISOString();

            this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
              
              if (data.administration == 1){
                this.addEvent(element.mission + ' Le ' + element.date_mission + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2 + ' Par : '+ element.nom_utilisateur + ' ' + element.prenom_utilisateur, start, end, element.duree)
              }else{
                
                if(this.id_utilisateur == element.id_utilisateur){
                  this.addEvent(element.mission + ' Le ' + element.date_mission + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2, start, end, element.duree)
                }
    
              }
    
            });
          
          }else if(element.frequence == 5 && element.statut == 0){
              
            // 2= UNE TOUTES LES DEUX SEMAINES

            this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{

              let start = element.date_mission + 'T' + element.heure_mission + '.000Z';

              const startDateFormat : Date = new Date(start);
             
              let weekNumber :number = startDateFormat.getDay()
              let actualMonth :number = startDateFormat.getMonth()+1
              let actualYear :number = startDateFormat.getFullYear()
              let day :number = startDateFormat.getDate()
              
              let firstDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth(), 1)
              let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
              
              let dayDiff = (lastDay.getTime() - firstDay.getTime()) / (1000*60*60*24)
              
              dayDiff *= 10;
              
              let j = -1;

              for (let index = 0; index < dayDiff; index++) {
                
                j += 1;

                let startingDate : Date = addDays(startDateFormat,index)
                let endingDate : Date = addHours(startingDate, element.duree)

                let startingDateString = startingDate.toISOString()
                let endingDateString : string = endingDate.toISOString()
  
                let actualDay: number = startingDate.getDate()

                if(index % 14 == 0){
                  
                  this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
                    
                    if (data.administration == 1){
                      this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2 + ' Par : '+ element.nom_utilisateur + ' ' + element.prenom_utilisateur, startingDateString, endingDateString, element.duree)
                    }else{
                      
                      if(this.id_utilisateur == element.id_utilisateur){
                        this.addEvent(element.mission + ' Le ' + startingDate + '  à' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2, startingDateString, endingDateString, element.duree)
                      }
          
                    }
          
                  });

                }
                
              }

            });
   
          }else if(element.frequence == 6 && element.statut == 0){
              
            // 6= UNE FOIS PAR MOIS

            this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{

              let start = element.date_mission + 'T' + element.heure_mission + '.000Z';

              const startDateFormat : Date = new Date(start);
  
              let weekNumber :number = startDateFormat.getDay()
              let actualMonth :number = startDateFormat.getMonth()+1
              let actualYear :number = startDateFormat.getFullYear()
              let day :number = startDateFormat.getDate()
              
              let firstDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth(), 1)
              let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
              
              let dayDiff = (lastDay.getTime() - firstDay.getTime()) / (1000*60*60*24)
              
              dayDiff *= 5;

              for (let index = 0; index < dayDiff; index++) {
                
                let startingDate : Date = addDays(startDateFormat,index)
                let endingDate : Date = addHours(startingDate, element.duree)

                let startingDateString = startingDate.toISOString()
                let endingDateString : string = endingDate.toISOString()
  
                let actualDay: number = startingDate.getDate()
                
                if(actualDay == day){
                  
                  this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
                    
                    if (data.administration == 1){
                      this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2 + ' Par : '+ element.nom_utilisateur + ' ' + element.prenom_utilisateur, startingDateString, endingDateString, element.duree)
                    }else{
                      
                      if(this.id_utilisateur == element.id_utilisateur){
                        this.addEvent(element.mission + ' Le ' + startingDate + ' ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2, startingDateString, endingDateString, element.duree)
                      }
          
                    }
          
                  });

                }
                
              }

            });
   
          }else {
            
            if((element.frequence >= 2 && element.frequence <= 3) && element.statut == 0){

              //Frequence = 2 : Une fois par semaine
              //Frequence = 3 : Deux fois par semain
              
              this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{
                
                let jour_1 = data.jour_1
                let jour_2 = data.jour_2
                
                let heure_1 =data.heure_1
                let heure_2 =data.heure_2
                
                let j :number = element.frequence
                
                let start = element.date_mission + 'T' + element.heure_mission + '.000Z';

                for (let i = 1; i < j; i++) {

                    let weekNumber :number = -1;

                    if(i==1){
                      start = element.date_mission + 'T' + heure_1 + '.000Z';
                      weekNumber = jour_1
                    }else if(i==2){
                      start = element.date_mission + 'T' + heure_2 + '.000Z';
                      weekNumber = jour_2
                    }

                    const startDateFormat : Date = new Date(start);

                    let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
                    
                    let dayDiff = (lastDay.getTime() - startDateFormat.getTime()) / (1000*60*60*24)
                    
                    dayDiff *= 5;

                    for (let index = 0; index < dayDiff; index++) {
                  
                      let startingDate : Date = addDays(startDateFormat,index)
                      let endingDate : Date = addHours(startingDate, element.duree)
    
                      let startingDateString = startingDate.toISOString()
                      let endingDateString : string = endingDate.toISOString()
        
                      let actualWeekNumber : number = startingDate.getDay()
    
                      if(actualWeekNumber == weekNumber){
                        
                        this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
                          
                          if (data.administration == 1){
                            this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2 + ' Par : '+ element.nom_utilisateur + ' ' + element.prenom_utilisateur, startingDateString, endingDateString, element.duree)
                          }else{
                            
                            if(this.id_utilisateur == element.id_utilisateur){
                              this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2, startingDateString, endingDateString, element.duree)
                            }
                
                          }
                
                        });
    
                      }
                      
                    }

                }


              });

            }

            if((element.frequence == 4) && element.statut == 0){

              //Frequence = 4 : Plusieurs fois par semaine
              
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

                    let lastDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth()+1, 0)
                    
                    let dayDiff = (lastDay.getTime() - startDateFormat.getTime()) / (1000*60*60*24)
                    
                    dayDiff *= 5;
                    
                    if(weekNumber >= 0){
                        
                      for (let index = 0; index < dayDiff; index++) {
                  
                        let startingDate : Date = addDays(startDateFormat,index)
                        let endingDate : Date = addHours(startingDate, element.duree)
      
                        let startingDateString = startingDate.toISOString()
                        let endingDateString : string = endingDate.toISOString()
          
                        let actualWeekNumber : number = startingDate.getDay()
      
                        if(actualWeekNumber == weekNumber){
                          
                          this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
                            
                            if (data.administration == 1){
                              this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2 + ' Par : '+ element.nom_utilisateur + ' ' + element.prenom_utilisateur, startingDateString, endingDateString, element.duree)
                            }else{
                              
                              if(this.id_utilisateur == element.id_utilisateur){
                                this.addEvent(element.mission + ' Le ' + startingDate + ' à ' + element.heure_mission + ' Adresse : ' + element.adresse_client+ ' Accès 1 :' + element.code_acces_1+ ' Accès 2 :' + element.code_acces_2, startingDateString, endingDateString, element.duree)
                              }
                  
                            }
                  
                          });
      
                        }
                        
                      }

                    }

                }


              });

            }

          }

        });

      });

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

    addEvent(titre :any, start :string, end:string, duree:number): void {
      this.events = [
        ...this.events,
        {
         
          //start: new Date("2023-10-05T10:00:00.000Z"),
          start: new Date(start),
          end: new Date(end),
          //end: setHours(setMinutes(new Date(start), 1), duree),
          title: titre,
          actions: this.actions,
          resizable: {
            afterEnd: false,
          },
          draggable: false,

        },
      ];
    }

    getDetailFrequence(id_affectation:number){

      this._utilisateurService.getDetailFrequence(id_affectation).subscribe((data:any)=>{

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
