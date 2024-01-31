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

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent {

  
  isUpdate : boolean = false;
  missionForm! : FormGroup;

  id_utilisateur : number = 0 ;

  missions !: Mission;

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {
      
      this.createMissionForm();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    createMissionForm() {

      this.missionForm = this.formBuilder.group({
       
        'id_mission' :[''],
        'mission' :['',Validators.compose(
         [Validators.required, Validators.minLength(3)])],
  
        'duree' :[''],
         
         'montant' :[''],
     
         'commisions' :[''],
         'lien':[],
         'description' :['',Validators.compose(
         [Validators.required])],
         
         'frequence' :[''],
  
         'date_mission' :[''],
                     
         'heure_mission' :['']

      });

    }

    titreFenetre  : string ="Création de Mission"
    titreButton : string = "Créer"
    
    createMission(values :any, isUpdate:any){

      if (! isUpdate) {
 
        this._utilisateurService.createMission(values).subscribe((data) => {
          //window.location.href = '/utilisateurs';
          this.ngOnInit()

          let title : string = "Mission créee avec succès";

          this._notificationService.createNotification(2, title)
       
        });

      }else{

        this.isUpdate = false;

        this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
        
      }
     
    }

    listMission(){
      //permet de visualiser la liste des clients
      this.router.navigate(['/mission-list',this.id_utilisateur]);
    }
}
