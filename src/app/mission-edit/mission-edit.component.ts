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

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.css']
})
export class MissionEditComponent {

  
  missionForm! : FormGroup;
  missions !: Mission[];

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router, 
   private _notificationService : NotificationService) { }
    
   id_mission!:number;
   
   mission!:string;
   description !:string;
   duree !:number;
   montant !: number;
   commisions !: number;
   frequence !: number;
   date_mission !: Date;
   heure_mission !: Time;
   lien!:string
   id_utilisateur !:number;

   titreFenetre : string="Modification des Missions"
   titreButton : string="Enregistrer"

   ngOnInit(): void {

    this.createMissionForm()

    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    if (this.routes.snapshot.params['id_mission']){

      this.id_mission = this.routes.snapshot.params['id_mission'];

      if(this.id_mission > 0) {
        this.infoMission(this.id_mission)
      }else{
        console.log("Hello world");
      }

    }

  }

  createMissionForm() {

    this.missionForm = this.formBuilder.group({

      'id_mission' :[''],
      'mission' :['',Validators.compose(
       [Validators.required, Validators.minLength(3)])],

      'duree' :[''],
       
       'montant' :[''],
   
       'commisions' :[''],
       'lien':[''],
       'description' :['',Validators.compose(
       [Validators.required])],
       
       'frequence' :[''],

       'date_mission' :[''],
                   
       'heure_mission' :['']

    });
  }
  
infoMission(id_mission: any){

  this._utilisateurService.getMissionById(id_mission).subscribe((data:any) => {
    
    this.id_mission = data.id_mission
    this.mission = data.mission
    this.description = data.description
    this.duree = data.duree
    this.montant = data.montant
    this.commisions = data.commisions
    this.frequence = data.frequence
    this.date_mission  = data.date_mission
		this.heure_mission = data.heure_mission
		this.lien =data.lien
  });

}

updateMission(data:any){

    this._utilisateurService.updateMission(data).subscribe((data) => {
      
      this.ListeMissions()

      let title : string = "Mission mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

}

  ListeMissions(){
    this.router.navigate(['/mission', this.id_utilisateur]);
  }
}
